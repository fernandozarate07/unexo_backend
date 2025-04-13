const checkSessionFlow = (req, res, next) => {
  console.log("req.user:", req.user);

  // Si no hay un usuario en la sesión, se deniega el acceso y se interrumpe el flujo
  if (!req.user) {
    return res.status(401).json({ message: "ERROR: No hay sesión activa" });
  }

  // Si la sesión está activa, continúa con el flujo
  next();
};

// Este es para postman
const checkSessionStatus = (req, res, next) => {
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

// Exportar ambos middleware
module.exports = { checkSessionFlow, checkSessionStatus };
