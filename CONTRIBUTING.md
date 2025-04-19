# 🙌 Guía de Contribución a Unexo

🌟 ¡Bienvenido/a a Unexo!

Agradecemos tu interés en contribuir a este proyecto de código abierto creado por estudiantes, para estudiantes de la Universidad Nacional de San Juan (UNSJ).

Nuestra misión es democratizar el acceso al conocimiento académico, facilitando el intercambio de apuntes, materiales de estudio y recursos educativos entre la comunidad universitaria.

Cada contribución, grande o pequeña, nos ayuda a construir una herramienta más útil para miles de compañeros. ¡Tu participación marca la diferencia!

---

## 🌟 Formas de Contribuir

### 🚀 No técnicas

- Difundir Unexo en redes sociales y grupos estudiantiles.
- Traducir documentación o contenidos a otros idiomas.
- Reportar bugs o sugerir mejoras a través de issues.
- Colaborar en la redacción de blogs o material de difusión.
- Cualquier otra idea creativa que impulse el proyecto.

### 💻 Técnicas

- Diseñar logos o mejorar la identidad visual (UI/UX, mockups, wireframes).
- Desarrollo Frontend (Next.js).
- Desarrollo Backend (Node.js / Express).
- Escribir pruebas unitarias (Jest).
- Mejorar infraestructura o automatización.

---

## ⚙️ Primeros Pasos

1. Haz fork del repositorio.
2. Clona tu fork.
3. Configura el proyecto (ver instrucciones específicas más abajo).

---

## 🛠️ Configuración del Backend

1. Crea un archivo `.env` con el siguiente contenido:

   ```env
   PORT=5001
   DATABASE_URL="mysql://root@localhost:3306/unexo"
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Configura la base de datos:

   ```bash
   npx prisma migrate dev
   ```

4. Inicia el servidor:

   ```bash
   npm run dev
   ```

---

## 🎨 Configuración del Frontend

1. Clona el repositorio frontend.

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npm run dev
   ```

---

## 🔄 Proceso de Contribución

1. Crea una rama descriptiva en inglés:

   ```bash
   git checkout -b feat/new-feature
   ```

2. Haz commits atómicos y claros en inglés:

   ```bash
   git commit -m "feat: add notification system"
   ```

3. Sube tus cambios:

   ```bash
   git push origin feat/new-feature
   ```

4. Abre un **Pull Request** hacia la rama `main` del repositorio original.

---

## 📌 Reglas Importantes

- Nunca hagas push directo a `main`.
- Cada Pull Request debe estar asociado a un **issue** o tarea.
- Toda contribución funcional debe incluir **pruebas unitarias usando Jest**.
- Seguí las convenciones de código existentes.

---

## 🛑 Antes de Enviar tu PR

Verificá que:

- La aplicación se inicia sin errores (`npm run dev`).
- No rompe funcionalidades existentes.
- Incluye pruebas para los nuevos features.
- Mantiene el estilo y estructura del proyecto.

---

## ❓ ¿Necesitás ayuda?

Abrí un **issue** con tus preguntas o contactanos directamente. ¡Estamos para ayudarte!

---

¡Gracias por ayudar a mejorar Unexo! 🚀
