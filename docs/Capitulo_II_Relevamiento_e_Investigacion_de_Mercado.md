# Capítulo II: Relevamiento e Investigación de Mercado

## II.1. Fuentes de datos utilizadas
El relevamiento se sustenta en fuentes primarias internas de la organización y fuentes secundarias del sector servicios:

- **Fuentes primarias:** C.C., Gerente Propietario del Motel C.C. Canal de contacto: entrevista presencial en las instalaciones del establecimiento. Fecha: 3 de septiembre de 2026. Motivo declarado: relevamiento de procesos de conserjería y medición de línea de base operativa. Se auditaron además registros documentales internos (fichas de papel de 10x10 cm y planillas impresas de control de stock).
- **Fuentes secundarias:** Instituto Provincial de Estadística y Censos de Misiones (IPEC). Método y universo: Informe de coyuntura del sector servicios y alojamiento, relevamiento censal provincial. Período de referencia: Primer cuatrimestre de 2026. Esta fuente se emplea para dimensionar el volumen de rotación del sector de alojamiento transitorio en la región.

---

## II.2. Instrumentos, dinámicas aplicadas y alcance
Para la captura de datos de campo se aplicaron dos instrumentos:

1. **Entrevista semiestructurada:** Dirigida a la gerencia (C.C.) el día 03/09/2026, orientada a identificar el modelo de negocio, las tasas de descuadre financiero y la estructura de guardias.
2. **Observación directa no participante:** Aplicada sobre el proceso de transición de guardia (arqueo de caja) en la conserjería, documentando los tiempos de ejecución de las tareas manuales de suma y consolidación de fichas.

**Alcance y límites:** El relevamiento cubrió a la gerencia y a la conserjería operativa (responsables de la caja). Quedó expresamente excluido el personal de maestranza y limpieza; motivo de exclusión: su rol dentro de la organización es pasivo respecto a la manipulación del sistema de cobro, limitándose a recibir órdenes de liberación de habitación dictadas por la conserjería, por lo que no influyen en la consolidación del flujo de caja ni en la lógica transaccional.

---

## II.3. Presentación de los datos recabados
La operatoria del establecimiento se divide en tres turnos de guardia diarios (Mañana, Tarde y Noche). La infraestructura consta de 13 habitaciones. La demanda revela un volumen de ocupación asimétrico: entre 20 y 30 turnos diarios durante los días hábiles (lunes a jueves), y un incremento hacia 40 a 50 turnos diarios durante los fines de semana (viernes a domingo).

El cronometraje del proceso de recambio de guardia arrojó que la tarea de sumar los tiempos de pernocte manuscritos, descontar los consumos preimpresos y contar el efectivo demora un promedio de **17 minutos netos** por transición. La compulsa de los últimos registros de caja indica que, sobre el volumen total de liquidaciones, un **10% presenta discrepancias financieras** (faltantes o sobrantes de efectivo) respecto a lo asentado en los tableros de madera.

---

## II.4. Gráficos y variables de análisis

### Figura 1: Composición de la exactitud de las liquidaciones de caja en conserjería
| Estado de Liquidación | Porcentaje |
| :--- | :--- |
| **Exactas** | 90% |
| **Con Discrepancia** | 10% |

- **Eje/Variables representadas:** La variable categórica representa el estado de la liquidación (Exacta vs. Con Discrepancia). La variable numérica representa el porcentaje sobre el total de recambios de turno.
- **Lectura del gráfico:** El análisis evidencia que 1 de cada 10 recambios de guardia sufre una vulnerabilidad financiera o error de transcripción, validando el riesgo de fuga de ingresos por la dependencia del soporte físico.

---

## II.5. Análisis de la información
El análisis del entorno macroadministrativo y competitivo de la organización determina exigencias arquitectónicas y lógicas estrictas para el sistema de información. Se aplica el modelo PESTEL y la matriz FODA:

### Análisis Macroeconómico y de Entorno (Modelo PESTEL)
- **Factor Político y Legal:** El encuadre laboral de los conserjes exige delimitación estricta de responsabilidades ante faltantes de dinero en la caja registradora.
  - *Implicancia decisoria:* Determina la construcción de un módulo de "cierre de caja ciego". El sistema prohíbe al operador visualizar el total calculado por el servidor; el conserje debe declarar el efectivo físico primero, y el sistema sella la diferencia en la bitácora de auditoría.
