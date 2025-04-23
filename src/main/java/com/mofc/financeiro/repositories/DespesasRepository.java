package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DespesasRepository extends JpaRepository<Despesas, Long> {

    List<Despesas> findAllByUsuarioLogin(String login);

}
