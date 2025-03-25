package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.UsuariosDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.UsuariosRepository;
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
public class UsuariosController {

    @Autowired
    UsuariosRepository usuariosRepository;

    @Autowired
    UsuariosService usuariosService;

    @PostMapping("/usuario")
    public ResponseEntity<Usuarios> saveUsuarios(@RequestBody @Valid UsuariosDTO usuariosDTO){
        var usuarios = new Usuarios();
        BeanUtils.copyProperties(usuariosDTO, usuarios);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuariosRepository.save(usuarios));
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<Usuarios>> getAllUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuariosRepository.findAll());
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Usuarios> findById(@PathVariable Long id){
        Usuarios usuarios = this.usuariosService.findById(id);
        return ResponseEntity.ok().body(usuarios);
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<Object> updateUsuario(@PathVariable(value="id") long id,
                                                @RequestBody @Valid UsuariosDTO usuariosDTO){
        Optional<Usuarios> usuarios0 = usuariosRepository.findById(id);
        if(usuarios0.isEmpty()){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        var usuarios = usuarios0.get();
        BeanUtils.copyProperties(usuariosDTO, usuarios);
        return ResponseEntity.status(HttpStatus.OK).body(usuariosRepository.save(usuarios));
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable(value = "id") Long id){
        Optional<Usuarios> usuarios0 = usuariosRepository.findById(id);
        if(usuarios0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
        usuariosRepository.delete(usuarios0.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuário deletado com sucesso!");
    }
}
