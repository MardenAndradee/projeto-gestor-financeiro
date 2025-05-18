package com.mofc.financeiro.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;
import java.time.LocalDate;

public record ParcelasDTO(
        long idParcela,
        String descricao,
        @NotNull @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate dataParcela,
        String formaPagamento,
        Long idCategoria,
        String categoria,
        int nParcela,
        int qtdParcelas,
        double valor
) {}

