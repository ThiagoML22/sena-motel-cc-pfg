
from app.core.database import get_db
from app.models.articulo import Articulo
from app.schemas.articulo import ArticuloCreate, ArticuloResponse
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

router = APIRouter()

@router.get("/", response_model=list[ArticuloResponse])
async def get_articulos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Articulo).order_by(Articulo.descripcion))
    return result.scalars().all()

@router.post("/", response_model=ArticuloResponse, status_code=status.HTTP_201_CREATED)
async def create_articulo(articulo_in: ArticuloCreate, db: AsyncSession = Depends(get_db)):
    # Check if codigo already exists
    query = await db.execute(select(Articulo).where(Articulo.codigo == articulo_in.codigo))
    if query.scalars().first():
        raise HTTPException(status_code=400, detail="El código de artículo ya existe.")
        
    nuevo_articulo = Articulo(**articulo_in.model_dump())
    db.add(nuevo_articulo)
    await db.commit()
    await db.refresh(nuevo_articulo)
    return nuevo_articulo
