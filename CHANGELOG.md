# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.2.0] - 18-01-2026

### Añadido
- **Sección de Servicios Profesionalizada**: Reestructuración completa con nuevo enfoque en "Soluciones de Autoridad Digital".
- **Ecosistema Digital Pro**: Servicio destacado con diseño premium y tags de autoridad técnica (SIR 62%, Arquitectura de Entidades, Escalabilidad Total).
- **Tres Pilares Técnicos**: Arquitectura Performance-First, Visibilidad Local y Generativa, e Ingeniería de Flujos y Agentes IA.
- **Footer de Sección**: Hook de cierre con mensaje de autoridad y credibilidad técnica.

### Cambiado
- **Componentes CSS**: Nuevas clases `.service-card--featured`, `.service-card__tags`, `.service-card__tag` y `.services-footer` en `components.css`.
- **Copy Estratégico**: Textos orientados a alto valor técnico y estratégico, destacando métricas reales y tecnologías específicas.

## [1.1.0] - 18-01-2026
### Añadido
- **Schema Avanzado**: Implementación de JSON-LD para `Service` y `Review` en el caso de estudio.
- **Utilidades CSS**: Nuevas clases de espaciado (`.mb-xl`, `.pt-sm`) y bordes (`.border-t`) en `main.css`.

### Cambiado
- **Refactorización Integral (Section 3)**: Nuevo diseño de "3 Pilares" para la sección de Contexto, mejorando la legibilidad con un grid de 3 columnas.
- **Espaciado (Section 4)**: Ajuste vertical correctivo en tarjetas de Diagnóstico mediante utilidades `!important` para forzar el centrado visual.
- **Arquitectura CSS**: Reordenamiento de imports en `proyecto-ledescaparate.html` para garantizar la especificidad de las utilidades sobre los componentes.
- **Unificación UI**: Estandarización de `section-header` y títulos de tarjetas en todas las secciones.
## [1.3.1] - 18-01-2026

### Añadido
- **Reingeniería de Chat**: Interfaz de mensajería moderna con alineación diferenciada y lógica de IA generativa visualmente optimizada.
- **Testimonio Premium**: Refinamiento estético de la tarjeta "Mención de Honor" con glassmorphism profundo y jerarquía tipográfica corregida.

## [1.3.0] - 18-01-2026

### Añadido
- **Autoridad GEO**: Integración de Badge SIR (62%) con diseño glassmorphism en la terminal de IA.
- **Automatización**: Nueva sección "Gestión Inteligente de la Autoridad" detallando flujos de leads y monitorización de SEO Local autónomo.
- **Testimonio Premium**: Rediseño completo de la sección de testimonios ("Mención de Honor") con estética corporativa, logo integrado y tipografía refinada.

### Cambiado
- **Refactorización Técnica**: Actualización del copy de rendimiento (LCP) a un tono de alta consultoría técnica.

## [1.2.0] - 18-01-2026

### Añadido
- **Caso de Estudio**: Transformación completa de `proyecto-ledescaparate.html` en un caso de éxito real enfocado en la autoridad en IA.
- **Componentes UI**: Implementación de Anillos PageSpeed (Lighthouse style) y Terminal de IA (Efecto Hook) en `components.css`.
- **Contenido**: Estructura de 7 secciones con narrativa de "Arquitectura de Entidades" y testimonios reales.

### Corregido
- **Bug de Anillos PageSpeed**: Se han corregido las dimensiones de los SVGs y el color de relleno del círculo para evitar que cubrieran toda la pantalla.
- **Enlace de Inicio**: El proyecto LEDescaparate en `index.html` ahora apunta correctamente al nuevo caso de estudio.

## [1.0.0] - 08-01-2026

### Añadido
- **Diseño General**: Implementación de estética dark-tech con glassmorphism.
- **Hero Section**: Alineación horizontal de botones CTA y terminal de código interactiva con efectos hover.
- **Fondos**: Sistema de ondas SVG animadas con optimización de "overscale" para evitar bordes visibles.
- **Componentes**: Navbar dinámico, cards de proyectos/servicios y footer responsive.
- **Formulario**: Validación en tiempo real y sistema de notificaciones.
- **Plantilla**: Creación de `plantilla-proyecto.html` para casos de estudio GEO/SEO.
- **Documentación**: README detallado, `.gitignore`, `VERSION` y este `CHANGELOG`.

### Cambiado
- **Refactorización**: Migración completa de clases inline y Tailwind CDN a arquitectura CSS modular propia (`main.css`, `components.css`, `shared.css`).
- **Comentarios**: Unificación de todos los comentarios de código a español de España.

### Corregido
- Alineación vertical del contenido en la columna derecha del Hero.
- Visibilidad de bordes en animaciones de fondo mediante zoom SVG selectivo.
- **Bug de fondo en cabeceras**: Eliminación de degradados conflictivos en `.page-header` y ajuste de espaciados para asegurar consistencia visual con la página de inicio.