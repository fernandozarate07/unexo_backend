const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificamos si el usuario ya existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "ERROR: Este email ya fue ocupado",
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Usuario creado con éxito",
      user: {
        id: newUser.id,
        nombre: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("(registerUser) -> ERROR: No se ha podido crear el usuario", err);
    res.status(500).json({ message: "ERROR: No se ha podido crear el usuario", error: err.message });
  }
};

module.exports = registerUser;
