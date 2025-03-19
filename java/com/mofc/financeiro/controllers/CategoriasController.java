package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.CategoriasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
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
    CategoriasRepository categoriasRepository;

    @Autowired
    UsuariosRepository usuariosRepository;

    @PostMapping("/categoria")
    public ResponseEntity<Categorias> saveCategorias(@RequestBody @Valid CategoriasDTO categoriasDTO){
        var categorias = new Categorias();
        BeanUtils.copyProperties(categoriasDTO, categorias);
        // Buscar o usuário pelo ID antes de salvar
        Usuarios usuario = usuariosRepository.findById(categoriasDTO.getUsuario().getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        categorias.setUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriasRepository.save(categorias));
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<Categorias>> getAllCategorias(){
        return ResponseEntity.status(HttpStatus.OK).body(categoriasRepository.findAll());
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Object> getOneCategoria(@PathVariable(value="id")long id){
        Optional<Categorias> categorias0 = categoriasRepository.findById(id);
        if(categorias0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(categorias0.get());
    }

    @PutMapping("/categoria/{id}")
    public ResponseEntity<Object> updateCategoria(@PathVariable(value="id") long id,
                                                @RequestBody @Valid CategoriasDTO categoriasDTO){
        Optional<Categorias> categorias0 = categoriasRepository.findById(id);
        if(categorias0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada");
        }

        var categorias = categorias0.get();
        BeanUtils.copyProperties(categoriasDTO, categorias);
        return ResponseEntity.status(HttpStatus.OK).body(categoriasRepository.save(categorias));
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<Object> deleteCategoria(@PathVariable(value = "id") Long id){
        Optional<Categorias> categorias0 = categoriasRepository.findById(id);
        if(categorias0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada");
        }
        categoriasRepository.delete(categorias0.get());
        return ResponseEntity.status(HttpStatus.OK).body("Categoria deletada com sucesso!");
    }
}
