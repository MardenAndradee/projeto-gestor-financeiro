package com.mofc.financeiro.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "TB_PARCELAS")
public class Parcelas implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idParcela;
    @ManyToOne
    @JoinColumn(name="despesa_id")
    private Despesas despesa;
    private double valor;
    private int nParcela;
    private LocalDate dataParcela;

    public long getIdParcela() {
        return idParcela;
    }

    public void setIdParcela(long idParcela) {
        this.idParcela = idParcela;
    }

    public Despesas getDespesa() {
        return despesa;
    }

    public void setDespesa(Despesas despesa) {
        this.despesa = despesa;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public int getnParcela() {
        return nParcela;
    }

    public void setnParcela(int nParcela) {
        this.nParcela = nParcela;
    }

    public LocalDate getDataParcela() {
        return dataParcela;
    }

    public void setDataParcela(LocalDate dataParcela) {
        this.dataParcela = dataParcela;
    }
}
