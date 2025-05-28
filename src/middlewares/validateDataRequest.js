const { validationResult } = require("express-validator");

/**
 * Middleware para validar los datos de la solicitud utilizando express-validator.
 * Este middleware verifica si la solicitud contiene errores de validación.
 * Si existen errores, se responde con un error 400 y una lista de los errores.
 * Si no hay errores, se continúa con el siguiente middleware o controlador.
 *
 * @param {import('express').Request} req - El objeto de la solicitud HTTP.
 * @param {import('express').Response} res - El objeto de la respuesta HTTP.
 * @param {Function} next - La función para pasar al siguiente middleware o controlador.
 * @returns {void} Llama a `next()` si no hay errores de validación, o responde con un error 400 si los hay.
 */
const validateDataRequest = (req, res, next) => {
  // Obtenemos los errores de validación de la solicitud
  const errors = validationResult(req);

  // Si existen errores, respondemos con un error 400 y los detalles de los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  // Si no hay errores, continuamos con el flujo
  next();
};

module.exports = validateDataRequest;
