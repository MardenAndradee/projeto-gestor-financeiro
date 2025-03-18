package com.mofc.financeiro.dtos;

import com.mofc.financeiro.entities.Despesas;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ParcelasDTO(@NotNull Despesas despesa, @NotNull double valor, @NotNull int nParcela,
                          @NotNull LocalDate dataParcela) {
}
