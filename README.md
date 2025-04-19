# Unexo

🌟 ¡Bienvenido/a a Unexo!

Agradecemos tu interés en contribuir a este proyecto de código abierto creado por estudiantes, para estudiantes de la Universidad Nacional de San Juan (UNSJ).

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
- ✅ Perfil de Usuario
- ✅ Usuario: Datos personales,gestion de aportes y registro de puntos.
- ✅ Panel de Control (por rol)
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
- ✅ Permisos por tipo de usuario (user/moderador/admin)
- ✅ Toggle de "me gusta" en aportes.
- ✅ Alertas para likes/reportes y marcado como leídas.
- ✅ Búsqueda jerárquica (tipo → facultad → carrera → año → materia)
- ✅ gestión avanzada y estadisticas.
- ✅ Denuncia de aportes inapropiados.
- ✅ Favoritos por usuario.
- ✅ Validación de datos y sesiones.
- ✅ Agregar y eliminar aportes.
- ✅ Guardar aportes.
- ✅ Verificacion de enlaces en drive.

> 📌 El MVP ya está completo, pero aún podés proponer nuevas ideas o mejoras.

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

```
src/
├── app/                # Páginas principales
├── components/         # Componentes reutilizables
├── context/            # Contextos globales
└── lib/                # Lógica compartida
```

### Backend

```
.
├── prisma/               # Esquema y migraciones de Prisma
├── src/
│   ├── config/           # Configuración de Prisma y Passport
│   ├── controllers/      # Controladores de cada funcionalidad
│   ├── middlewares/      # Middlewares de validación y seguridad
│   ├── routes/           # Rutas Express agrupadas por función
│   ├── validators/       # Validadores de datos
│   └── app.js            # Configuración de la app Express
├── server.js             # Entrada principal del servidor
└── .env                  # Variables de entorno (no incluida en repo)
```

## 🤝 ¿Querés colaborar?

1. Comentá tu idea en el grupo o en un issue.
2. Una vez validada, **forkeá** el repositorio y creá una rama (`feature/...`, `fix/...`, etc.).
3. Desarrollá tu parte localmente.
4. Abrí un **pull request** hacia este repo.
5. El cambio será revisado y mergeado si está todo OK.

👉 [Guía de contribución](./CONTRIBUTING.md)

---

## 🔗 Comunidad y contacto

👨‍💻 Para desarrolladores
Únete al grupo de desarrollo: WhatsApp - Devs UNEXO

📖 Para compartir recursos
Grupo de aportes académicos: WhatsApp - Aportes UNEXO

📩 Contacta al creador
• Instagram: @zarate.fernando.delvalle
• Web personal: fernandozarate.website
• LinkedIn: fernandozaratedev

💡 ¡Tu participación suma!
Colabora proponiendo ideas, resolviendo dudas o contribuyendo al proyecto.

---

## 🛡️ Licencia

Este proyecto es de uso personal. El contenido compartido por los usuarios en la app debe respetar los derechos de autor correspondientes.
