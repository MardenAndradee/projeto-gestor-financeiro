package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesasRepository extends JpaRepository<Despesas, Long> {

}
