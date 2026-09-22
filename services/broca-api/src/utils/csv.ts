function escaparCsv(value: unknown): string {
    if (value === null || value === undefined) {
        return ''
    }

    const texto = value instanceof Date
                    ?value.toISOString()
                    : String(value)
    
    if ( 
        texto.includes(',') ||
        texto.includes('"') ||
        texto.includes('\n') ||
        texto.includes('\r')
    ) {
        return `"${texto.replace(/"/g, '""')}"`
    }

    return texto
}

export function generarCsv(encabezados: string[], filas: unknown[][]): string {
    const lineas = [
        encabezados
        .map(escaparCsv)
        .join(','),

        ...filas.map((fila) =>
        fila.map(escaparCsv).join(',')),
    ]

    return `\uFEFF${lineas.join('\r\n')}`
}