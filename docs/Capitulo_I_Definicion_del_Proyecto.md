# Capítulo I: Definición del Proyecto

## Resumen Ejecutivo
El establecimiento de alojamiento transitorio **Motel C.C.**, ubicado en la ciudad de Posadas, Misiones, gestiona su logística operativa y financiera mediante soportes físicos volátiles (fichas de papel y tableros de madera), lo que vulnera la inmutabilidad de los registros y propicia fugas de ingresos durante las transiciones de guardia. La consolidación manual de estas fichas arroja un **Tiempo Promedio de Arqueo (TPA) de 17 minutos** por cada recambio de turno y genera una **Tasa de Discrepancia de Caja (TDC) en el 10%** de las liquidaciones, derivando en tiempos ciegos improductivos y fraude operativo por omisión de registros.

Para resolver esta vulnerabilidad, el presente proyecto propone el diseño y desarrollo de un **Sistema de Procesamiento de Transacciones (TPS)** bajo arquitectura web. La solución reemplaza el tablero físico por una interfaz reactiva orientada a la conserjería que modela el estado de las trece habitaciones y automatiza el cálculo de tarifas y descuentos de inventario. A nivel estructural, el sistema se despliega en la nube mediante un modelo **Software as a Service (SaaS) multi-inquilino**, implementando un cierre de caja ciego y una bitácora transaccional de solo agregado (*Append-Only Log*) que impide el borrado o alteración silenciosa de las operaciones.

El desarrollo metodológico del Producto Mínimo Viable (MVP) se ejecutará bajo un enfoque iterativo incremental en un plazo de ocho semanas, validando las funcionalidades mediante prototipado continuo con la gerencia de la organización. El criterio de éxito establecido para el proyecto exige, durante los primeros treinta días de operación, la reducción del Tiempo Promedio de Arqueo a un máximo de 5 minutos y la disminución de la Tasa de Discrepancia de Caja al 0%.

---

## 1.1. Origen del proyecto
El presente proyecto se origina a partir de una disfunción operativa estructural en la administración logística y financiera del establecimiento de alojamiento por turnos "Motel C.C." (ubicado en Posadas, Misiones). Se observa de manera sostenida que la organización gestiona la ocupación de sus 13 habitaciones y el inventario de consumiciones mediante un soporte físico altamente volátil, consistente en un tablero de madera y fichas de papel fragmentadas (fichas de 10x10 cm). Los sujetos directamente afectados son los propietarios (en el plano financiero), el personal administrativo y el equipo de conserjería.

El desencadenante dominante del proyecto es esta disfunción operativa, la cual vulnera la inmutabilidad del registro y propicia la fuga de ingresos por omisión o pérdida de datos durante los tres cambios de guardia diarios. Este factor subordina causalmente al desencadenante secundario de obsolescencia tecnológica; la mera sustitución del papel por un software genérico sin una arquitectura de auditoría estricta no resolvería la discrepancia de caja. La implementación de una bitácora transaccional inmutable desactiva simultáneamente la vulnerabilidad financiera y el atraso tecnológico.

---

## 1.2. Misión, visión y objetivos del proyecto
- **Misión:** Proveer un sistema de información web transaccional que garantice la inmutabilidad de los registros de estadía y consumo, eliminando las discrepancias de caja y optimizando el tiempo de arqueo para el personal de conserjería.
- **Visión:** Consolidar el sistema, en un horizonte de doce meses, como un producto SaaS multi-inquilino capaz de estandarizar la gobernanza logística en múltiples establecimientos del sector.
- **Objetivo General:** Implementar el Producto Mínimo Viable (MVP) del sistema web de gestión de turnos y caja en el establecimiento Motel C.C., reduciendo el Tiempo Promedio de Arqueo a menos de 5 minutos, en un plazo de desarrollo de 8 semanas.
- **Objetivos Específicos:**
  1. Reemplazar el tablero físico por una máquina de estados visual que compute automáticamente el tiempo de pernocte.
  2. Reducir la Tasa de Discrepancia de Caja al 0% mediante la implementación obligatoria de un cierre de guardia ciego.
  3. Asegurar la trazabilidad absoluta de las operaciones mediante una bitácora de solo agregado (*Append-Only Log*) a nivel de base de datos.

---

## 1.3. Necesidad o problema al que responde el proyecto
La gerencia y el personal de conserjería del Motel C.C. (sujeto afectado) padecen una pérdida crónica de trazabilidad financiera originada en el uso de fichas de papel sueltas para asentar el ingreso de vehículos y consumiciones (manifestación observable). Esta modalidad arroja un Tiempo Promedio de Arqueo (TPA) de 17 minutos por cada cambio de guardia y genera una Tasa de Discrepancia de Caja (TDC) en el 10% de las liquidaciones (magnitud y línea de base), medidos mediante observación directa y cronometraje in situ. El problema se manifiesta diariamente bajo una carga base de 20 a 30 turnos los días hábiles, escalando hasta 50 turnos diarios durante los fines de semana (contexto y frecuencia). Esta volatilidad documental deriva en una pérdida de recaudación por omisión de registro y en tiempos ciegos improductivos que exponen al establecimiento a fraudes operativos (consecuencia acreditada).

