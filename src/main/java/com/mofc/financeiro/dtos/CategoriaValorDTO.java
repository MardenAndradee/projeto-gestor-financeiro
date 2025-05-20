package com.mofc.financeiro.dtos;

public record CategoriaValorDTO(String categoria, Double total) {

    public CategoriaValorDTO(String categoria, Double total) {
        this.categoria = categoria;
        this.total = total;
    }

    @Override
    public String categoria() {
        return categoria;
    }

    @Override
    public Double total() {
        return total;
    }
}
