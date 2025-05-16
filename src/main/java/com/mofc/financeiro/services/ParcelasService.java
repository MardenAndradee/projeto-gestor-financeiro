package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.AtualizarParcelaDTO;
import com.mofc.financeiro.dtos.ParcelasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.exceptions.ValidacacaoException;
import com.mofc.financeiro.repositories.ParcelasRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ParcelasService {

    @Autowired
    ParcelasRepository parcelasRepository;

    @Autowired
    DespesasRepository despesasRepository;

    @Autowired
    CategoriasRepository categoriasRepository;

    public Parcelas findById(Long id){
        Optional<Parcelas> parcelas = this.parcelasRepository.findById(id);
        return parcelas.orElseThrow(() -> new ValidacacaoException(
                "Parcela não encontrada"
        ));
    }

    public List<ParcelasDTO> findByIdDTO(Long idParcela){
        return parcelasRepository.findByIdParcela(idParcela);
    }

    public List<Parcelas> getAllParcelas(){
        return parcelasRepository.findAll();
    }


    @Transactional
    public Parcelas update(Parcelas parcelas){
        Parcelas parcelas1 = findById(parcelas.getIdParcela());

        if(parcelas.getValor() != 0){
            parcelas1.setValor(parcelas.getValor());
        }

        return this.parcelasRepository.save(parcelas1);
    }

    @Transactional
    public void delete(Long id){
        findById(id);

        try{
            this.parcelasRepository.deleteById(id);
        }catch (Exception e){
            throw new ValidacacaoException("Essa parcela não existe");
        }
    }

    public List<ParcelasDTO> filtrarParcelas(LocalDate dataInicial, LocalDate dataFinal, Long categoriaId, Long idUsuario){
        if(dataFinal.isBefore(dataInicial)){
            throw new IllegalArgumentException("Data final não pode ser menor que a inicial");
        }
        if (categoriaId != null){
            return parcelasRepository.findByMesAndCategoriaAndUsuario(dataInicial, dataFinal,categoriaId,idUsuario);
        } else {
            return parcelasRepository.findByMesAndUsuario(dataInicial, dataFinal, idUsuario);
        }

    }

    @Transactional
    public void atualizarParcela(Long idParcela, AtualizarParcelaDTO dto) {
        Parcelas parcela = parcelasRepository.findById(idParcela)
                .orElseThrow(() -> new RuntimeException("Parcela não encontrada"));

        Despesas despesa = parcela.getDespesa();

        // Atualiza os dados da entidade Despesa
        despesa.setDescricao(dto.getDescricao());
        despesa.setFormaPagamento(dto.getFormaPagamento());
        Categorias categoria = categoriasRepository.findById(Long.parseLong(dto.getCategoria()))
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        despesa.setCategoria(categoria);

        // Atualiza os dados da entidade Parcelas
        parcela.setValor(dto.getValor());
        parcela.setDataParcela(dto.getDataParcela());

        // Repositórios JPA fazem flush automático no final da transação,
        // mas se quiser garantir, pode chamar save:
        despesasRepository.save(despesa);
        parcelasRepository.save(parcela);
    }
}
