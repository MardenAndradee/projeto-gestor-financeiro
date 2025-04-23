package com.mofc.financeiro.excel;

import com.mofc.financeiro.entities.Despesas;
import jakarta.servlet.Servlet;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;

import static org.apache.poi.ss.util.CellUtil.createCell;

public class DespesasExcelExportar {

    private XSSFWorkbook workbook;  //Representa o arquivo excel .xlsx
    private XSSFSheet sheet; //Representa uma aba, no caso uma planilha dentro do workbook
    private List<Despesas> listarDespesas; // E aqui no caso, contem todos os dados das despesas

    public DespesasExcelExportar(List<Despesas> listarDespesas) {
        this.listarDespesas = listarDespesas;
        workbook = new XSSFWorkbook();
    }

    private void titulosDasColunas() {
        sheet = workbook.createSheet("Despesas");   // Essa função no caso, ela vai ser o titulo das colunas,
        //ou seja a descrição do que cada coluna significa, e ela
        // irá vir em negrito
        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Descrição", style);
        createCell(row, 1, "Valor", style);
        createCell(row,2,"Categoria",style);
        createCell(row,3,"Data",style);
        createCell(row,4,"FormaPagamto",style);
    }


    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);

        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Double) {
            cell.setCellValue((Double) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if (value != null) {
            cell.setCellValue(value.toString());
        } else {
            cell.setCellValue("");
        }

        cell.setCellStyle(style);
    }


    private void descricaoDasColunas() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (Despesas despesas : listarDespesas) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++,despesas.getDescricao(), style);
            createCell(row, columnCount++,despesas.getValor(), style);
            createCell(row,columnCount++,despesas.getCategoria().getCategoria(),style);
            createCell(row,columnCount++,despesas.getData(),style);
            createCell(row,columnCount++,despesas.getFormaPagamento(),style);
        }
    }


    public void export(HttpServletResponse response) throws IOException {
        titulosDasColunas();
        descricaoDasColunas();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();
    }
}

