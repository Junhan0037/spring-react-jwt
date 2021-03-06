package com.grandparents.domain.member;

import com.grandparents.config.AppProperties;
import com.grandparents.domain.member.dto.MemberDto;
import com.grandparents.jwt.RefreshToken;
import com.grandparents.jwt.RefreshTokenRepository;
import com.grandparents.jwt.TokenProvider;
import com.grandparents.jwt.dto.TokenDto;
import com.grandparents.mail.EmailMessage;
import com.grandparents.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService, UserDetailsService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TemplateEngine templateEngine;
    private final AppProperties appProperties;
    private final EmailService emailService;

    @Override
    public MemberDto.ResponseDto processNewAccount(MemberDto.RequestDto memberRequestDto) {
        Member newMember = saveNewAccount(memberRequestDto);
        sendSignUpConfirmEmail(newMember);
        return modelMapper.map(newMember, MemberDto.ResponseDto.class);
    }

    private Member saveNewAccount(MemberDto.RequestDto memberRequestDto) {
        memberRequestDto.setPassword(passwordEncoder.encode(memberRequestDto.getPassword()));
        memberRequestDto.setRole(memberRequestDto.getUserType().equals("USER") ? Role.USER : Role.ASSISTANT);
        Member member = modelMapper.map(memberRequestDto, Member.class);
        return memberRepository.save(member);
    }

    private void sendSignUpConfirmEmail(Member newMember) {
        Context context = new Context();
        context.setVariable("link", "/check-email-token?token=" + newMember.getEmailCheckToken() + "&email=" + newMember.getEmail());
        context.setVariable("name", newMember.getName());
        context.setVariable("linkName", "????????? ????????????");
        context.setVariable("message", "GrandParents ???????????? ??????????????? ????????? ???????????????.");
        context.setVariable("host", appProperties.getHost());

        String message = templateEngine.process("mail/simple-link", context);

        EmailMessage emailMessage = EmailMessage.builder()
                .to(newMember.getEmail())
                .subject("GrandParents, ?????? ?????? ??????")
                .message(message)
                .build();

        emailService.sendEmail(emailMessage);
    }

    @Override
    @Transactional
    public TokenDto.ResponseDto login(MemberDto.RequestDto memberRequestDto) {
        // Login ID/PW ???????????? AuthenticationToken ??????
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // ?????? (loadUserByUsername ??????)
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // ?????? ????????? ???????????? JWT ?????? ??????
        TokenDto.ResponseDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // RefreshToken ??????
        RefreshToken refreshToken = RefreshToken.builder()
                                                .key(authentication.getName())
                                                .value(tokenDto.getRefreshToken())
                                                .build();
        refreshTokenRepository.save(refreshToken);

        // ?????? ??????, ?????????
        Member member = memberRepository.findByEmail(memberRequestDto.getEmail()).orElseThrow(() -> new UsernameNotFoundException(memberRequestDto.getEmail() + " -> ???????????????????????? ?????? ??? ????????????."));
        tokenDto.setName(member.getName());
        tokenDto.setEmail(member.getEmail());
        tokenDto.setRole(member.getRole());

        // ?????? ??????
        return tokenDto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findByEmail(username).map(this::createUserDetails).orElseThrow(() -> new UsernameNotFoundException(username + " -> ???????????????????????? ?????? ??? ????????????."));
    }

    @Override
    @Transactional
    public TokenDto.ResponseDto reIssue(TokenDto.RequestDto tokenRequestDto) {
        // ?????? ??????
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token ??? ???????????? ????????????.");
        }

        // Access Token ?????? Member ID ??????
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // ?????? Refresh Token ??????
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName()).orElseThrow(() -> new RuntimeException("???????????? ??? ????????? ?????????."));

        // Refresh Token ?????? ??????
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("????????? ?????? ????????? ???????????? ????????????.");
        }

        // ????????? ?????? ??????
        TokenDto.ResponseDto newTokenDto = tokenProvider.generateTokenDto(authentication);

        // ????????? ????????????
        RefreshToken newRefreshToken = refreshToken.updateToken(newTokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // ?????? ??????
        return newTokenDto;
    }

    @Override
    public MemberDto.ResponseDto registerAssistant(String email) {
        // JWT ????????? ?????????
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberRepository.findById(Long.valueOf(user.getUsername())).orElseThrow(() -> new UsernameNotFoundException(user.getUsername() + " -> ???????????????????????? ?????? ??? ????????????."));

        // ????????? ?????? ?????????
        Member newAssistant = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email + " -> ???????????????????????? ?????? ??? ????????????."));

        // ??????
        member.changeAssistant(newAssistant);

        // ??????
        memberRepository.save(member);

        return modelMapper.map(member.getAssistant(), MemberDto.ResponseDto.class);
    }

    @Override
    public List<String> searchAssistant(String name) {
        return memberRepository.findByNameContainingAndRole(name, Role.ASSISTANT).stream().map(Member::getEmail).collect(Collectors.toList());
    }

    /**
     * UserDetails ??????
     * @param member
     * @return UserDetails
     */
    private UserDetails createUserDetails(Member member) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getRole().toString());
        return new User(String.valueOf(member.getId()), member.getPassword(), Collections.singleton(grantedAuthority));
    }

}
