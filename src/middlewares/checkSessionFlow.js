/**
 * Middleware para verificar si hay una sesión activa en el servidor.
 * Si no hay usuario autenticado en la sesión, se interrumpe el flujo y se responde con un error 401.
 * Si la sesión está activa, se pasa al siguiente middleware o controlador.
 *
 * @param {import('express').Request} req - El objeto de la solicitud HTTP.
 * @param {import('express').Response} res - El objeto de la respuesta HTTP.
 * @param {Function} next - La función para pasar al siguiente middleware o controlador.
 * @returns {void} Llama a `next()` si hay una sesión activa, o responde con un error 401 si no la hay.
 */
const checkSessionFlow = (req, res, next) => {
  // Mostrar en consola el usuario actual (útil para debug)
  console.log("req.user:", req.user);

  // Si no hay un usuario en la sesión, se deniega el acceso y se interrumpe el flujo
  if (!req.user) {
    return res.status(401).json({ message: "ERROR: No hay sesión activa" });
  }

  // Si la sesión está activa, continúa con el flujo
  next();
};

// Exportar el middleware para que pueda ser utilizado en otras partes de la aplicación
module.exports = checkSessionFlow;
