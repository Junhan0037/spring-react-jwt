package com.grandparents.domain.member;

import com.grandparents.domain.member.dto.MemberDto;
import com.grandparents.domain.member.validator.MemberRequestDtoValidator;
import com.grandparents.jwt.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRequestDtoValidator memberRequestDtoValidator;
    private final MemberService memberService;

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(memberRequestDtoValidator);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Valid @RequestBody MemberDto.RequestDto memberRequestDto, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        return ResponseEntity.ok(memberService.processNewAccount(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto.ResponseDto> login(@RequestBody MemberDto.RequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.login(memberRequestDto));
    }

    @PostMapping("/re-issue")
    public ResponseEntity<TokenDto.ResponseDto> reIssue(@RequestBody TokenDto.RequestDto tokenRequestDto) {
        return ResponseEntity.ok(memberService.reIssue(tokenRequestDto));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register() {
        return ResponseEntity.ok(null);
    }

    @PostMapping("/register/search")
    public ResponseEntity<?> registerSearch(@RequestBody MemberDto.RequestDto memberRequestDto) {
        return ResponseEntity.ok(memberService.searchAssistant(memberRequestDto.getName()));
    }

}
