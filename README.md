# Unexo

🌟 ¡Bienvenido/a a Unexo!

Agradecemos tu interés en este proyecto, que sigue siendo creado por y para estudiantes de la Universidad Nacional de San Juan (UNSJ). Sin embargo, debido a la necesidad de mantener el proyecto operativo, hemos decidido modificar su modelo para generar ingresos y garantizar su sostenibilidad.

Este archivo documenta tanto el **frontend** como el **backend** del proyecto.

---

## 🚀 Funcionalidades implementadas (MVP)

### Frontend

📌 Páginas del Frontend:

- ✅ Landing Page.
- ✅ Presentación del proyecto, beneficios y llamada a acción.
- ✅ Página de Búsqueda.
- ✅ Búsqueda de aportes académicos con filtros avanzados.
- ✅ Página de Aporte.
- ✅ Detalle completo del aporte (archivos, descripción, autor).
- ✅ Perfil de Usuario.
- ✅ Usuario: Datos personales, gestión de aportes y registro de puntos.
- ✅ Panel de Control (por rol).
- ✅ Moderador: Revisión de reportes y contenido.
- ✅ Admin: Administración total del sistema.

📌 Funcionalidades:

- ✅ Notificaciones.
- ✅ Filtro en Cascada.
- ✅ Búsqueda por: Tipo → Facultad → Carrera → Año → Asignatura.

📌 Interacciones:

- ✅ Like, guardar en favoritos y reportar aportes.

Extras

📌 Diseño responsive, carga rápida de archivos y feedback visual.

### Backend

- ✅ Registro, login, logout y validación de sesiones.
- ✅ Permisos por tipo de usuario (user/moderador/admin).
- ✅ Toggle de "me gusta" en aportes.
- ✅ Alertas para likes/reportes y marcado como leídas.
- ✅ Búsqueda jerárquica (tipo → facultad → carrera → año → materia).
- ✅ Gestión avanzada y estadísticas.
- ✅ Denuncia de aportes inapropiados.
- ✅ Favoritos por usuario.
- ✅ Validación de datos y sesiones.
- ✅ Agregar y eliminar aportes.
- ✅ Guardar aportes.
- ✅ Verificación de enlaces en drive.

> 📌 El MVP ya está completo, pero estamos abiertos a nuevas ideas y mejoras. Si tienes propuestas, no dudes en compartirlas.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- [Next.js](https://nextjs.org)
- Chakra UI (v3)
- Framer Motion
- Python (Modelos de ML/AI e integraciones futuras)

### Backend

- Node.js
- Express
- MySQL
- Prisma ORM
- Passport (autenticación)

---

## 📁 Estructura del proyecto

### Frontend

src/
├── app/ # Páginas principales
├── components/ # Componentes reutilizables
├── context/ # Contextos globales
└── lib/ # Lógica compartida

### Backend

.
├── prisma/ # Esquema y migraciones de Prisma
├── src/
│ ├── config/ # Configuración de Prisma y Passport
│ ├── controllers/ # Controladores de cada funcionalidad
│ ├── middlewares/ # Middlewares de validación y seguridad
│ ├── routes/ # Rutas Express agrupadas por función
│ ├── validators/ # Validadores de datos
│ └── app.js # Configuración de la app Express
├── server.js # Entrada principal del servidor
└── .env # Variables de entorno (no incluida en repo)

## 🛡️ Licencia

Este proyecto es de uso exclusivo para los responsables de su desarrollo y gestión. El contenido compartido por los usuarios en la app debe respetar los derechos de autor correspondientes.

Este proyecto ya no es de código abierto. Su uso está sujeto a un acuerdo de licencia comercial. Cualquier uso no autorizado, copia, modificación, distribución o divulgación del código fuente está prohibido sin el permiso explícito del autor.

---

## 🔗 Comunidad y contacto

• Instagram: [@unexoapp](https://instagram.com/unexoapp)  
• Gmail: unexoapp@gmail.com

💡 ¡Tu participación suma! Si tienes alguna idea, comentario o inquietud, no dudes en contactarnos.

---
