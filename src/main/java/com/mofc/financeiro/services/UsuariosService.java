package com.mofc.financeiro.services;

import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UsuariosService implements UserDetailsService {

    @Autowired
    UsuariosRepository usuariosRepository;

    public Usuarios findById(Long id){
        Optional<Usuarios> user = this.usuariosRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                " Usuario esta dando erro "
        ));
    }


    @Transactional
    public Usuarios create(Usuarios user){
        user.setIdUsuario(null);
        user = this.usuariosRepository.save(user);
        return user;
    }


    @Transactional
    public Usuarios update(Usuarios user){
        Usuarios users = findById(user.getIdUsuario());
        users.setSenha(users.getSenha());
        return this.usuariosRepository.save(users);
    }














    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuariosRepository.findByLogin(username);
    }
}
