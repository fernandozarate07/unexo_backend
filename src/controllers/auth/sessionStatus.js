const sessionStatus = (req, res, next) => {
  console.log("req.user:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "No hay sesión activa" });
  }

  // Sanitizamos antes de devolver
  const { id, name, email, profilePhoto, role, points } = req.user;

  return res.status(200).json({
    message: "Sesión activa",
    user: { id, name, email, profilePhoto, role, points },
  });
};
module.exports = sessionStatus;
