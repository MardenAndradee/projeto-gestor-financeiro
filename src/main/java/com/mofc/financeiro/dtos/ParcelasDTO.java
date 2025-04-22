package com.mofc.financeiro.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ParcelasDTO(
        String descricao,
        @NotNull @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate dataParcela,
        String formaPagamento,
        String categoria,
        int nParcela,
        int qtdParcelas,
        double valor
) {}
