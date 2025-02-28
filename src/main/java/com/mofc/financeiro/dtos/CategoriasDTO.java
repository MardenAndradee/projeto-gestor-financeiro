package com.mofc.financeiro.dtos;

import com.mofc.financeiro.entities.Usuarios;
import jakarta.validation.constraints.NotBlank;

public record CategoriasDTO(@NotBlank String categoria, Usuarios usuario) {

    public Usuarios getUsuario() {
        return usuario;
    }

}
