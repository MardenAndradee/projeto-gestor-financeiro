package com.mofc.financeiro.repositories;

import com.mofc.financeiro.dtos.CategoriaValorDTO;
import com.mofc.financeiro.dtos.ParcelasDTO;
import com.mofc.financeiro.entities.Parcelas;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParcelasRepository extends JpaRepository<Parcelas, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Parcelas p WHERE p.despesa.id = :despesaId")
    void deleteByDespesaId(@Param("despesaId") Long despesaId);

    //@Query("SELECT p FROM Parcelas p WHERE EXTRACT(MONTH FROM p.dataParcela) = :mes AND p.despesa.usuario.id = :usuarioId")
    //List<Parcelas> findByMesAndUsuario(@Param("mes") int mes, @Param("usuarioId") Long usuarioId);

    @Query("select new com.mofc.financeiro.dtos.ParcelasDTO(" +
            "p.idParcela, d.descricao, p.dataParcela, d.formaPagamento, c.idCategoria, c.categoria, p.nParcela, d.qtdParcelas, p.valor) " +
            "from Parcelas p " +
            "join p.despesa d " +
            "join d.categoria c")
    List<ParcelasDTO> findAllParcelasDTO();

    @Query("select new com.mofc.financeiro.dtos.ParcelasDTO(" +
            "p.idParcela, d.descricao, p.dataParcela, d.formaPagamento, c.idCategoria, c.categoria, p.nParcela, d.qtdParcelas, p.valor) " +
            "from Parcelas p " +
            "join p.despesa d " +
            "join d.categoria c " +
            "where p.dataParcela >= :dataInicial and p.dataParcela <= :dataFinal " +
            "and c.idCategoria = :categoriaId " +
            "and d.usuario.id = :usuarioId")
    List<ParcelasDTO> findByMesAndCategoriaAndUsuario(@Param("dataInicial")LocalDate dataInicial,
                                                      @Param("dataFinal") LocalDate dataFinal,
                                                      @Param("categoriaId") Long categoriaId,
                                                      @Param("usuarioId") Long usuarioId);


    @Query("select new com.mofc.financeiro.dtos.ParcelasDTO(" +
            "p.idParcela, d.descricao, p.dataParcela, d.formaPagamento, c.idCategoria, c.categoria, p.nParcela, d.qtdParcelas, p.valor) " +
            "from Parcelas p " +
            "join p.despesa d " +
            "join d.categoria c " +
            "where p.dataParcela >= :dataInicial and p.dataParcela <= :dataFinal and d.usuario.id = :usuarioId")
    List<ParcelasDTO> findByMesAndUsuario(@Param("dataInicial")LocalDate dataInicial,
                                          @Param("dataFinal") LocalDate dataFinal,
                                          @Param("usuarioId") Long usuarioId);

    @Query("select new com.mofc.financeiro.dtos.ParcelasDTO(" +
            "p.idParcela, d.descricao, p.dataParcela, d.formaPagamento, c.idCategoria, c.categoria, p.nParcela, d.qtdParcelas, p.valor) " +
            "from Parcelas p " +
            "join p.despesa d " +
            "join d.categoria c " +
            "where p.idParcela = :idParcela")
    List<ParcelasDTO> findByIdParcela(@Param("idParcela")Long idParcela);

    @Query("SELECT SUM(p.valor) " +
            "FROM Parcelas p " +
            "JOIN p.despesa d " +
            "JOIN d.usuario u " +  // se quiser deixar claro
            "WHERE p.dataParcela >= :dataInicial AND p.dataParcela <= :dataFinal AND d.usuario.id = :usuarioId")
    Optional<Double> getValorTotal(@Param("dataInicial") LocalDate dataInicial,
                                   @Param("dataFinal") LocalDate dataFinal,
                                   @Param("usuarioId") Long usuarioId);

    @Query("SELECT new com.mofc.financeiro.dtos.CategoriaValorDTO(p.despesa.categoria.categoria, SUM(p.valor)) " +
            "FROM Parcelas p " +
            "WHERE p.despesa.usuario.id = :usuarioId " +
            "AND p.dataParcela >= :dataInicio " +
            "AND p.dataParcela <= :dataFim " +
            "GROUP BY p.despesa.categoria.categoria")
    List<CategoriaValorDTO> somarValoresPorCategoria(
            @Param("usuarioId") Long usuarioId,
            @Param("dataInicio") LocalDate dataInicial,
            @Param("dataFim") LocalDate dataFinal
    );
}