Según la tipología de Kendall y Kendall (2005), se diagnostica una vacancia en el **Nivel Operacional**, careciendo de un Sistema de Procesamiento de Transacciones (TPS), lo que deja huérfanas de soporte informacional a las decisiones de control de la gerencia.

- **Criterio de Éxito:** Reducción del TPA de 17 a un máximo de 5 minutos, y disminución de la TDC del 10% al 0%, medidos en los primeros treinta días de operación.
- **Primer Requisito:** El sistema debe registrar inmutablemente la apertura de cada habitación vinculada a un cronómetro de servidor, impidiendo su anulación física.
- **Riesgo Principal:** Resistencia a la adopción del sistema por parte del personal de conserjería ante la imposibilidad de manipular el arqueo manual.

---

## 1.4. Objetivos de Desarrollo Sostenible (ODS) asociados y diferenciales
El proyecto incide de manera diferencial sobre el **ODS 8: Trabajo Decente y Crecimiento Económico**, específicamente en su **meta 8.2** orientada a lograr niveles más elevados de productividad mediante la modernización tecnológica. El mecanismo de contribución radica en la supresión del trabajo administrativo redundante durante los arqueos, transparentando la relación laboral al eliminar la fricción por sospechas de fraude en los descuadres de caja. El indicador verificable es la reducción porcentual de la Tasa de Discrepancia de Caja (TDC) a cero y la disminución del Tiempo Promedio de Arqueo (TPA).

---

## 1.5. Descripción breve del Sistema de Información
La solución constituye un Sistema de Procesamiento de Transacciones (TPS) diseñado en arquitectura web para el back-office de establecimientos por turnos. Reemplaza el soporte en papel por un panel reactivo que modela la ocupación y automatiza el cobro de consumiciones. Transforma un entorno de alta vulnerabilidad financiera en uno de gobernanza estricta mediante cierres de caja ciegos y registros de auditoría imborrables.

---

## 1.6. Descripción detallada del Sistema de Información
El sistema adopta una arquitectura SaaS multi-inquilino (*multi-tenant*) basada en aislamiento lógico por esquemas y Row-Level Security (RLS). A continuación se detallan sus alcances, justificación arquitectónica y mecanismos operativos:

### Frontera e Inclusiones
Comprende el panel de conserjería para asignación de habitaciones, el módulo de control de stock vinculado a la estadía y el módulo de auditoría gerencial con arqueo ciego. Las entradas son generadas por los conserjes; las salidas alimentan los reportes de la gerencia.

### Exclusiones Declaradas
1. Se excluye el módulo de liquidación de haberes; motivo: corresponde a la gestión contable externa de la organización.
2. Se excluye una interfaz orientada al cliente (reservas); motivo: el modelo de negocio demanda espontaneidad y absoluto anonimato, volviendo innecesaria la captura de datos filiatorios previos.

### Prototipo v0
Se presenta una maqueta de baja fidelidad que modela el flujo de ocupación y el formulario de arqueo ciego. Validado el 03/09/2026 con C.C., Gerente de la organización.

### Alcance y Funcionalidades del MVP
1. **Panel Reactivo de Conserjería (Máquina de Estados):** Interfaz visual interactiva que modela las 13 habitaciones y permite transicionar su estado (Disponible, Ocupada, En Limpieza, Mantenimiento), accionando automáticamente el cómputo temporal.
2. **Módulo de Configuración SaaS (Tenant Setup):** Parametrización dinámica de cantidad de habitaciones, tarifas, turnos de guardia y padrón de empleados habilitados.
3. **Comanda Digital de Inventario:** Módulo transaccional que integra el consumo de productos directamente a la cuenta corriente temporal de la habitación activa, descontando el inventario de manera sincrónica.
4. **Cierre de Caja Ciego (Anti-Fraude):** Formulario que exige al operador declarar el total de efectivo físico presente antes de contrastarlo contra el cálculo del sistema, marcando automáticamente cualquier desviación.
5. **Bitácora de Auditoría Inmutable:** Registro de solo agregado (*Append-Only Log*) protegido mediante disparadores de base de datos que impiden alteración o eliminación de operaciones.

### Justificación Arquitectónica y Alternativas Descartadas
Se adopta una arquitectura en la nube SaaS multi-tenant. Se descarta la arquitectura Single-Tenant On-Premise (servidor local), ya que vulnera la integridad de los datos ante manipulaciones físicas, impide la escalabilidad comercial y dificulta el monitoreo remoto gerencial.

### Manejo de Contingencias y Transiciones de Estado
Ante un error de asignación de habitación, se prohíbe la eliminación física del registro. Se resuelve mediante la transición al estado "Anulado", generando un evento inmutable registrado como `TURNO_ANULADO` con justificación obligatoria, timestamp e identificador de usuario.
