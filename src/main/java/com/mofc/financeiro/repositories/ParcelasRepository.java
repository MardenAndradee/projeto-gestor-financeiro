package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Parcelas;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelasRepository extends JpaRepository<Parcelas, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Parcelas p WHERE p.despesa.id = :despesaId")
    void deleteByDespesaId(@Param("despesaId") Long despesaId);

}
