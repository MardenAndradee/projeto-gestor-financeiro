package com.mofc.financeiro.repositories;


import com.mofc.financeiro.entities.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long> {

    List<Categorias> findByUsuarioIdUsuario(Long idUsuario);
}
