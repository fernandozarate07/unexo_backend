const checkSessionFlow = (req, res, next) => {
  console.log("req.user:", req.user);

  // Si no hay un usuario en la sesión, se deniega el acceso y se interrumpe el flujo
  if (!req.user) {
    return res.status(401).json({ message: "ERROR: No hay sesión activa" });
  }

  // Si la sesión está activa, continúa con el flujo
  next();
};
// Exportar ambos middleware
module.exports = checkSessionFlow;
