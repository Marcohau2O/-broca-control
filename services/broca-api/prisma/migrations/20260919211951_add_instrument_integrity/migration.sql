ALTER TABLE "Instrumento"
ADD CONSTRAINT "Instrumento_usosMaximos_check"
CHECK ("usosMaximos" > 0);

ALTER TABLE "Instrumento"
ADD CONSTRAINT "Instrumento_usosRealizados_check"
CHECK (
  "usosRealizados" >= 0
  AND "usosRealizados" <= "usosMaximos"
);

ALTER TABLE "UsoInstrumento"
ADD CONSTRAINT "UsoInstrumento_numeroUso_check"
CHECK ("numeroUso" > 0);

ALTER TABLE "UsoInstrumento"
ADD CONSTRAINT "UsoInstrumento_vidas_check"
CHECK (
  "vidasAnteriores" >= 0
  AND "vidasRestantes" >= 0
);