/**
 * Middleware/controlador para verificar si hay una sesión activa.
 * Devuelve los datos del usuario autenticado si existe una sesión válida.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos de la sesión activa.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 * @param {Function} next - La función que se llama para pasar el control al siguiente middleware o controlador.
 *
 * @returns {Object} Respuesta HTTP con un mensaje indicando el estado de la sesión y los datos del usuario si la sesión es válida.
 * @throws {Object} Respuesta HTTP con un mensaje de error 401 si no hay sesión activa.
 */
const sessionStatus = (req, res, next) => {
  // Mostrar en consola el usuario actual (útil para debug)
  console.log("req.user:", req.user);

  // Si no hay usuario en la sesión, devolver estado 401 (no autorizado)
  if (!req.user) {
    return res.status(401).json({ success: false, message: "ERROR: No hay sesión activa" });
  }

  // Extraer solo los datos necesarios del usuario (evita exponer info sensible)
  const { id, name, email, profilePhoto, role, points } = req.user;

  // Responder con estado 200 e info básica del usuario
  return res.status(200).json({
    success: true,
    message: "SUCCESS: Sesión activa",
    user: { id, name, email, profilePhoto, role, points },
  });
};

module.exports = sessionStatus;