- **Factor Económico:** La inestabilidad macroeconómica y la inflación constante obligan a los establecimientos a ajustar sus tarifas con alta frecuencia.
  - *Implicancia decisoria:* Obliga a diseñar un módulo de configuración SaaS de parametrización dinámica. Las tarifas no pueden estar hardcoded; deben actualizarse desde el panel gerencial.
- **Factor Sociocultural:** El comportamiento del usuario valora la inmediatez absoluta, el anonimato y la nula fricción al momento de la salida.
  - *Implicancia decisoria:* La interfaz gráfica (Frontend) orientada a la conserjería se estructura como una Single Page Application (SPA) de un solo clic.
- **Factor Tecnológico:** La región presenta intermitencias ocasionales en el suministro eléctrico y la conectividad a internet.
  - *Implicancia decisoria:* La máquina de estados que controla el temporizador de cada habitación debe alojarse íntegramente en el servidor (Backend). Ante una caída de red, el servidor continúa el cómputo.

### Diagnóstico Organizacional (Matriz FODA)
- **Fortaleza:** La gestión familiar y centralizada del Motel C.C. permite una toma de decisiones inmediata y un acceso irrestricto a los procesos de caja.
  - *Implicancia decisoria:* Habilita un ciclo de vida de desarrollo ágil con validación continua.
- **Debilidad:** Dependencia estructural de soportes físicos volátiles (tableros de madera y papel), generando una tasa de descuadre financiero del 10%.
  - *Implicancia decisoria:* Proscribe el uso de arquitecturas CRUD estándar y fuerza la implementación de una bitácora transaccional inmutable (*Append-Only Log*).
- **Oportunidad:** Existencia de un mercado regional de alojamientos por turno con características logísticas idénticas, carente de software especializado.
  - *Implicancia decisoria:* Justifica la adopción de una arquitectura SaaS multi-inquilino (*multi-tenant*) con aislamiento lógico por fila (Row-Level Security).
- **Amenaza:** Riesgo alto de resistencia al cambio por parte del personal de conserjería frente a la pérdida de maniobrabilidad manual.
  - *Implicancia decisoria:* Exige que la Usabilidad (UX) del sistema sea operativamente superior al papel, asumiendo el 100% de la carga cognitiva.

### Análisis de Rivalidad Amplificada (5 Fuerzas de Porter)
1. **Rivalidad entre Competidores (Alta):** Competencia por ubicación y rapidez en la liquidación del cliente.
2. **Poder de los Proveedores (Bajo):** Mercado fragmentado de insumos de blanquería y bebidas.
3. **Poder de los Clientes (Alto):** Sensibilidad extrema al tiempo de espera y a la precisión del cobro.
4. **Amenaza de Nuevos Entrantes (Media):** Barrera de entrada inmobiliaria (CAPEX) elevada pero modelo altamente replicable.
5. **Amenaza de Productos Sustitutos (Media):** Plataformas de alquiler temporario sin demanda de fracción horaria inmediata.

### Marco Legal e Infraestructura Cloud
Despliegue en la nube pública de **Amazon Web Services (AWS)** en la región `us-east-1`. Cumplimiento de la **Ley N.° 25.326 de Protección de Datos Personales** (Argentina) mediante cláusulas tipo de la Agencia de Acceso a la Información Pública (AAIP) y preservación estricta del anonimato (registro mediante patentes o identificadores genéricos).

### Sector de los Recursos (Software y Servicios Informáticos - SSI)
Enmarcado en el ecosistema tecnológico de Posadas, Misiones (Polo TIC y Silicon Misiones). Escala salarial calculada en base a los parámetros de la Cámara de la Industria Argentina del Software (CESSI) actualizados al Q3 2026.

---

## II.6. Conclusiones del relevamiento
- **Hallazgo 1 (Causalidad del descuadre):** La TDC del 10% obedece a la vulnerabilidad intrínseca del soporte en papel, que permite la anulación física e indetectable de turnos. *Decisión:* Adopción de bitácora transaccional inmutable (*Append-Only Log*).
- **Hallazgo 2 (Cuello de botella en el arqueo):** Los 17 minutos de TPA se consumen en la reconstrucción manual de tiempos y conteo de stock. *Decisión:* Entidad "Habitación" como máquina de estados finita con temporizador en servidor y comanda digital sincronizada.
- **Limitaciones reconocidas:** Exclusión del personal de maestranza/limpieza en el estudio de tiempos.
