const passport = require("passport");

/**
 * Controlador para iniciar sesión de usuario.
 * Utiliza la estrategia 'local' de Passport para autenticar con email y contraseña.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos de la petición. Debe incluir el cuerpo con el email y la contraseña del usuario.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 * @param {Function} next - La función de siguiente middleware que se ejecuta después de este controlador.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito o error.
 */
const loginUser = (req, res, next) => {
  // Llama a la estrategia 'local' definida en la configuración de Passport
  passport.authenticate("local", (err, user, info) => {
    // Si ocurre un error interno durante la autenticación
    if (err) {
      return res.status(500).json({ success: false, message: "ERROR: Se produjo un error interno del servidor" });
    }

    // Si no se encontró un usuario válido (credenciales incorrectas, etc.)
    if (!user) {
      return res.status(404).json({ success: false, message: "ERROR: No se pudo autenticar al usuario" });
    }

    // Si el usuario fue autenticado correctamente, iniciar sesión con req.logIn
    req.logIn(user, (err) => {
      // Error al crear la sesión
      if (err) {
        return res.status(500).json({ success: false, message: "ERROR: No se pudo iniciar sesión" });
      }

      // Enviar respuesta exitosa con los datos del usuario autenticado
      return res.status(200).json({
        success: true,
        message: "SUCCESS: Inicio de sesión exitoso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePhoto: user.profilePhoto,
          role: user.role,
          points: user.points,
        },
      });
    });
  })(req, res, next); // Llama inmediatamente a la función devuelta por passport.authenticate
};

/**
 * Controlador para cerrar sesión del usuario.
 * Utiliza req.logout proporcionado por Passport para finalizar la sesión actual.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos de la sesión actual.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito o error.
 */
const logoutUser = (req, res) => {
  // Llama a logout y maneja posibles errores
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "ERROR: Error al cerrar sesión" });
    }

    // Si todo salió bien, confirma que la sesión fue cerrada
    res.status(200).json({ success: true, message: "SUCCESS: Sesión cerrada correctamente" });
  });
};

module.exports = { loginUser, logoutUser };
