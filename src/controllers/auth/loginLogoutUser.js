const passport = require("passport");

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "ERROR: Ocurrió un error durante la autenticación", error: err });
    }

    if (!user) {
      return res.status(400).json({ message: info?.message || "No se pudo autenticar al usuario" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "ERROR: No se pudo iniciar sesión", error: err });
      }

      return res.status(200).json({
        message: "Inicio de sesión exitoso",
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
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "ERROR: Error al cerrar sesión", error: err });
    }

    res.status(200).json({ message: "Sesión cerrada correctamente" });
  });
};

module.exports = { loginUser, logoutUser };
