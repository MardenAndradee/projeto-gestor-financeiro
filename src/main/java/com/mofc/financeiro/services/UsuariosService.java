package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.LoginReponseDTO;
import com.mofc.financeiro.dtos.LoginSucessoDTO;
import com.mofc.financeiro.dtos.PerfilAtualizarDTO;
import com.mofc.financeiro.dtos.PerfilDTO;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.exceptions.RecursoNaoEncontradoException;
import com.mofc.financeiro.exceptions.RegistrarUsuarioException;
import com.mofc.financeiro.exceptions.ValidacacaoException;
import com.mofc.financeiro.repositories.UsuariosRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuariosService implements UserDetailsService {

    @Autowired
    UsuariosRepository usuariosRepository;

    @Autowired
    private Validator validator;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
            throw new ValidacacaoException("Este usuario não existe");
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


    @Transactional
    public LoginSucessoDTO atualizarPerfil(String login, PerfilAtualizarDTO perfilAtualizarDTO){
        Usuarios usuario = (Usuarios) usuariosRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
        try {
            if (perfilAtualizarDTO.nome() != null) usuario.setNome(perfilAtualizarDTO.nome());

            if (perfilAtualizarDTO.email() != null) usuario.setEmail(perfilAtualizarDTO.email());

            if (perfilAtualizarDTO.celular().isBlank() ){
                usuario.setCelular(perfilAtualizarDTO.celular());
            }else if(perfilAtualizarDTO.celular().length() >= 11){
                usuario.setCelular(perfilAtualizarDTO.celular());
            }else {
                throw new IllegalArgumentException("Telefone invalido");
            }

            if (perfilAtualizarDTO.senha().length() >= 3 && perfilAtualizarDTO.senha().length() < 25){
                String senhaCriptografada = passwordEncoder.encode(perfilAtualizarDTO.senha());
                usuario.setSenha(senhaCriptografada);
            }else {
                throw new IllegalArgumentException("Senha deve ter entre 3 a 25 caracteres");
            }

            Set<ConstraintViolation<Usuarios>> violations = validator.validate(usuario);

            if(!violations.isEmpty()){
                String mensagemErro = violations.iterator().next().getMessage();
                throw new ValidacacaoException(mensagemErro);
            }

            usuariosRepository.save(usuario);
            return new LoginSucessoDTO ("Dados alterados com sucesso");

        }catch (ValidacacaoException ex){
            throw new ValidacacaoException("Caracteres invalidos");
        }
    }
}