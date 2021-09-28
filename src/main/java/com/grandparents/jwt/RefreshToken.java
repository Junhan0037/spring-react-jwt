package com.grandparents.jwt;

import com.grandparents.common.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @Builder
@NoArgsConstructor @AllArgsConstructor
public class RefreshToken extends BaseTimeEntity {

    @Id
    @Column(name = "token_key")
    private String key;

    @Column(name = "token_value")
    private String value;

    public RefreshToken updateToken(String token) {
        this.value = token;
        return this;
    }

}
