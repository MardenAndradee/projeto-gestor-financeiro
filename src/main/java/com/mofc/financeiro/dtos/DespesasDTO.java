package com.mofc.financeiro.dtos;

import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Usuarios;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DespesasDTO(@NotBlank String descricao, @NotNull double valor, @NotNull Categorias categoria,
                          @NotBlank String formaPagamento, @NotNull int qtdParcelas, @NotNull int nParcela,
                          @NotNull int identificador, @NotNull Usuarios usuario) {

    public Usuarios getUsuario(){
        return usuario;
    }

    public Categorias getCategoria() {
        return categoria;
    }
}
