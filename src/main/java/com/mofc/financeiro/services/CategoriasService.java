package com.mofc.financeiro.services;

import com.mofc.financeiro.dtos.CategoriasDTO;
import com.mofc.financeiro.entities.Categorias;
import com.mofc.financeiro.exceptions.ValidacacaoException;
import com.mofc.financeiro.repositories.CategoriasRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriasService {

    @Autowired
    CategoriasRepository categoriasRepository;

    public Categorias findById(Long id){
        Optional<Categorias> categorias = this.categoriasRepository.findById(id);
        return categorias.orElseThrow(() -> new ValidacacaoException(
                "Categoria não encontrada"
        ));
    }

    public List<Categorias> getAllCategorias(Long idUsuario){
        return categoriasRepository.findByUsuarioIdUsuario(idUsuario);
    }

    @Transactional
    public Categorias create(Categorias categorias){
        categorias = categoriasRepository.save(categorias);
        return categorias;
    }

    @Transactional
    public Categorias update(Categorias categoria){
        Categorias categorias = findById(categoria.getIdCategoria());

        if (categoria.getCategoria()!=null){
            categorias.setCategoria(categoria.getCategoria());
        }

        return this.categoriasRepository.save(categorias);
    }

    @Transactional
    public void delete(Long id){
        findById(id);

        try{
            this.categoriasRepository.deleteById(id);
        }catch (Exception e){
            throw new ValidacacaoException("Esta categoria não existe!");
        }

    }
}
