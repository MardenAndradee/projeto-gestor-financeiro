package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long>{

     UserDetails findByLogin(String login);


}
