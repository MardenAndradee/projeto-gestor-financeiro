package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.DespesasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.DespesasService;
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

//    @PostMapping("/despesa")
//    public ResponseEntity<Despesas> saveDespesas(@RequestBody @Valid DespesasDTO despesasDTO){
//        var despesas = new Despesas();
//        BeanUtils.copyProperties(despesasDTO, despesas);
//
//        Usuarios usuario = usuariosRepository.findById(despesasDTO.getUsuario().getIdUsuario())
//                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
//
//        Categorias categoria = categoriasRepository.findById(despesasDTO.getCategoria().getIdCategoria())
//                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
//
//        despesas.setCategoria(categoria);
//        despesas.setUsuario(usuario);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(despesasRepository.save(despesas));
//    }

    @PostMapping("/despesa")
    public Despesas registrarDespesa(@RequestBody @Valid DespesasDTO despesasDTO) {
        var despesas = new Despesas();
        BeanUtils.copyProperties(despesasDTO, despesas);

        Usuarios usuario = usuariosRepository.findById(despesasDTO.getUsuario().getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Categorias categoria = categoriasRepository.findById(despesasDTO.getCategoria().getIdCategoria())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        despesas.setCategoria(categoria);
        despesas.setUsuario(usuario);

        return despesasService.registrarDespesaComParcelas(despesas);
    }

    @GetMapping("/despesa")
    public ResponseEntity<List<Despesas>> getAllDespesas(){
        return ResponseEntity.status(HttpStatus.OK).body(despesasRepository.findAll());
    }

    @GetMapping("/despesa/{id}")
    public ResponseEntity<Object> getOneDespesas(@PathVariable(value="id")long id){
        Optional<Despesas> despesas0 = despesasRepository.findById(id);
        if(despesas0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(despesas0.get());
    }

    @PutMapping("/despesa/{id}")
    public ResponseEntity<Object> updateDespesa(@PathVariable(value="id") long id,
                                                @RequestBody @Valid DespesasDTO despesasDTO){
        Optional<Despesas> despesas0 = despesasRepository.findById(id);
        if(despesas0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
        }

        var despesas = despesas0.get();
        BeanUtils.copyProperties(despesasDTO, despesas);
        return ResponseEntity.status(HttpStatus.OK).body(despesasRepository.save(despesas));
    }

    @DeleteMapping("/despesa/{id}")
    public ResponseEntity<Object> deleteDespesa(@PathVariable(value = "id") Long id){
        Optional<Despesas> despesas0 = despesasRepository.findById(id);
        if(despesas0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
        }
        despesasRepository.delete(despesas0.get());
        return ResponseEntity.status(HttpStatus.OK).body("despesa deletada com sucesso!");
    }
}
