package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.AuthenticationDTO;
import com.mofc.financeiro.dtos.LoginReponseDTO;
import com.mofc.financeiro.dtos.RegisterDTO;
import com.mofc.financeiro.email.EmailDetails;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.exceptions.RegistrarUsuarioException;
import com.mofc.financeiro.infra.security.TokenService;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(),data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generatetoken((Usuarios) auth.getPrincipal());


        return ResponseEntity.ok(new LoginReponseDTO(token));
    }


    @PostMapping("/redefinir-senha")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        // Verifica se o usuário existe
        var usuario = usuariosRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Gera o token com login do usuário
        String token = tokenService.generatetoken(usuario);

        // Monta o link de redefinição com o token
        String resetLink = "http://localhost:3000/redefinir-senha?token=" + token;

        // Monta a mensagem de e-mail
        String subject = "Redefinição de Senha";
        String msgBody = "Clique no link para redefinir sua senha: " + resetLink;

        // Envia o e-mail
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(usuario.getEmail());
        emailDetails.setSubject(subject);
        emailDetails.setMsgBody(msgBody);

        emailService.sendSimpleMail(emailDetails);

        return ResponseEntity.ok("E-mail de redefinição enviado com sucesso!");
    }



    @PutMapping("/redefinir-senha")
    public ResponseEntity<String> atualizarSenha(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {

        String token = authHeader.replace("Bearer ", "");

        String login = tokenService.validateToken(token);
        if (login == null || login.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido ou expirado.");
        }

        String novaSenha = body.get("novaSenha");
        if (novaSenha == null || novaSenha.length() < 6) {
            return ResponseEntity.badRequest().body("Senha inválida.");
        }

        var usuario = usuariosRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        String senhaCriptografada = new BCryptPasswordEncoder().encode(novaSenha);
        usuario.setSenha(senhaCriptografada);
        usuariosRepository.save(usuario);

        return ResponseEntity.ok("Senha atualizada com sucesso!");
    }



    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data)  {
        if(this.usuariosRepository.findByLogin(data.login()).isPresent());

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuarios newUsuario = new Usuarios(data.nome(), data.email(), data.celular(),
                data.login(), encryptedPassword);

        this.usuariosRepository.save(newUsuario);

        return ResponseEntity.ok().build();


    }
}
