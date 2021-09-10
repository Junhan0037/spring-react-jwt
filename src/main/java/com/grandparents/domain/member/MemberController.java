package com.grandparents.domain.member;

import com.grandparents.domain.member.form.SignUpForm;
import com.grandparents.jwt.TokenDto;
import com.grandparents.jwt.TokenRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/sign-up")
    public String signUpForm(Model model) {
        model.addAttribute("signUpForm", new SignUpForm());
        return "member/sign-up";
    }

    @PostMapping("/sign-up")
    public ResponseEntity<MemberResponseDto> signUp(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.signUp(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.login(memberRequestDto));
    }

    @PostMapping("/re-issue")
    public ResponseEntity<TokenDto> reIssue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(memberService.reIssue(tokenRequestDto));
    }

}
