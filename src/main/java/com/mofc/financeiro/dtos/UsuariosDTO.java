package com.mofc.financeiro.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuariosDTO(@NotBlank String nome, String email, String celular, @NotNull String login, @NotNull String senha) {
}
