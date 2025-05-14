package com.mofc.financeiro.dtos;

import com.mofc.financeiro.entities.Usuarios;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriasDTO(@NotBlank(message = "Categoria não pode ser vazio") @Size(max = 20,message = "Categoria pode ter no maximo 20 caracteres")String categoria, Usuarios usuario) {


    public Usuarios getUsuario() {
        return usuario;
    }

}
