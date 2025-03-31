package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.DespesasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.DespesasService;
import com.mofc.financeiro.services.UsuariosService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class DespesasController {

    @Autowired
    DespesasRepository despesasRepository;
    @Autowired
    UsuariosRepository usuariosRepository;
    @Autowired
    CategoriasRepository categoriasRepository;
    @Autowired
    DespesasService despesasService;
    @Autowired
    UsuariosService usuariosService;
    @Autowired
    CategoriasService categoriasService;


    @PostMapping("/despesa")
    public Despesas registrarDespesa(@RequestBody @Valid DespesasDTO despesasDTO) {
        var despesas = new Despesas();
        BeanUtils.copyProperties(despesasDTO, despesas);

        Usuarios usuario = usuariosService.findById(despesasDTO.getUsuario().getIdUsuario());

        Categorias categoria = categoriasService.findById(despesasDTO.getCategoria().getIdCategoria());

        despesas.setCategoria(categoria);
        despesas.setUsuario(usuario);

        return despesasService.registrarDespesaComParcelas(despesas);
    }




    @GetMapping("/despesa")
    public ResponseEntity<List<Despesas>>getAllDespesas(){
        return ResponseEntity.status(HttpStatus.OK).body(despesasService.getAllDespesas());
    }



    @GetMapping("/despesa/{id}")
    public ResponseEntity<Despesas> findById(@PathVariable Long id){
        Despesas despesas = this.despesasService.findById(id);
        return ResponseEntity.ok().body(despesas);
    }



    @PutMapping("/despesa/{id}")
    public ResponseEntity<Void> updateDespesa(@Valid @RequestBody Despesas despesas, @PathVariable Long id){
        despesas.setIdDespesa(id);
        this.despesasService.update(despesas);
        return ResponseEntity.noContent().build();
    }



    @DeleteMapping("/despesa/{id}")
    public ResponseEntity<Void> deleteDespesa(@PathVariable Long id){
        this.despesasService.deletarDespesaComParcelas(id);
        return ResponseEntity.noContent().build();
    }
}
