const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");

/**
 * Controlador para registrar un nuevo usuario.
 * Verifica si el email ya está en uso, encripta la contraseña
 * y guarda al usuario en la base de datos.
 *
 * @param {Object} req - El objeto de la solicitud HTTP que contiene los datos del nuevo usuario, como el nombre, email y contraseña.
 * @param {Object} res - El objeto de la respuesta HTTP que se utilizará para enviar la respuesta al cliente.
 *
 * @returns {Object} Respuesta HTTP con un mensaje de éxito y el ID del nuevo usuario, o un error si no se puede crear el usuario.
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificamos si ya existe un usuario con el mismo email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }], // Podés expandir a más condiciones en el futuro
      },
    });

    // Si ya hay un usuario con ese email, devolvemos error
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "ERROR: Este email ya fue ocupado",
      });
    }

    // Encriptamos la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rondas

    // Creamos el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Devolvemos respuesta exitosa con el ID del nuevo usuario
    return res.status(200).json({
      success: true,
      message: "Usuario creado con éxito",
      user: {
        id: newUser.id,
      },
    });
  } catch (err) {
    // Log y respuesta en caso de error inesperado
    res.status(500).json({ success: false, message: "ERROR: No se ha podido crear el usuario" });
  }
};

module.exports = registerUser;
