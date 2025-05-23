package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.LoginSucessoDTO;
import com.mofc.financeiro.dtos.PerfilAtualizarDTO;
import com.mofc.financeiro.dtos.PerfilDTO;
import com.mofc.financeiro.dtos.UsuariosDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.UsuariosService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
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
        return ResponseEntity.status(HttpStatus.CREATED).body(usuariosService.create(usuarios));
    }



    @GetMapping("/usuario")
    public ResponseEntity<List<Usuarios>> getAllUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuariosService.getAllUsuarios());
    }


    @GetMapping("/usuario/{id}")
    public ResponseEntity<Usuarios> findById(@PathVariable Long id){
        Usuarios usuarios = this.usuariosService.findById(id);
        return ResponseEntity.ok().body(usuarios);


    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<Void> updateUser(@Valid @RequestBody Usuarios user, @PathVariable Long id){
        user.setIdUsuario(id);
        this.usuariosService.update(user);
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        this.usuariosService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUsuarioLogado(){
        Usuarios usuario = (Usuarios) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(usuario);
    }


    @GetMapping("/usuario/perfil")
    public ResponseEntity<PerfilDTO> getPerfil(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        PerfilDTO perfil = usuariosService.buscarPerfilUsuarioLogado(login);
        return ResponseEntity.ok(perfil);
    }


    @PutMapping("usuario/perfil")
    public ResponseEntity<LoginSucessoDTO> atualizarPerfil(@RequestBody @Valid PerfilAtualizarDTO dto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        LoginSucessoDTO resposta = usuariosService.atualizarPerfil(login,dto);

        return ResponseEntity.ok(resposta);
    }
}