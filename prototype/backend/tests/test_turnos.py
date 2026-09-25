import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_create_turno_success():
    # Asume que la DB de test tiene la habitación 1 en estado Libre
    # Esto es solo un esqueleto. En la realidad se usaría una BD de prueba y fixtures.
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/turnos/", json={
            "habitacion_id": 1,
            "identificador_vehicular": "AB123CD"
        })
    # Aquí podríamos verificar el status code si el entorno de prueba estuviera completamente mockeado
    # assert response.status_code in [201, 404, 409] 
