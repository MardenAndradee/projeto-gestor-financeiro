package com.mofc.financeiro.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "TB_USUARIOS")
public class Usuarios implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idUsuario;
    private String nome;
    private String email;
    private int celular;
    private String login;
    private String senha;

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
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

    public int getCelular() {
        return celular;
    }

    public void setCelular(int celular) {
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
}
