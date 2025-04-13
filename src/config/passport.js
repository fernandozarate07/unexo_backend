const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

// Estrategia local usando email y password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return done(null, false, { message: "ERROR: Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "ERROR: Contraseña incorrecta" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serializar ID de usuario en la sesión
passport.serializeUser((user, done) => done(null, user.id));

// Deserializar usuario a partir del ID en sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
