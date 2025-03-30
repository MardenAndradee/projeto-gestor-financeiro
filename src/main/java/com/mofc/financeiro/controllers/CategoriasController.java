package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.CategoriasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.CategoriasService;
import com.mofc.financeiro.services.UsuariosService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoriasController {

    @Autowired
    CategoriasService categoriasService;

    @Autowired
    UsuariosService usuariosService;

    @PostMapping("/categoria")
    public ResponseEntity<Categorias> saveCategorias(@RequestBody @Valid CategoriasDTO categoriasDTO){
        var categorias = new Categorias();
        BeanUtils.copyProperties(categoriasDTO, categorias);

        Usuarios usuario = usuariosService.findById(categoriasDTO.getUsuario().getIdUsuario());
        categorias.setUsuario(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(categoriasService.create(categorias));
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<Categorias>> getAllCategorias(){
        return ResponseEntity.status(HttpStatus.OK).body(categoriasService.getAllCategorias());
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Object> getOneCategoria(@PathVariable(value="id")long id){
        Categorias categorias = this.categoriasService.findById(id);
        return ResponseEntity.ok().body(categorias);
    }

    @PutMapping("/categoria/{id}")
    public ResponseEntity<Object> updateCategoria(@Valid @RequestBody Categorias categorias, @PathVariable Long id){
        categorias.setIdCategoria(id);
        this.categoriasService.update(categorias);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<Object> deleteCategoria(@PathVariable(value = "id") Long id){
        this.categoriasService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
