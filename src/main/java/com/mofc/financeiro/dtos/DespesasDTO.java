package com.mofc.financeiro.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Usuarios;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DespesasDTO(@NotBlank String descricao, @NotNull double valor, @NotNull Categorias categoria,
                          @NotBlank String formaPagamento, @NotNull int qtdParcelas, @NotNull int nParcela,
                          @NotNull Long identificador, @NotNull Usuarios usuario, @NotNull @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate data) {

    public Usuarios getUsuario(){
        return usuario;
    }

    public Categorias getCategoria() {
        return categoria;
    }
}
