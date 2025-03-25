package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.AuthenticationDTO;
import com.mofc.financeiro.dtos.LoginReponseDTO;
import com.mofc.financeiro.dtos.RegisterDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.infra.security.TokenService;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.exceptions.ObjectNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private TokenService tokenService;



    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generatetoken((Usuarios) auth.getPrincipal());

            return ResponseEntity.ok(new LoginReponseDTO(token));
        }catch (BadCredentialsException ex){
            throw new ObjectNotFoundException("Login não permitido");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.usuariosRepository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuarios newUsuario = new Usuarios(data.nome(), data.email(), data.celular(),
                data.login(), encryptedPassword);

        this.usuariosRepository.save(newUsuario);

        return ResponseEntity.ok().build();
    }
}
