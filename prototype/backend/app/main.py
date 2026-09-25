from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import habitaciones, turnos, articulos

app = FastAPI(title="Motel C.C. API", version="1.0.0")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción restringir a dominio de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(habitaciones.router, prefix="/api/v1/habitaciones", tags=["habitaciones"])
app.include_router(turnos.router, prefix="/api/v1/turnos", tags=["turnos"])
app.include_router(articulos.router, prefix="/api/v1/articulos", tags=["articulos"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
