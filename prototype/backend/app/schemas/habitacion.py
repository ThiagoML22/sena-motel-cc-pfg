
from pydantic import BaseModel


class HabitacionBase(BaseModel):
    numero: int
    estado: str

class HabitacionCreate(HabitacionBase):
    pass

from app.schemas.turno import TurnoResponse


class HabitacionResponse(HabitacionBase):
    id: int
    turno_activo: TurnoResponse | None = None

    class Config:
        from_attributes = True
