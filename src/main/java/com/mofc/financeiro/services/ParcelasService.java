package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.ParcelasDTO;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.repositories.ParcelasRepository;
import com.mofc.financeiro.services.exceptions.ExceptionDelete;
import com.mofc.financeiro.services.exceptions.ObjectNotFoundException;
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

    public Parcelas findById(Long id){
        Optional<Parcelas> parcelas = this.parcelasRepository.findById(id);
        return parcelas.orElseThrow(() -> new ObjectNotFoundException(
                "Parcela não encontrada"
        ));
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
            throw new ExceptionDelete("Essa parcela não existe");
        }
    }

    public List<ParcelasDTO> filtrarParcelas(LocalDate dataInicial, LocalDate dataFinal, Long categoriaId, Long idUsuario){
        if (categoriaId != null){
            return parcelasRepository.findByMesAndCategoriaAndUsuario(dataInicial, dataFinal,categoriaId,idUsuario);
        } else {
            return parcelasRepository.findByMesAndUsuario(dataInicial, dataFinal, idUsuario);
        }

    }
}
