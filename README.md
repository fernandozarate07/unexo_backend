# Unexo – Backend

Unexo es una plataforma de clasificados académicos pensada para estudiantes de la Universidad Nacional de San Juan. Este es el backend de la aplicación, desarrollado con Node.js, Express y MySQL, utilizando Prisma como ORM.

---

## 🚀 Funcionalidades implementadas (MVP)

- ✅ Autenticación con Passport (registro, login y verificación de sesión)
- ✅ Sistema de notificaciones con estado de lectura
- ✅ Sistema de "Me gusta" y "Guardar" para aportes
- ✅ Filtro en cascada: tipo, facultad, carrera, año y asignatura
- ✅ Administración de reportes y moderación

> 📌 Ya se encuentra desarrollado el MVP. Sin embargo, aún se pueden proponer nuevas funcionalidades o mejoras. ¡Tu aporte es bienvenido!

---

## 🧩 Estructura del proyecto

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

---

## ⚙️ Variables de entorno

El proyecto utiliza un archivo `.env` para configurar el entorno de desarrollo. Ejemplo:

```env
PORT=5001
DATABASE_URL="mysql://root@localhost:3306/unexo"
```

---

## 📦 Instalación local

1. **Forkeá este repositorio** en tu cuenta.
2. **Cloná tu fork** en tu máquina local:
3. **Instalá las dependencias:**

```bash
npm install
```

4. **Configurá tu base de datos:**
   - Asegurate de tener MySQL corriendo localmente.
   - Modificá `DATABASE_URL` en tu archivo `.env` según tu configuración.
   - Ejecutá Prisma para crear el esquema:

```bash
npx prisma migrate dev
```

5. **Iniciá el servidor:**

```bash
npm run dev
```

---

## 🤝 ¿Querés colaborar?

¡Genial! La estructura del backend ya está lista con el MVP, pero se pueden seguir sumando nuevas funcionalidades o mejoras.

### Metodología de contribución

1. Comentá tu idea en el grupo o en un issue.
2. Una vez validada, **forkeá el repo** y creá una nueva rama (`feature/...`, `fix/...`, etc.).
3. Desarrollá tu aporte en tu fork.
4. Abrí un **pull request** a este repositorio principal.
5. El cambio será revisado, y si está todo OK, será mergeado al proyecto.

👉 [Guía de contribución](./CONTRIBUTING.md) (próximamente)

---

## 🔗 Recursos y comunidad

- Grupo de desarrollo: [WhatsApp - Devs UNEXO](https://chat.whatsapp.com/DPCNOOAvl9Z0tmmBNZTFXe)

---

## 🛡️ Licencia

Este proyecto es de uso personal. El contenido compartido por los usuarios en la app debe respetar los derechos de autor correspondientes.
