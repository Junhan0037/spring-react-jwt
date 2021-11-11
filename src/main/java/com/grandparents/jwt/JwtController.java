package com.grandparents.jwt;

import com.grandparents.domain.member.MemberService;
import com.grandparents.jwt.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class JwtController {

    private final MemberService memberService;

    @PostMapping("/re-issue")
    public ResponseEntity<TokenDto.ResponseDto> reIssue(@RequestBody TokenDto.RequestDto tokenRequestDto) {
        return ResponseEntity.ok(memberService.reIssue(tokenRequestDto));
    }

}
