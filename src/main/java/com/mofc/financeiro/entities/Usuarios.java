package com.mofc.financeiro.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "TB_USUARIOS")
public class Usuarios implements Serializable, UserDetails {
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idUsuario;


    @Column(name = "nome",length = 25,nullable = false,unique = true)
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 25)
    private String nome;

    @Column(name = "email",length = 30,nullable = false,unique = true)
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 30)
    private String email;


    @Column(name = "celular", nullable = false, unique = true)
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 12)
    private String celular;


    @Column(name = "login",length = 15,nullable = false,unique = true)
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 15)
    private String login;


    @Column(name = "senha",nullable = false,unique = false)
    @NotNull
    @NotEmpty

    private String senha;



    public Usuarios(){}

    public Usuarios(String nome, String email, String celular, String login, String senha) {
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.login = login;
        this.senha = senha;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}