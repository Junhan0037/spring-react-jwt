package com.grandparents.domain.account;

import com.grandparents.common.BaseTimeEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class Account extends BaseTimeEntity {

    @Id @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private boolean emailVerified;

    private String emailCheckToken;

    private String name;

    private String address;

    private String phone;

}
