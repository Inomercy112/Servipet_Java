package com.servipet.backend.Mascota.Reporte;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.servipet.backend.Cita.DTO.CitaDTO;
import com.servipet.backend.Cita.Servicio.ServicioCita;

import org.springframework.stereotype.Service;

import com.itextpdf.layout.Document;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReporteCitaMascota {
    private final ServicioCita servicioCita;

    public ReporteCitaMascota( ServicioCita servicioCita) {

        this.servicioCita = servicioCita;
    }

    public byte[] generarReporteMascota(String id) {
        List<CitaDTO> citaDtOList = servicioCita.CitasMascota(id);
        if (citaDtOList.isEmpty()) {
            throw new RuntimeException("No se puede generar el mascota, no se encontro mascota");
        }
        String nombreMascota = citaDtOList.get(0).getMascotaAsisteDto().getNombreMascotaDto();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            document.add(new Paragraph("Reporte de citas de " + nombreMascota  ).setFontSize(12).setMargin(10));
            float[] columnWidths = {50,150,150,100,150};
            Table table = new Table(columnWidths);
            table.addHeaderCell("Cita-No");
            table.addHeaderCell("Razon");
            table.addHeaderCell("Diagnostico");
            table.addHeaderCell("Fecha Cita");
            table.addHeaderCell("Veterinaria");
            for (CitaDTO cita : citaDtOList) {
                table.addCell(String.valueOf(cita.getIdDto()));
                table.addCell(String.valueOf(cita.getRazonDto()));
                table.addCell(String.valueOf(cita.getDiagnosticoDto()));
                table.addCell(String.valueOf(cita.getFechaCitaDto()));
                table.addCell(String.valueOf(cita.getQuienAtiendeDto()));
            }
            document.add(table);
            document.close();
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
        return out.toByteArray();
    }

}
