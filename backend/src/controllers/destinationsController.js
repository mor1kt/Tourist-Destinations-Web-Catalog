import Destination from "../models/Destination.js";
import { validateDestination } from "../validators/destinationValidator.js";

export async function getDestinations(req, res) {
  try {
    const items = await Destination.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
}

export async function getDestinationById(req, res) {
  try {
    const item = await Destination.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid destination id" });
  }
}

export async function createDestination(req, res) {
  try {
    const { isValid, errors } = validateDestination(req.body);
    if (!isValid) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    const created = await Destination.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Failed to create destination" });
  }
}

export async function updateDestination(req, res) {
  try {
    const { isValid, errors } = validateDestination(req.body);
    if (!isValid) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid destination id" });
  }
}

export async function deleteDestination(req, res) {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid destination id" });
  }
}
