import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validateLogin, validateRegister } from "../validators/authValidator.js";

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
}

export async function register(req, res) {
  try {
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      passwordHash
    });

    const token = signToken(user.id);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register" });
  }
}

export async function login(req, res) {
  try {
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = signToken(user.id);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
}
