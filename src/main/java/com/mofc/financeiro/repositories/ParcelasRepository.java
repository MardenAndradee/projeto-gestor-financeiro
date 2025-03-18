package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Parcelas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelasRepository extends JpaRepository<Parcelas, Long> {
}
