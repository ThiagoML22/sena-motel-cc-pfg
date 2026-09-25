from pydantic import BaseModel, UUID4
from typing import Optional, List
from datetime import datetime
from app.schemas.articulo import ConsumoResponse

class TurnoBase(BaseModel):
    habitacion_id: int
    identificador_vehicular: str

class TurnoCreate(TurnoBase):
    pass

class TurnoResponse(TurnoBase):
    id: UUID4
    hora_inicio: datetime
    hora_fin: Optional[datetime] = None
    estado: str
    tarifa_base: float
    total_sobreturno: float
    total_consumos: float
    total_general: float

    class Config:
        from_attributes = True

class TurnoResumen(TurnoResponse):
    minutos_transcurridos: int
    consumos: List[ConsumoResponse] = []

class PagoCreate(BaseModel):
    monto: float
    medio_pago: str
    comprobante_referencia: Optional[str] = None
