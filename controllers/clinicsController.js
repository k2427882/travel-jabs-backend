import { db } from "../db.js";

export const getClinics = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Clinics");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while getting clinics" });
  }
};

export const addClinic = async (req, res) => {
  try {
    const {
      ClinicName,
      ClinicAddress,
      ClinicPostcode,
      ClinicContact,
      ClinicManagerID
    } = req.body;

    if (
      !ClinicName ||
      !ClinicAddress ||
      !ClinicPostcode ||
      !ClinicContact ||
      ClinicManagerID === undefined ||
      ClinicManagerID === ""
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const q = `
      INSERT INTO Clinics
      (ClinicName, ClinicAddress, ClinicPostcode, ClinicContact, ClinicManagerID)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(q, [
      ClinicName,
      ClinicAddress,
      ClinicPostcode,
      ClinicContact,
      ClinicManagerID
    ]);

    res.status(201).json({ message: "Clinic added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while adding clinic" });
  }
};

export const getClinicById = async (req, res) => {
  try {
    const q = "SELECT * FROM Clinics WHERE ClinicID = ?";
    const [rows] = await db.query(q, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while getting clinic" });
  }
};

export const updateClinic = async (req, res) => {
  try {
    const {
      ClinicName,
      ClinicAddress,
      ClinicPostcode,
      ClinicContact,
      ClinicManagerID
    } = req.body;

    if (
      !ClinicName ||
      !ClinicAddress ||
      !ClinicPostcode ||
      !ClinicContact ||
      ClinicManagerID === undefined ||
      ClinicManagerID === ""
    ) {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    const q = `
      UPDATE Clinics
      SET ClinicName = ?, ClinicAddress = ?, ClinicPostcode = ?, ClinicContact = ?, ClinicManagerID = ?
      WHERE ClinicID = ?
    `;

    const [result] = await db.query(q, [
      ClinicName,
      ClinicAddress,
      ClinicPostcode,
      ClinicContact,
      ClinicManagerID,
      req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json({ message: "Clinic updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while updating clinic" });
  }
};

export const deleteClinic = async (req, res) => {
  try {
    const q = "DELETE FROM Clinics WHERE ClinicID = ?";
    const [result] = await db.query(q, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Clinic cannot be found" });
    }

    res.json({ message: "Clinic deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while deleting clinic" });
  }
};