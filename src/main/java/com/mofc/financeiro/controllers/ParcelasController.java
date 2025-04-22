package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.ParcelasDTO;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.services.ParcelasService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ParcelasController {

    @Autowired
    ParcelasService parcelasService;


    @GetMapping("/parcelas")
    public ResponseEntity<List<Parcelas>> getAllParcelas(){
        return ResponseEntity.status(HttpStatus.OK).body(parcelasService.getAllParcelas());
    }

    @GetMapping("/parcelas/{id}")
    public ResponseEntity<Object> getOneParcela(@PathVariable(value="id")long id){
        Parcelas parcelas = this.parcelasService.findById(id);
        return ResponseEntity.ok().body(parcelas);
    }



    @PutMapping("/parcelas/{id}")
    public ResponseEntity<Object> updateParcela(@PathVariable(value="id") long id,
                                                @RequestBody @Valid Parcelas parcelas){
        parcelas.setIdParcela(id);
        this.parcelasService.update(parcelas);
        return ResponseEntity.noContent().build();
    }



    @DeleteMapping("/parcelas/{id}")
    public ResponseEntity<Object> deleteParcelas(@PathVariable(value = "id") Long id){
        this.parcelasService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("parcelas/filtrar")
    public ResponseEntity<List<ParcelasDTO>>filtrarParcelas(
            @RequestParam(required = false)Integer mes,
            @RequestParam(required = false) Optional<Long> categoriaId,
            @RequestParam(required = true) Optional<Long> idUsuario){


        List<ParcelasDTO> parcelas = parcelasService.filtrarParcelas(mes, categoriaId.orElse(null),idUsuario.orElse(null));
        return ResponseEntity.ok(parcelas);

    }

}