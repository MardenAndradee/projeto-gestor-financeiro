package com.mofc.financeiro.repositories;

import com.mofc.financeiro.entities.Parcelas;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParcelasRepository extends JpaRepository<Parcelas, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Parcelas p WHERE p.despesa.id = :despesaId")
    void deleteByDespesaId(@Param("despesaId") Long despesaId);

    @Query("SELECT p FROM Parcelas p WHERE EXTRACT(MONTH FROM p.dataParcela) = :mes")
    List<Parcelas> findByMes(@Param("mes") int mes);

    @Query("SELECT p FROM Parcelas p WHERE p.despesa.categoria.id = :categoriaId")
    List<Parcelas> findByCategoria(@Param("categoriaId") Long categoriaId);

    @Query("SELECT p FROM Parcelas p WHERE EXTRACT(MONTH FROM p.dataParcela) = :mes AND p.despesa.categoria.id = :categoriaId")
    List<Parcelas> findByMesAndCategoria(@Param("mes") int mes, @Param("categoriaId") Long categoriaId);
}
