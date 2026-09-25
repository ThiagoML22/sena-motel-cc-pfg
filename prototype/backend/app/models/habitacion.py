from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Habitacion(Base):
    __tablename__ = "habitaciones"

    id = Column(Integer, primary_key=True, index=True)
    numero = Column(Integer, unique=True, index=True, nullable=False)
    estado = Column(String(20), nullable=False, default="Libre") # Libre, Ocupada, En Limpieza, Mantenimiento
