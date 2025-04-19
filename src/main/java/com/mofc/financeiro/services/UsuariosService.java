package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.PerfilDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.exceptions.RecursoNaoEncontradoException;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.exceptions.ExceptionDelete;
import com.mofc.financeiro.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuariosService implements UserDetailsService {

    @Autowired
    UsuariosRepository usuariosRepository;

    public Usuarios findById(Long id){
        Optional<Usuarios> user = this.usuariosRepository.findById(id);

        return user.orElseThrow(() -> new RecursoNaoEncontradoException(
                "Recurso não encontrado"));
    }

    public List<Usuarios> getAllUsuarios() {
        return usuariosRepository.findAll();
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

        if (user.getEmail() != null) {
            users.setEmail(user.getEmail());
        }
        if (user.getNome() != null) {
            users.setNome(user.getNome());
        }
        if (user.getSenha() != null) {
            users.setSenha(user.getSenha());
        }
        if(user.getLogin() !=null){
            user.setLogin(user.getLogin());
        }
        return this.usuariosRepository.save(users);
    }


    @Transactional
    public void delete(Long id){
        findById(id);
        try{
            this.usuariosRepository.deleteById(id);
        }catch (Exception e){
            throw new ExceptionDelete("Este usuario não existe");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuariosRepository.findByLogin(username).orElseThrow(() -> new UsernameNotFoundException
                ("Usuario não encontrado"));
    }

    public PerfilDTO buscarPerfilUsuarioLogado(String login){
        Usuarios usuario = (Usuarios) usuariosRepository.findByLogin(login).orElseThrow(()
                ->  new UsernameNotFoundException("Usuario não encontrado"));

        return new PerfilDTO(usuario.getNome(), usuario.getEmail(), usuario.getCelular());
    }
}