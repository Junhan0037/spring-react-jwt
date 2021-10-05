package com.grandparents.domain.member;

import com.grandparents.domain.member.dto.MemberDto;
import com.grandparents.jwt.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        String result = "안녕하세요. 현재 서버시간은 " + new Date() + "입니다. \n";
        return ResponseEntity.ok(result);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<MemberDto.Response> signUp(@RequestBody MemberDto.Request memberRequestDto) {
        memberService.signUp(memberRequestDto);

        return ResponseEntity.ok(memberService.signUp(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto.Response> login(@RequestBody MemberDto.Request memberRequestDto) {
        return ResponseEntity.ok(memberService.login(memberRequestDto));
    }

    @PostMapping("/re-issue")
    public ResponseEntity<TokenDto.Response> reIssue(@RequestBody TokenDto.Request tokenRequestDto) {
        return ResponseEntity.ok(memberService.reIssue(tokenRequestDto));
    }

}
