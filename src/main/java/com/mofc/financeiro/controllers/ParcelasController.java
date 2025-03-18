package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.ParcelasDTO;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.repositories.ParcelasRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ParcelasController {
    @Autowired
    ParcelasRepository parcelasRepository;

    @PostMapping("/parcelas")
    public ResponseEntity<Parcelas> saveParcelas(@RequestBody @Valid ParcelasDTO parcelasDTO){
        var parcelas = new Parcelas();
        BeanUtils.copyProperties(parcelasDTO, parcelas);
        return ResponseEntity.status(HttpStatus.CREATED).body(parcelasRepository.save(parcelas));
    }

    @GetMapping("/parcelas")
    public ResponseEntity<List<Parcelas>> getAllParcelas(){
        return ResponseEntity.status(HttpStatus.OK).body(parcelasRepository.findAll());
    }

    @GetMapping("/parcelas/{id}")
    public ResponseEntity<Object> getOneParcela(@PathVariable(value="id")long id){
        Optional<Parcelas> parcelas = parcelasRepository.findById(id);
        if(parcelas.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parcela não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(parcelas.get());
    }

    @PutMapping("/parcelas/{id}")
    public ResponseEntity<Object> updateParcela(@PathVariable(value="id") long id,
                                                  @RequestBody @Valid ParcelasDTO parcelasDTO){
        Optional<Parcelas> parcelas0 = parcelasRepository.findById(id);
        if(parcelas0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parcela não encontrada");
        }

        var parcelas = parcelas0.get();
        BeanUtils.copyProperties(parcelasDTO, parcelas);
        return ResponseEntity.status(HttpStatus.OK).body(parcelasRepository.save(parcelas));
    }

    @DeleteMapping("/parcelas/{id}")
    public ResponseEntity<Object> deleteParcelas(@PathVariable(value = "id") Long id){
        Optional<Parcelas> parcelas = parcelasRepository.findById(id);
        if(parcelas.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parcela não encontrada");
        }
        parcelasRepository.delete(parcelas.get());
        return ResponseEntity.status(HttpStatus.OK).body("Parcela deletada com sucesso!");
    }

}
