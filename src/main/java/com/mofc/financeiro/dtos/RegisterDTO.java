package com.mofc.financeiro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
    @NotBlank(message = "Nome é obrigatorio")String nome,
    @NotBlank(message = "Email invalido") String email,
    String celular,
    String login,
    @NotBlank(message = "Senha deve ter no minimo 3 caracteres") String senha

){}
