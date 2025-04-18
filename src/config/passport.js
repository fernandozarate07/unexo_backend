const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

/**
 * Estrategia local utilizando email y password para la autenticación.
 * Configura Passport para usar la estrategia local para el inicio de sesión de usuario.
 * Verifica que el usuario exista en la base de datos y que la contraseña proporcionada sea correcta.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña proporcionada por el usuario.
 * @param {function} done - Callback que maneja el resultado de la autenticación.
 *    - Si la autenticación es exitosa, se pasa el usuario al callback.
 *    - Si falla, se pasa un error o un mensaje de fallo.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // El campo de nombre de usuario se considera como email.
      passwordField: "password", // El campo de la contraseña es "password".
    },
    async (email, password, done) => {
      try {
        // Buscar al usuario en la base de datos utilizando el email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return done(null, false, { message: "ERROR: Usuario no encontrado" });

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "ERROR: Contraseña incorrecta" });

        // Autenticación exitosa, devolvemos al usuario
        return done(null, user);
      } catch (error) {
        return done(error); // Devolver error si ocurre alguno durante el proceso
      }
    }
  )
);

/**
 * Serializa el ID del usuario en la sesión para mantenerlo en la sesión de la aplicación.
 * Esto permite almacenar el ID del usuario en la sesión en lugar de todo el objeto usuario.
 *
 * @param {Object} user - El usuario que será serializado.
 * @param {function} done - Callback que maneja la serialización.
 */
passport.serializeUser((user, done) => done(null, user.id));

/**
 * Deserializa el usuario a partir de su ID almacenado en la sesión.
 * Recupera los detalles del usuario de la base de datos utilizando su ID.
 *
 * @param {number} id - El ID del usuario almacenado en la sesión.
 * @param {function} done - Callback que maneja la deserialización.
 */
passport.deserializeUser(async (id, done) => {
  try {
    // Recuperar el usuario a partir de su ID
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user); // Devolver el usuario deserializado
  } catch (error) {
    done(error); // Devolver error si ocurre durante la deserialización
  }
});
