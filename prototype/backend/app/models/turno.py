import uuid
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone
from app.core.database import Base

class Turno(Base):
    __tablename__ = "turnos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    habitacion_id = Column(Integer, ForeignKey("habitaciones.id"), nullable=False)
    identificador_vehicular = Column(String(50), nullable=False)
    hora_inicio = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    hora_fin = Column(DateTime(timezone=True), nullable=True)
    tarifa_base = Column(Numeric(10, 2), nullable=False, default=12000)
    total_sobreturno = Column(Numeric(10, 2), nullable=False, default=0)
    total_consumos = Column(Numeric(10, 2), nullable=False, default=0)
    total_general = Column(Numeric(10, 2), nullable=False, default=12000)
    estado = Column(String(20), nullable=False, default="En Curso")
