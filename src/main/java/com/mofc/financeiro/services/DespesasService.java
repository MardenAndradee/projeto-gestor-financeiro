package com.mofc.financeiro.services;

import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.ParcelasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DespesasService {

    @Autowired
    private DespesasRepository despesasRepository;
    @Autowired
    private CategoriasRepository categoriasRepository;
    @Autowired
    private UsuariosRepository usuariosRepository;
    @Autowired
    private ParcelasRepository parcelasRepository;

    public Despesas registrarDespesaComParcelas(Despesas despesa) {
        despesa = despesasRepository.save(despesa);

        Double valorParcela = despesa.getValor() / despesa.getQtdParcelas();
        List<Parcelas> parcelas = new ArrayList<>();

        LocalDate data = despesa.getData();

        for (int i = 1; i <= despesa.getQtdParcelas(); i++) {
            Parcelas parcela = new Parcelas();
            parcela.setnParcela(i);
            parcela.setValor(valorParcela);
            parcela.setDespesa(despesa);
            parcela.setDataParcela(data);
            parcelas.add(parcela);

            data = data.plusMonths(1);
        }

        parcelasRepository.saveAll(parcelas);

        return despesa;
    }
}



