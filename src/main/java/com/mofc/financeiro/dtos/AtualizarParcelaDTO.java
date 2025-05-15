package com.mofc.financeiro.dtos;

import java.time.LocalDate;

public class AtualizarParcelaDTO {
    private Long idParcela;
    private String descricao;
    private String formaPagamento;
    private String categoria;
    private LocalDate dataParcela;
    private Double valor;

    public Long getIdParcela() {
        return idParcela;
    }

    public void setIdParcela(Long idParcela) {
        this.idParcela = idParcela;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public LocalDate getDataParcela() {
        return dataParcela;
    }

    public void setDataParcela(LocalDate dataParcela) {
        this.dataParcela = dataParcela;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
