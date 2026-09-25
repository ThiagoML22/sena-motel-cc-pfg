# Prototipo v1 (Walking Skeleton) - Motel C.C.

Este entorno de código ejecutable corresponde a la entrega formal de la **AE2**. Constituye un prototipo funcional de extremo a extremo (Frontend, Backend y Base de Datos) orquestado mediante Docker Compose, incluyendo persistencia real y validaciones de reglas de negocio en API y base de datos (PostgreSQL).

## Prerrequisitos
- **Docker Engine** 24+
- **Docker Compose** v2

## Instrucciones de Despliegue en Máquina Limpia

### Paso 1: Clonar y posicionarse
Abre tu terminal, clona el repositorio (o extrae el código fuente) y sitúate en la carpeta del prototipo:
```bash
cd prototype
```

### Paso 2: Copiar variables de entorno
Crea el archivo local de variables a partir de la plantilla:
```bash
cp .env.example .env
```

### Paso 3: Construcción y arranque
Levanta los tres contenedores en segundo plano (`backend`, `frontend` y `db`):
```bash
docker-compose up --build -d
```
*(La primera vez puede demorar unos minutos mientras descarga las imágenes de Node, Python y PostgreSQL, e instala las dependencias).*

### Paso 4: Comprobación de salud
Una vez que el terminal te confirme que los contenedores están `Started`, verifica el acceso:
- **Backend API (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Frontend UI (React Dashboard):** [http://localhost:5173](http://localhost:5173)
- **Ejecución de Pruebas Unitarias en el contenedor:**
  ```bash
  docker-compose exec backend pytest
  ```
  *(Asegura que todos los tests pasen, validando restricciones como la RN-EXI-01).*

### Paso 5: Apagado seguro
Para detener la aplicación y limpiar los volúmenes efímeros, ejecuta:
```bash
docker-compose down -v
```

---
*Este prototipo incluye Integración Continua validada mediante GitHub Actions.*
