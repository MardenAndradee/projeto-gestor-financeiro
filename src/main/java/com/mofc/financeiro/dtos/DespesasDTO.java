package com.mofc.financeiro.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.entities.Usuarios;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.List;

public record DespesasDTO

        (@NotBlank(message = "Descrição não informada") String descricao, @Positive(message = "Valor deve ser maior que zero") @NotNull (message = "Valor não informado")Double valor, @NotNull Categorias categoria,
         @NotBlank String formaPagamento, @NotNull int qtdParcelas,
         @NotNull Usuarios usuario, @NotNull @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate data
        ){

    public Usuarios getUsuario(){
        return usuario;
    }

    public Categorias getCategoria() {
        return categoria;
    }
}
