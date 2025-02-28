package com.mofc.financeiro.entities;


import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "TB_DESPESAS")
public class Despesas implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idDespesa;
    private String descricao;
    private double valor;
    @ManyToOne
    @JoinColumn(name="categoria_id")
    private Categorias categoria;
    private String formaPagamento;
    private int qtdParcelas;
    private int nParcela;
    private int identificador;
    @ManyToOne
    @JoinColumn(name="usuario_id")
    private Usuarios usuario;

    public long getIdDespesa() {
        return idDespesa;
    }

    public void setIdDespesa(long idDespesa) {
        this.idDespesa = idDespesa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Categorias getCategoria() {
        return categoria;
    }

    public void setCategoria(Categorias categoria) {
        this.categoria = categoria;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public int getQtdParcelas() {
        return qtdParcelas;
    }

    public void setQtdParcelas(int qtdParcelas) {
        this.qtdParcelas = qtdParcelas;
    }

    public int getnParcela() {
        return nParcela;
    }

    public void setnParcela(int nParcela) {
        this.nParcela = nParcela;
    }

    public int getIdentificador() {
        return identificador;
    }

    public void setIdentificador(int identificador) {
        this.identificador = identificador;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }
}
