package com.mofc.financeiro.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PerfilAtualizarDTO(

    @NotBlank(message = "Nome deve ter no minimo 4 caracteres")String nome,
    @Email(message = "Email invalido")String email,
    @NotBlank(message = "Telefone invalido")String celular,
    String senha
    )
{}
