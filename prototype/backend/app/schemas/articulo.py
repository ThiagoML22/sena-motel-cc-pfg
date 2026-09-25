from pydantic import BaseModel
from typing import Optional

class ArticuloBase(BaseModel):
    codigo: str
    descripcion: str
    precio_unitario: float
    stock_actual: int
    categoria: Optional[str] = None

class ArticuloCreate(ArticuloBase):
    pass

class ArticuloResponse(ArticuloBase):
    id: int

    class Config:
        from_attributes = True

class ConsumoCreate(BaseModel):
    articulo_id: int
    cantidad: int

class ConsumoResponse(BaseModel):
    id: str
    articulo_id: int
    cantidad: int
    precio_unitario: float
    subtotal: float
    
    class Config:
        from_attributes = True
