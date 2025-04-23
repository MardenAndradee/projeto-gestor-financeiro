package com.mofc.financeiro.controllers;

import com.mofc.financeiro.dtos.DespesasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.excel.DespesasExcelExportar;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.DespesasService;
import com.mofc.financeiro.services.UsuariosService;
import com.mofc.financeiro.services.CategoriasService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        return ResponseEntity.status(HttpStatus.OK).body(despesasService.getAllDespesas(login));
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

    @GetMapping("despesa/export/excel")
    public void exportarExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=despesas_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey,headerValue);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        List<Despesas> listDespesas = despesasService.getAllDespesas(login);

        DespesasExcelExportar excelExportar = new DespesasExcelExportar(listDespesas);

        excelExportar.export(response);
    }

}
