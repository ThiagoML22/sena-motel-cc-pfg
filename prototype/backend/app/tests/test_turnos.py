import pytest
from httpx import AsyncClient
from app.models.habitacion import Habitacion
from app.tests.conftest import TestingSessionLocal

@pytest.mark.asyncio
async def test_crear_turno_habitacion_libre(client: AsyncClient):
    # Asegurarnos de que la hab 1 está libre antes de la prueba
    async with TestingSessionLocal() as session:
        hab = await session.get(Habitacion, 1)
        if hab:
            hab.estado = "Libre"
            await session.commit()
            
    response = await client.post(
        "/api/v1/turnos/",
        json={"habitacion_id": 1, "identificador_vehicular": "TEST123"}
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["identificador_vehicular"] == "TEST123"
    assert data["estado"] == "En Curso"
    
    # Liberar la hab para no afectar otros tests (o dejar que la BD de prueba se reinicie)
    async with TestingSessionLocal() as session:
        hab = await session.get(Habitacion, 1)
        if hab:
            hab.estado = "Libre"
            await session.commit()

@pytest.mark.asyncio
async def test_crear_turno_habitacion_ocupada_rn_exi_01(client: AsyncClient):
    # Simular que la habitación 2 está ocupada
    async with TestingSessionLocal() as session:
        hab = await session.get(Habitacion, 2)
        if hab:
            hab.estado = "Ocupada"
            await session.commit()
            
    response = await client.post(
        "/api/v1/turnos/",
        json={"habitacion_id": 2, "identificador_vehicular": "FAIL123"}
    )
    
    assert response.status_code == 409
    assert "RN-EXI-01" in response.json()["detail"]

    # Dejarla limpia
    async with TestingSessionLocal() as session:
        hab = await session.get(Habitacion, 2)
        if hab:
            hab.estado = "Libre"
            await session.commit()
