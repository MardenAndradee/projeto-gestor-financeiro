package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.UsuariosDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.UsuariosRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class UsuariosController {

    @Autowired
    UsuariosRepository usuariosRepository;

    @PostMapping("/usuarios")
    public ResponseEntity<Usuarios> saveUsuarios(@RequestBody @Valid UsuariosDTO usuariosDTO){
        var usuarios = new Usuarios();
        BeanUtils.copyProperties(usuariosDTO, usuarios);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuariosRepository.save(usuarios));
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuarios>> getAllUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuariosRepository.findAll());
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Object> getOneUsuario(@PathVariable(value="id")long id){
        Optional<Usuarios> usuarios0 = usuariosRepository.findById(id);
        //if(usuarios0.isEmpty){
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        //}
        return ResponseEntity.status(HttpStatus.OK).body(usuarios0.get());
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Object> updateUsuario(@PathVariable(value="id") long id,
                                                @RequestBody @Valid UsuariosDTO usuariosDTO){
        Optional<Usuarios> usuario0 = usuariosRepository.findById(id);
        //if(usuario0.isEmpty()){
          //  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não encontrado");
        //}

        var usuarios = usuario0.get();
        BeanUtils.copyProperties(usuariosDTO, usuarios);
        return ResponseEntity.status(HttpStatus.OK).body(usuariosRepository.save(usuarios));
    }
}
