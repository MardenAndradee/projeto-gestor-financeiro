package com.mofc.financeiro.controllers;

import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.infra.security.TokenService;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.EmailService;
import com.mofc.financeiro.email.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // <-- isso libera o front-end Next.js local
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;


    @PostMapping("/send")
    public String sendMail(@RequestBody EmailDetails details){
        return emailService.sendSimpleMail(details);
    }
}
