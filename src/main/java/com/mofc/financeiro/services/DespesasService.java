package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.DespesasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.entities.Despesas;
import com.mofc.financeiro.entities.Usuarios;
import com.mofc.financeiro.repositories.CategoriasRepository;
import com.mofc.financeiro.repositories.DespesasRepository;
import com.mofc.financeiro.repositories.UsuariosRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class DespesasService {

    @Autowired
    private DespesasRepository despesasRepository;
    @Autowired
    private CategoriasRepository categoriasRepository;
    @Autowired
    private UsuariosRepository usuariosRepository;

    private Long gerarIdentificador() {
        Long identificador = despesasRepository.count() + 1;
        return identificador;
    }

    @Transactional
    public void salvarDespesa(DespesasDTO despesasDTO) {
        var despesas = new Despesas();
        BeanUtils.copyProperties(despesasDTO, despesas);

            Usuarios usuario = usuariosRepository.findById(despesasDTO.getUsuario().getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            Categorias categoria = categoriasRepository.findById(despesasDTO.getCategoria().getIdCategoria())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

            double valor = despesas.getValor();
            int qtdParcelas = despesasDTO.qtdParcelas();
            LocalDate data = despesas.getData();

            if (despesas.getFormaPagamento().equalsIgnoreCase("credito")) {
                valor = valor / qtdParcelas;
            }

            int nparcela = 1;
            for (int i = 1; i <= qtdParcelas; i++) {
                Despesas despesa = new Despesas(despesas.getDescricao(), valor, categoria, despesas.getFormaPagamento(),
                        qtdParcelas, nparcela, despesas.getIdentificador(), usuario, data);

                despesasRepository.save(despesa);

                nparcela++;
                data = data.plusMonths(1);
            }
    }
}
