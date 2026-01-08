# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

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
