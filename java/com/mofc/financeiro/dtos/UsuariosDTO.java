package com.mofc.financeiro.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuariosDTO(@NotBlank String nome, String email, int celular, @NotNull String login, @NotNull String senha) {
}
