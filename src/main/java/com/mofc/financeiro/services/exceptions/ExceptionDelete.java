package com.mofc.financeiro.services.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.xml.crypto.Data;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ExceptionDelete extends DataIntegrityViolationException {
    public ExceptionDelete(String message){
        super(message);
    }

}
