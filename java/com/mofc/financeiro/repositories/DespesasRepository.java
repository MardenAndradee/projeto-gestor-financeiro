package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespesasRepository extends JpaRepository<Despesas, Long> {

}
