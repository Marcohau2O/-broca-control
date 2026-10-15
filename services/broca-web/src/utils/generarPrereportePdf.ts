
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface DatosPrereportePdf {
    numeroPrereporte: string
    fecha: string
    remision: string
    folioReporteCx: string
    plaza: string
    comentarios: string
    estado: string

    cirugia: {
        id: number
        tipo: string
        fecha: string
        hora: string
        hospital: string
        paciente: string
        afiliacion: string
        cirujano: string
    }

    conceptos: Array<{
        codigo: string
        descripcion: string
        categoria: string
        cantidad: number
        precio: number
    }>

    subtotal: number
    iva: number
    total: number
}

const moneda = (valor: number): string =>
    new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(valor)

const fechaLegible = (fecha: string): string => {
    const partes = fecha.split('-')
    return partes.length === 3
        ? `${partes[2]}/${partes[1]}/${partes[0]}`
        : fecha
}

export function generarPrereportePdf(
    datos: DatosPrereportePdf
): void {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })

    const margen = 14
    const ancho = pdf.internal.pageSize.getWidth()
    const anchoContenido = ancho - margen * 2
    let y = 18

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(17)
    pdf.text('BROCA CONTROL', margen, y)

    pdf.setFontSize(12)
    pdf.text('PRE-REPORTE DE CIRUGÍA', ancho - margen, y, {
        align: 'right',
    })

    y += 5
    pdf.setDrawColor(200, 210, 220)
    pdf.line(margen, y, ancho - margen, y)
    y += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text('DATOS ADMINISTRATIVOS', margen, y)
    y += 7

    const administrativos = [
        ['No. pre-reporte', datos.numeroPrereporte],
        ['Fecha', fechaLegible(datos.fecha)],
        ['Remisión', datos.remision],
        ['Folio reporte Cx', datos.folioReporteCx],
        ['Plaza', datos.plaza],
        ['Estado', datos.estado],
    ]

    autoTable(pdf, {
        startY: y,
        body: administrativos,
        theme: 'plain',
        styles: {
            fontSize: 9,
            cellPadding: 2,
            overflow: 'linebreak',
        },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 43 },
            1: { cellWidth: anchoContenido - 43 },
        },
        margin: { left: margen, right: margen },
    })

    y = (pdf as any).lastAutoTable.finalY + 10

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.text('DATOS DE LA CIRUGÍA', margen, y)
    y += 7

    const cirugia = [
        ['Solicitud', `#${datos.cirugia.id}`],
        ['Procedimiento', datos.cirugia.tipo],
        ['Fecha', fechaLegible(datos.cirugia.fecha)],
        ['Hora', datos.cirugia.hora],
        ['Hospital', datos.cirugia.hospital],
        ['Paciente', datos.cirugia.paciente],
        ['Afiliación', datos.cirugia.afiliacion],
        ['Cirujano', datos.cirugia.cirujano],
    ]

    autoTable(pdf, {
        startY: y,
        body: cirugia,
        theme: 'plain',
        styles: {
            fontSize: 9,
            cellPadding: 2,
            overflow: 'linebreak',
        },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 43 },
            1: { cellWidth: anchoContenido - 43 },
        },
        margin: { left: margen, right: margen },
    })

    y = (pdf as any).lastAutoTable.finalY + 10

    if (y > 250) {
        pdf.addPage()
        y = 20
    }

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.text('CONCEPTOS DEL PRE-REPORTE', margen, y)
    y += 5

    autoTable(pdf, {
        startY: y,
        head: [[
            'Código P',
            'Descripción',
            'Cant.',
            'Precio',
            'Importe',
        ]],
        body: datos.conceptos.map((concepto) => [
            concepto.codigo,
            concepto.descripcion,
            String(concepto.cantidad),
            moneda(concepto.precio),
            moneda(concepto.cantidad * concepto.precio),
        ]),
        theme: 'grid',
        headStyles: {
            fillColor: [30, 64, 120],
            textColor: 255,
            fontStyle: 'bold',
        },
        styles: {
            fontSize: 8,
            cellPadding: 2.5,
            overflow: 'linebreak',
        },
        columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 69 },
            2: { cellWidth: 15, halign: 'center' },
            3: { cellWidth: 35, halign: 'right' },
            4: { cellWidth: 38, halign: 'right' },
        },
        margin: { left: margen, right: margen },
    })

    y = (pdf as any).lastAutoTable.finalY + 8

    if (y > 255) {
        pdf.addPage()
        y = 20
    }

    const xTotales = ancho - margen

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    pdf.text(`Subtotal: ${moneda(datos.subtotal)}`, xTotales, y, {
        align: 'right',
    })

    y += 7

    pdf.text(`IVA (16%): ${moneda(datos.iva)}`, xTotales, y, {
        align: 'right',
    })

    y += 8

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(12)
    pdf.text(`TOTAL GENERAL: ${moneda(datos.total)}`, xTotales, y, {
        align: 'right',
    })

    y += 14

    if (datos.comentarios.trim()) {
        if (y > 250) {
            pdf.addPage()
            y = 20
        }

        pdf.setFontSize(10)
        pdf.text('COMENTARIOS', margen, y)
        y += 7

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)

        const lineas = pdf.splitTextToSize(
            datos.comentarios,
            anchoContenido
        ) as string[]

        for (const linea of lineas) {
            if (y > 275) {
                pdf.addPage()
                y = 20
            }

            pdf.text(linea, margen, y)
            y += 5
        }
    }

    const paginas = pdf.getNumberOfPages()

    for (let pagina = 1; pagina <= paginas; pagina++) {
        pdf.setPage(pagina)
        pdf.setFontSize(8)
        pdf.setTextColor(120)
        pdf.text(
            `BROCA CONTROL | Página ${pagina} de ${paginas}`,
            ancho / 2,
            287,
            { align: 'center' }
        )
    }

    const nombreSeguro = datos.numeroPrereporte
        .replace(/[^a-zA-Z0-9_-]/g, '_')

    pdf.save(`Prereporte_${nombreSeguro || datos.cirugia.id}.pdf`)
}
