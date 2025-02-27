package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long>{

}
