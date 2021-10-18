package com.grandparents.domain.member;

import com.grandparents.common.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean emailVerified;

    private String emailCheckToken;

    private String address;

    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member assistant;

    @OneToMany(mappedBy = "assistant", cascade = CascadeType.ALL)
    private List<Member> members = new ArrayList<>();

    /**
     * 요양사 변경
     * @param assistant
     */
    public void changeAssistant(Member assistant) {
        this.setAssistant(assistant);
        assistant.getMembers().add(this);
    }

    /**
     * 회원 추가
     * @param member
     */
    public void addMember(Member member) {
        this.getMembers().add(member);
        member.setAssistant(this);
    }

    /**
     * 회원 삭제
     * @param member
     */
    public void removeMember(Member member) {
        this.getMembers().remove(member);
        member.setAssistant(null);
    }

}
