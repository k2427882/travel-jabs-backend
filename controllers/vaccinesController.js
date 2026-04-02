import { db } from "../db.js";

export const getVaccines = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vaccines");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while getting vaccines" });
  }
};

export const addVaccine = async (req, res) => {
  try {
    const { VaccineName, VaccineCost } = req.body;

    if (!VaccineName || VaccineCost === undefined || VaccineCost === "") {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    const q = "INSERT INTO Vaccines (VaccineName, VaccineCost) VALUES (?, ?)";
    await db.query(q, [VaccineName, VaccineCost]);

    res.status(201).json({ message: "Vaccine has been added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while adding vaccine" });
  }
};

export const getVaccineById = async (req, res) => {
  try {
    const q = "SELECT * FROM Vaccines WHERE VaccineID = ?";
    const [rows] = await db.query(q, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Vaccine cannot be found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while getting vaccine" });
  }
};

export const updateVaccine = async (req, res) => {
  try {
    const { VaccineName, VaccineCost } = req.body;

    if (!VaccineName || VaccineCost === undefined || VaccineCost === "") {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const q = "UPDATE Vaccines SET VaccineName = ?, VaccineCost = ? WHERE VaccineID = ?";
    const [result] = await db.query(q, [VaccineName, VaccineCost, req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vaccine cannot be found" });
    }

    res.json({ message: "Vaccine updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while updating vaccine" });
  }
};

export const deleteVaccine = async (req, res) => {
  try {
    const q = "DELETE FROM Vaccines WHERE VaccineID = ?";
    const [result] = await db.query(q, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vaccine cannot be found" });
    }

    res.json({ message: "Vaccine deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while deleting vaccine" });
  }
};