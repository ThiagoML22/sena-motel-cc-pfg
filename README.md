# Proyecto de Grado - Sistema SaaS de Gestión para Motel C.C.

**Cátedra:** Proyecto Final de Grado / Actividad de Evaluación 1 (AE1)  
**Institución:** Universidad Cuenca del Plata (UCP) - Sede Posadas, Misiones  
**Autor:** Thiago Leal  
**Organización Cliente:** Motel C.C.  

---

## 📌 Descripción del Proyecto
Este repositorio contiene la documentación formal, relevamiento, especificación técnica y evidencia de campo del proyecto de tesis para el desarrollo de un **Sistema de Procesamiento de Transacciones (TPS)** bajo arquitectura **Software as a Service (SaaS) Multi-inquilino**, diseñado para optimizar la gestión operativa, logística y financiera del establecimiento de alojamiento por turnos **Motel C.C.** en Posadas, Misiones.

---

## 📁 Estructura del Repositorio

```text
.
├── AE1-LEAL.pdf                                # PDF Final consolidado AE1
├── docs/
│   ├── Capitulo_I_Definicion_del_Proyecto.md   # Capítulo I completo
│   ├── Capitulo_II_Relevamiento_e_Investigacion_de_Mercado.md # Capítulo II completo
│   ├── Anexos_y_Bibliografia.md                # Bibliografía, ODS y Anexos I, II, III
│   └── README.md                               # Índice de documentos
├── prototype/
│   ├── prototipo_v0.md                         # Especificación del prototipo v0 y máquina de estados
│   └── README.md                               # Guía del módulo de prototipado
├── portfolio_evidys/
│   ├── relevamiento_campo.md                   # Evidencias de campo, entrevistas y TPA/TDC
│   └── README.md                               # Guía del portfolio de evidencias
├── .gitignore
└── README.md                                   # Documento principal de presentación
```

---

## 📖 Resumen de Contenidos

### [Capítulo I: Definición del Proyecto](docs/Capitulo_I_Definicion_del_Proyecto.md)
- **Origen:** Disfunción operativa estructural por uso de tableros de madera y fichas de papel (10x10 cm).
- **Línea de Base:** Tiempo Promedio de Arqueo (TPA) = 17 min, Tasa de Discrepancia de Caja (TDC) = 10%.
- **Objetivo General:** Implementar el MVP del sistema web reduciendo el TPA a menos de 5 min y la TDC al 0% en 8 semanas.
- **Arquitectura:** SaaS Multi-tenant con Aislamiento por Fila (RLS) y Cierre de Caja Ciego con Bitácora *Append-Only Log*.

### [Capítulo II: Relevamiento e Investigación de Mercado](docs/Capitulo_II_Relevamiento_e_Investigacion_de_Mercado.md)
- **Fuentes & Instrumentos:** Entrevista presencial con la gerencia (C.C.) el 03/09/2026 y observación directa no participante.
- **Análisis Macro & Micro:** Modelos PESTEL, FODA, 5 Fuerzas de Porter, Marco Legal (Ley 25.326) e Infraestructura Cloud (AWS us-east-1).
- **Sector SSI:** Encuadre del sector tecnológico en Posadas (Polo TIC / Silicon Misiones) y salarios CESSI Q3 2026.
- **Conclusiones:** Eliminación de descuadres mediante bitácora inmutable y máquina de estados finita en backend.

### [Prototipo v0 (MVP)](prototype/prototipo_v0.md)
- Panel de conserjería reactivo (13 habitaciones).
- Flujo de transiciones de estado (`Disponible` ➔ `Ocupada` ➔ `En Limpieza`).
- Cierre de caja ciego anti-fraude y registro de contingencias (`TURNO_ANULADO`).

### [Portfolio de Evidencias](portfolio_evidys/relevamiento_campo.md)
- Ficha técnica del trabajo de campo y auditoría documental in situ.
- Declaración expresa de coautoría del Encuadre Común del Sector SSI (Anexo III).

---

## 📄 Documento de Entrega (PDF Final)
El documento formal impreso/digital de la AE1 se encuentra disponible en:  
👉 [`AE1-LEAL.pdf`](AE1-LEAL.pdf)
