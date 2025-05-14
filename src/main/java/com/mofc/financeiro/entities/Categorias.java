package com.mofc.financeiro.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

@Entity
@Table(name = "TB_CATEGORIAS")
public class Categorias implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idCategoria;


    private String categoria;
    @ManyToOne(optional = true)
    @JoinColumn(name="usuario_id")
    private Usuarios usuario;

    public long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }
}
