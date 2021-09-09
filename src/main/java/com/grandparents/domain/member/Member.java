package com.grandparents.domain.member;

import com.grandparents.common.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    private boolean emailVerified;

    private String emailCheckToken;

    private String name;

    private String address;

    private String phone;

}
