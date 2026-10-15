// Catálogo extraído de RENTAS Y SERVICIOS.xlsx.
// Descripciones conservadas como aparecen en el archivo (sin espacios exteriores).
// Los precios se capturan en el pre-reporte, no aquí.
export type CategoriaConcepto = 'RENTA' | 'SERVICIO'

export interface ConceptoCatalogo {
  codigo: string
  descripcion: string
  categoria: CategoriaConcepto
}

export const conceptosCatalogo: ConceptoCatalogo[] = [
  {
    "codigo": "ORT-0001",
    "descripcion": "SET ABORDAJE DE MANO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0002",
    "descripcion": "SET DE ABORDAJE DE PIE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0003",
    "descripcion": "SET DE ABORDAJE DE GRANDES FRAGMENTOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0004",
    "descripcion": "SET DE ABORDAJE DE COLUMNA LUMBAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0005",
    "descripcion": "SET DE ABORDAJE DE LAMINECTOMIA TORACOLUMBAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0006",
    "descripcion": "SET DE LAMINECTOMIA MÍNIMAMENTE INVASIVA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0007",
    "descripcion": "EQUIPO DE PODER PERFORADOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0008",
    "descripcion": "EQUIPO DE SIERRA OSCILANTE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0009",
    "descripcion": "SET DE ARTROSCOPIA HD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0010",
    "descripcion": "GRÚA DE TRACCIÓN PARA HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0011",
    "descripcion": "POSICIONADOR SPIDER",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0012",
    "descripcion": "PROTECTOR FACIAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0013",
    "descripcion": "POSICIONADOR DE HOMBRO LATERAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0014",
    "descripcion": "POSICIONADOR DE RODILLA EN BOTA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0015",
    "descripcion": "POSICIONADOR DE TOBILLO CON CORREA DISTRACTORA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0016",
    "descripcion": "POSICIONADOR DE MUÑECA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0017",
    "descripcion": "SET DE ARTROSCOPIA DE RODILLA HD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0018",
    "descripcion": "SET DE ARTROSCOPIA DE CADERA HD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0019",
    "descripcion": "SET DE ARTROSCOPIA DE MUÑECA HD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0020",
    "descripcion": "SET DE ARTROSCOPIA DE TOBILLO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0021",
    "descripcion": "CONSOLA DE FRESADO PARA MICROCIRUGIA DE ALTA VELOCIDAD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0022",
    "descripcion": "ADAPTADOR PARA CRANEOTOMÍA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0023",
    "descripcion": "POSICIONADOR DE RODILLA SPIDER",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0024",
    "descripcion": "POSICIONADOR DE CADERA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0025",
    "descripcion": "POSICIONADOR DE HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0026",
    "descripcion": "POSICIONADOR DE CODO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0027",
    "descripcion": "LUPAS DE MICROVISUALIZACION CARL ZEISS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0028",
    "descripcion": "RODETES DE GEL PARA SOPORTE LUMBAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0029",
    "descripcion": "SET RECTRACTOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0030",
    "descripcion": "BOMBA DE ARTROSCOPIA INTEGRADA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0031",
    "descripcion": "SISTEMA DE VISIÓN DE ARTROSCOPIA DE ALTA DEFINICIÓN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0032",
    "descripcion": "CÁMARA MÉDICA DE ALTA DEFINICIÓN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0033",
    "descripcion": "GRABADOR DE IMÁGENES MÉDICAS DE ALTA DEFINICIÓN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0034",
    "descripcion": "FUENTE DE LUZ LED DE GAMA ALTA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0035",
    "descripcion": "SET DE PINZAS DE ARTROSCOPIA PARA PEQUEÑAS ARTICULACIONES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0036",
    "descripcion": "SET  DE PINZAS DE ARTROSCOPIA PARA HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0037",
    "descripcion": "SET  DE PINZAS DE ARTROSCOPIA PARA RODILLA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0038",
    "descripcion": "SET DE TALADRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0039",
    "descripcion": "PERFORADOR CON SISTEMA DE RIMADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0040",
    "descripcion": "SISTEMA DE RETRACTOR CERVICAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0041",
    "descripcion": "SISTEMA RETRACTOR CERVICAL CON ENTRADA PARA FUENTE DE LUZ",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0042",
    "descripcion": "NEURO LOCALIZADOR DE NERVIOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0043",
    "descripcion": "SET DE PREPARACIÓN DE ARTRODESIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0044",
    "descripcion": "TALADRO MICROQUIRUGICO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0045",
    "descripcion": "SIERRA MICROQUIRURGICA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0046",
    "descripcion": "SET DE EXTRACCION UNIVERSAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0047",
    "descripcion": "SET DE EXTRACCION DE PLACAS Y TORNILLOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0048",
    "descripcion": "PRENSA DOBLADORA DE BARRAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0049",
    "descripcion": "SET DE MICROCIRUGIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0050",
    "descripcion": "SET DE MENISCECTOMÍA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0051",
    "descripcion": "SENTIO MMG",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0052",
    "descripcion": "SET DE MICROLAMINECTOMIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0053",
    "descripcion": "SET DE BIPOLAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0054",
    "descripcion": "ACCESORIO PARA CORTADOR DE METAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0055",
    "descripcion": "T4 ASEPCTICAL FLYTE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0056",
    "descripcion": "SISTEMA DE PROTECCIÓN PERSONAL T4",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0057",
    "descripcion": "HEAD FLYTE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0058",
    "descripcion": "PROTECTOR VISUAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0059",
    "descripcion": "LENTES PLOMADOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0060",
    "descripcion": "CHALECO LIGERO PLOMADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0061",
    "descripcion": "COLLARIN PLOMADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0062",
    "descripcion": "SISTEMA DE TORNIQUETE AUTOMÁTICO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0063",
    "descripcion": "SISTEMA DE NEUROMONITOREO INNOMED",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0064",
    "descripcion": "FRESA MICROQUIRURGICA AESCULAP",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0065",
    "descripcion": "SISTEMA DE RETRACTOR TUBULAR MIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0066",
    "descripcion": "SISTEMA DE RETRACTOR TUBULAR CERVICAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0067",
    "descripcion": "SISTEMA DE RETRACTOR ABIERTO VERSATRAK LUMBAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0068",
    "descripcion": "SISTEMA DE RETRACTOR LATERAL ANTERIOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0069",
    "descripcion": "LENTE 2.7 PEQUEÑAS ARTICULACIONES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0070",
    "descripcion": "RETRACTOR CERVICAL MEDFIX VISION",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0071",
    "descripcion": "MINI BIPOLAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0072",
    "descripcion": "SET DE ABORDAJE DE REEMPLAZO DE CADERA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0073",
    "descripcion": "SENTIO MMG KIT DE SENSOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0074",
    "descripcion": "SENTIO MMG KIT STIM",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0075",
    "descripcion": "SET DE RIMAS FLEXIBLES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0076",
    "descripcion": "EQUIPO DE ABORDAJE PERCUTANEO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0077",
    "descripcion": "POSICIONADOR DE TOBILLO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0078",
    "descripcion": "ESTABILIZADOR DE TOBILLO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0079",
    "descripcion": "SET DE REDUCCION COSTAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0080",
    "descripcion": "SISTEMA DE INSTRUMENTOS DE RIP COSTAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0081",
    "descripcion": "SISTEMA DE INSTRUMENTOS DE MANO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0082",
    "descripcion": "SISTEMA DE INSTRUMENTOS DE CODO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0083",
    "descripcion": "RENTA DE MANGA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0084",
    "descripcion": "CORTADORA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0085",
    "descripcion": "SET DE INSTRUMENTOS DE MICROCIRUGIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0086",
    "descripcion": "PINZA SCORPION",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0087",
    "descripcion": "CORTADOR ULTRASONICO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0088",
    "descripcion": "CONSOLA DE RIZOLISIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0089",
    "descripcion": "Set Universal de extraccion de clavos",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0090",
    "descripcion": "MICROFRACTURADORES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0091",
    "descripcion": "SISTEMA DE REPARACION DE TUNEL DEL CARPO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0092",
    "descripcion": "SISTEMA DE LIBERACION DEL TUNEL DEL CARPO ENDOSCOPICA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0093",
    "descripcion": "SISTEMA DE CUCHARILLAS EN BAYONETA PARA COLUMNA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0094",
    "descripcion": "SISTEMA DE NEUROMONITOREO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0095",
    "descripcion": "SISTEMA DE ROTACIÓN VERTEBRAL DIRECTA PARA DEFORMIDADES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0096",
    "descripcion": "CONSOLA MECTRON",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0097",
    "descripcion": "SISTEMA DE EVACUACIÓN DE DISCO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0098",
    "descripcion": "RIZOLISIS NEURAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0099",
    "descripcion": "SISTEMA INSTRUMENTAL LATERAL ANTERIOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0100",
    "descripcion": "PINZA DE CORTE Y DOBLADOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0101",
    "descripcion": "POSICIONADOR DE 3 PUNTOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0102",
    "descripcion": "PROTECTOR DE MENISCOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0103",
    "descripcion": "SET DE ABORDAJE DE ORTOPEDIA FINA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0104",
    "descripcion": "MICROFRACTURADOR CODRAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0105",
    "descripcion": "SILLA DE PLAYA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0106",
    "descripcion": "INSTRUMENTAL LPS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0107",
    "descripcion": "POSICIONADOR DE MANO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0108",
    "descripcion": "INSTRUMENTACION DE ESCOLIOSIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0109",
    "descripcion": "MIS BAYONET JUEGO DE DISECCIÓN DE NERVIOS Y PEGADORES CERÁMICOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0110",
    "descripcion": "WOODSON AND MISS BAUNET CURETTE SET",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0111",
    "descripcion": "DERMATOMO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0112",
    "descripcion": "SET DE OMEGA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0113",
    "descripcion": "JUEGO DE DISECTOR CERVICAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0114",
    "descripcion": "EQUIPO DE NUCLEOPLASTIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0115",
    "descripcion": "LENTE 1.9MM PARA PEQUEÑAS ARTICULACIONES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0116",
    "descripcion": "JUEGO DE INSTRUMENTOS PARA ARTROSCOPIA DE RODILLA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0117",
    "descripcion": "JUEGO DE INSTRUMENTOS PARA ARTROSCOPIA DE HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0118",
    "descripcion": "LENTE PARA ARTROSCOPIA DE 70 ° 4MM CON MANGA Y PUNZON",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0119",
    "descripcion": "APOYO PARA MENISCOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0120",
    "descripcion": "PINZA PARA NUCLEOPLASTIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0121",
    "descripcion": "SISTEMA DE ACCESO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0122",
    "descripcion": "MICRO MOTOR PARA FRESADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0123",
    "descripcion": "EQUIPO GENERADOR DE PLASMA (CONSOLA BONSS)",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0124",
    "descripcion": "EQUIPO E INSTRUMENTAL XL PARA DISECTOMIA LUMBAR ANTERIOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0125",
    "descripcion": "JUEGO DE DESTORNILLADORES MICRO UNIVERSAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0126",
    "descripcion": "SET DE PRE Y OSTEOTOMÍA DE FUSIÓN DE TOBILLO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0127",
    "descripcion": "MATERIAL DE OSTEOSINTESIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0128",
    "descripcion": "PREPARACIÓN PARA LA FUSIÓN DEL PIE Y OSTEOTOMÍA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0129",
    "descripcion": "RENTA DE CLANCY",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0130",
    "descripcion": "SET DE OSTEOTOMOS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0131",
    "descripcion": "SET DE SEPARACIÓN AUTOMÁTICA DE CADERA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0132",
    "descripcion": "ASPIRADOR ULTRASONICO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0133",
    "descripcion": "SET DE BROCAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0134",
    "descripcion": "PIEZA DE MANO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0135",
    "descripcion": "SET DE LEGRAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0136",
    "descripcion": "PINZAS PARA ARTROSCOPIA RODILLA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0137",
    "descripcion": "KIT CABLES PARA RADIOFRECUENCIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0138",
    "descripcion": "CONSOLA DE VAPOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0139",
    "descripcion": "HOLD LEG",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0140",
    "descripcion": "ON FOCUS SISTEM",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0141",
    "descripcion": "MESA ALLEN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0142",
    "descripcion": "INSTRUMENTAL DE HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0143",
    "descripcion": "FLEX MATE SYSTEM",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0144",
    "descripcion": "CORTADORA DE CLAVOS (BAILARINA)",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0145",
    "descripcion": "RENTA DE LAMPARAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0146",
    "descripcion": "ULTRASONIDO GUIDED PLEX",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0147",
    "descripcion": "INSTRUMENTAL DE LCA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0148",
    "descripcion": "RENTA DE CERCLAJE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0149",
    "descripcion": "SISTEMA DE REDUCCION CON PISTOLA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0150",
    "descripcion": "FINE BEAK FORCEPS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0151",
    "descripcion": "FORCIPRESION FORCEPS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0152",
    "descripcion": "HUN HEIGH DOPPLER MDZ",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0153",
    "descripcion": "SPECTRUM SYSTEM SET",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0154",
    "descripcion": "ARRENDAMIENTO POR EVENTO PARA CIRUGÍA DE MÍNIMA INVASIÓN DE COLUMNA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0155",
    "descripcion": "SISTEMA QUANTUM",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0156",
    "descripcion": "EQUIPO DE APOYO PARA PROTESIS DE HOMBRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0157",
    "descripcion": "EQUIPO DE APOYO Y ABORDAJE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0158",
    "descripcion": "DISTRACTOR DE CUERPO VERTEBRAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0159",
    "descripcion": "RENASYS EZ EQUIPO DE TERAPIA NEGATIVA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0160",
    "descripcion": "Torre Endoscópica Columna",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0161",
    "descripcion": "FIBRA OPTICA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0162",
    "descripcion": "Hand and Foot Surgery Special Surgical Instrument Set",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0163",
    "descripcion": "SISTEMA CENTRIC",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0164",
    "descripcion": "EQUIPO DE RESERCCION Y DEBRIDACION ENDOSCOPICA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0165",
    "descripcion": "CONSOLA ELLMAN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0166",
    "descripcion": "CONSOLA DE ELECTROCAUTERIO (APOLLO)",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0167",
    "descripcion": "OPTURADOR 8.5",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0168",
    "descripcion": "EQUIPO PARA VISION ENDOSCOPICA DE COLUMNA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0169",
    "descripcion": "RENTA DE EQUIPO CORE POR EVENTO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0170",
    "descripcion": "EEG PS MONITOR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0171",
    "descripcion": "RADICAL 7 CO-OXIMETER",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0172",
    "descripcion": "MOVILIZADOR PASIVO DE RODILLA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0173",
    "descripcion": "LUZ ANGULADA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0174",
    "descripcion": "SISTEMA DE REDUCCION DE PELVIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0175",
    "descripcion": "INSTRUMENTAL DE ABORDAJE DE OTORRINO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0176",
    "descripcion": "RENTA DE PODER AUXEIN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0177",
    "descripcion": "INSTRUMENTAL ACCUFEX",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0178",
    "descripcion": "INSTRUMENTAL 15PZS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0179",
    "descripcion": "INSTRUMENTAL 5PZAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0180",
    "descripcion": "EQUIPO DE VIDEOLARONGO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0181",
    "descripcion": "MALLADOR DE INJERTOS DE PIEL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0182",
    "descripcion": "IBIFIXCAN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0183",
    "descripcion": "INSTRUMENTAL MIS KIT",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0184",
    "descripcion": "MARCO CHARLY",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0185",
    "descripcion": "Mis Pinzas de Laparoscopia  Croce- olmi",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0186",
    "descripcion": "EQUIPO SURGIMAX ELLIQUENCE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0187",
    "descripcion": "SET POSEIDON",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0188",
    "descripcion": "SISTEMA DE TERMOCOAGULACION INTRADISC ELEC DUAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0189",
    "descripcion": "USB",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0190",
    "descripcion": "EQUIPO DE PREPARACION GRAFT PRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0191",
    "descripcion": "SET MOLDEADOR CON RIMADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0192",
    "descripcion": "NITROGENO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0193",
    "descripcion": "SET DE EXTRACCION DE COLUMNA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0194",
    "descripcion": "CS Spine Frame",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0195",
    "descripcion": "RENTA DE SISTEMA DE  APOYO PARA EXTRACCIÓN DE TORNILLOS CANULADOS 6.5",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0196",
    "descripcion": "Sistema Sinergy",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0197",
    "descripcion": "Dilatadores XL Arthrex Set",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0198",
    "descripcion": "Protesis de Uña",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0199",
    "descripcion": "MASSIMO ROOT PLATFORM WITH RS02 AND O3 MODULE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0200",
    "descripcion": "MINI SCORPION SIRRA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0201",
    "descripcion": "ABORDAJE CERVICAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0202",
    "descripcion": "EQUIPO TRANSBUCAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0203",
    "descripcion": "Bomba de Perfusión TSI mindrive",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0204",
    "descripcion": "lentes de exoscopio",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0205",
    "descripcion": "RENTA SET INSTRUMENTAL PARA ESTENOSIS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0206",
    "descripcion": "DISCOSCOPIO 20 GRADOS 9.3MM",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0207",
    "descripcion": "Renta de Brazo Sujecion Automatico para lente Endoscopico de Columna",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0208",
    "descripcion": "SEQUEN MENISCAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0209",
    "descripcion": "MASIMO ROOT PLATFORM WITH SEDLINE MODULE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0210",
    "descripcion": "MASIMO ROOT PLATFORM WITH RADICAL 7 MODULE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0211",
    "descripcion": "SET DE INSTRUMENTAL DE ROTHON",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0212",
    "descripcion": "CABEZAL DE MAYFIELD",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0213",
    "descripcion": "SISTEMA DE CRIOABLACION CON SONDA LUMBO SACRO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0214",
    "descripcion": "INSTRUMENTAL PINPOINT",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0215",
    "descripcion": "SET DE TRASPLANTE OSTEOCONDRAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0216",
    "descripcion": "LENTE DE 30°",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0217",
    "descripcion": "MESA TRASLUCIDA DE MANO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0218",
    "descripcion": "SET DE RETIRO PARA CLAVO TELESCOPICO EQUIPO ESPECIAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0219",
    "descripcion": "CORTADOR ULTRASONICO SONOPET",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0220",
    "descripcion": "CAPELLO PATIENT POSITIONER",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0221",
    "descripcion": "NEURONAVEGADOR FRAGON",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0222",
    "descripcion": "ASPIRADOR DE TUMORES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0223",
    "descripcion": "RENTA DE MONITOR CAMINO  PRESPON INTRACRANEAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0224",
    "descripcion": "ACCESORIO TREPANACION",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0225",
    "descripcion": "SISTEMA LATARJET",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0226",
    "descripcion": "INSTRUMENTAL DE REDUCCION DE ACROMIO CLAVICULAR",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0227",
    "descripcion": "RENTA DE INSTRUMENTAL BICALY MAXILOFACIAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0228",
    "descripcion": "INSTRUMENTAL DE INTERNAL BRACE",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0229",
    "descripcion": "RENOVATION INSTRUMENT CEMENT SET",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0230",
    "descripcion": "SET DE COLOCACION",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0231",
    "descripcion": "RENTA PRUEBAS FEMORALES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0232",
    "descripcion": "RENTA PRUEBAS TIBIALES",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0233",
    "descripcion": "SET DE APOYO DE ARTROPLASTIA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0234",
    "descripcion": "GUIA TIBIAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0235",
    "descripcion": "RENTA DE INSTRUMENTAL FACIAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0236",
    "descripcion": "RENTA DE INSTRUMENTAL BUCAL",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0237",
    "descripcion": "SET DE REPARACION DE MENISCO AUXEIN",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0238",
    "descripcion": "NAVEGADOR CEREBRAL NEUROENDOSCOPICO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0239",
    "descripcion": "RENTA DE INSTRUMENTAL PARA SINDESMOSIS DE TOBILLO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0240",
    "descripcion": "RENTA DE DESARMADOR CANULADO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0241",
    "descripcion": "RENTA DE MESA DE TRACCION",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0242",
    "descripcion": "ARTROSCOPIA DE HOMBRO CON SILLA DE PLAYA",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0243",
    "descripcion": "RENTA PICAS PARA OIDO",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORT-0244",
    "descripcion": "RENTA SET DE PICAS",
    "categoria": "RENTA"
  },
  {
    "codigo": "ORTS-0001",
    "descripcion": "SERVICIO INTEGRAL DE ARTROSCOPIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0002",
    "descripcion": "SERVICIO INTERGRAL PEDIATRICO",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0003",
    "descripcion": "SERVICIO INTEGRAL DE INSTRUMENTACIÓN LUMBAR",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0004",
    "descripcion": "SERVICIO INTEGRAL DE EXTRACCION DE CLAVO DE TIBIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0005",
    "descripcion": "SERVICIO INTEGRAL DE INSTRUMENTACION TORACICA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0006",
    "descripcion": "SERVICIO INTEGRAL DE REDUCCION CON CLAVOS KIRSCHNER",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0007",
    "descripcion": "SERVICIO INTEGRAL DE PROTESIS DE CADERA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0008",
    "descripcion": "SERVICIO KIDDE",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0009",
    "descripcion": "SERVICIO INTEGRAL DE CERCLAJE",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0010",
    "descripcion": "SERVICIO INTEGRAL DE RADIOFRECUENCIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0011",
    "descripcion": "SERVICIO INTEGRAL DE CRANEOTOMIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0012",
    "descripcion": "SERVICIO INTEGRAL DE PLACA PEDIATRICA Y TORNILLOS",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0013",
    "descripcion": "SERVICIO INTEGRAL DE CIFOPLASTIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0014",
    "descripcion": "SERVICIO INTEGRAL DE OSTEOSINTESIS DE TOBILLO",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0015",
    "descripcion": "SERVICIO INTEGRAL DE ARTROPLASTIA DE CADERA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0016",
    "descripcion": "SERVICIO INTEGRAL DE RETIRO DE MATERIAL",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0017",
    "descripcion": "SERVICIO INTEGRAL DE ARTRODESIS CERVICAL ANTERIOR",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0018",
    "descripcion": "SERVICIO INTEGRAL DE TOMA DE BIOPSIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0019",
    "descripcion": "SERVICIO INTEGRAL DE OSTEOSINTESIS",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0020",
    "descripcion": "SERVICIO INTEGRAL DE PROTESIS DE  RODILLA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0021",
    "descripcion": "SERVICIO INTEGRAL DE RIZOLISIS",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0022",
    "descripcion": "SERVICIO INTEGRAL DE LUPAS",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0023",
    "descripcion": "SERVICIO DE MONITOREO SEDLINE DE ANESTESIA CON SENSORES DE HEMOGLOBINA Y ACTIVIDAD CEREBRAL",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0024",
    "descripcion": "RETIRO DE PROTESIS DE HOMBRO",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0025",
    "descripcion": "SERVICIO INTEGRAL DE CLAVOS TEEN",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0026",
    "descripcion": "SERVICIO  INTEGRAL DE FIJACION EXTERNA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0027",
    "descripcion": "SERVICIO INTEGRAL DE NEUROMONITOREO",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0028",
    "descripcion": "SERVICIO INTEGRAL DE ENDOSCOPIA DE COLUMNA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0029",
    "descripcion": "SERVICIO INTEGRAL DE DISECTOMIA CERVICAL",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0030",
    "descripcion": "SERVICIO INTEGRAL DE LIGAMENTO",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0031",
    "descripcion": "SERVICIO INTEGRAL DE VERTEBROPLASTIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0032",
    "descripcion": "SERVICIO DE ENDOSCOPIA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0033",
    "descripcion": "SERVICIO INTEGRAL DE RENTAS",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0034",
    "descripcion": "DEBRIDACION DE HERIDA",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0035",
    "descripcion": "DISECTOMIA LUMBAR",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0036",
    "descripcion": "Reduccion abierta y fijacion interna con mini placa para falange",
    "categoria": "SERVICIO"
  },
  {
    "codigo": "ORTS-0037",
    "descripcion": "REDUCCIÓN ABIERTA Y FIJACIÓN CON PLACA TERCIO DE CAÑA BLOQUEADA",
    "categoria": "SERVICIO"
  }
]
