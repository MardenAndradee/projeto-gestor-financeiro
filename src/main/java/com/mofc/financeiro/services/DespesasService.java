package com.mofc.financeiro.services;

import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Parcelas;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.ParcelasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import com.mofc.financeiro.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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


    public Despesas findById(Long idDespesa){
        Optional<Despesas> despesas = this.despesasRepository.findById(idDespesa);
        return despesas.orElseThrow(() -> new ObjectNotFoundException(
                "Despesa não encontrada"
        ));
    }


    public List<Despesas> getAllDespesas(String login){
        return despesasRepository.findAllByUsuarioLogin(login);
    }


    @Transactional
    public Despesas update(Despesas despesas){
        Despesas despesa = findById(despesas.getIdDespesa());
        return this.despesasRepository.save(despesas);
    }



    @Transactional
    public void deletarDespesaComParcelas(Long idDespesa) {
        parcelasRepository.deleteByDespesaId(idDespesa);

        despesasRepository.deleteById(idDespesa);
    }


    @Transactional
    public Despesas registrarDespesaComParcelas(Despesas despesa) {

        despesa = despesasRepository.save(despesa);

        Double valorParcela = despesa.getValor() / despesa.getQtdParcelas();

        LocalDate data = despesa.getData();

        List<Parcelas> parcelas = new ArrayList<>();
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