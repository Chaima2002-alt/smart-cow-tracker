// userController.js (correction)
exports.prottectorMW = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const validToken = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    const user = await User.findById(validToken.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    // Vérification du changement de mot de passe
    if (user.verifyToken(validToken.iat)) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
