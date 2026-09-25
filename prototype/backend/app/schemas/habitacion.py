from pydantic import BaseModel
from typing import Optional

class HabitacionBase(BaseModel):
    numero: int
    estado: str

class HabitacionCreate(HabitacionBase):
    pass

from app.schemas.turno import TurnoResponse

class HabitacionResponse(HabitacionBase):
    id: int
    turno_activo: Optional[TurnoResponse] = None

    class Config:
        from_attributes = True
