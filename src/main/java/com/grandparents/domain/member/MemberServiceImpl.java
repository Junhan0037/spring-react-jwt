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
        context.setVariable("linkName", "이메일 인증하기");
        context.setVariable("message", "GrandParents 서비스를 이용하려면 링크를 클릭하세요.");
        context.setVariable("host", appProperties.getHost());

        String message = templateEngine.process("mail/simple-link", context);

        EmailMessage emailMessage = EmailMessage.builder()
                .to(newMember.getEmail())
                .subject("GrandParents, 회원 가입 인증")
                .message(message)
                .build();

        emailService.sendEmail(emailMessage);
    }

    @Override
    @Transactional
    public TokenDto.ResponseDto login(MemberDto.RequestDto memberRequestDto) {
        // Login ID/PW 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 검증 (loadUserByUsername 실행)
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto.ResponseDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                                                .key(authentication.getName())
                                                .value(tokenDto.getRefreshToken())
                                                .build();
        refreshTokenRepository.save(refreshToken);

        // 토큰 발급
        return tokenDto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findByEmail(username).map(this::createUserDetails).orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    @Override
    @Transactional
    public TokenDto.ResponseDto reIssue(TokenDto.RequestDto tokenRequestDto) {
        // 토큰 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // Access Token 에서 Member ID 추출
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 해당 Refresh Token 추출
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName()).orElseThrow(() -> new RuntimeException("로그아웃 된 사용자 입니다."));

        // Refresh Token 일치 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 새로운 토큰 생성
        TokenDto.ResponseDto newTokenDto = tokenProvider.generateTokenDto(authentication);

        // 저장소 업데이트
        RefreshToken newRefreshToken = refreshToken.updateToken(newTokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return newTokenDto;
    }


    private UserDetails createUserDetails(Member member) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getRole().toString());
        return new User(String.valueOf(member.getId()), member.getPassword(), Collections.singleton(grantedAuthority));
    }

}
