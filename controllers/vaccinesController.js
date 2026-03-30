import { db } from "../db.js";

export const getVaccines = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vaccines");
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
};

export const addVaccine = async (req, res) => {
    try {
        const q = "INSERT INTO vaccines (`VaccineName`, `VaccineCost`) VALUES (?)";
        const values = [req.body.VaccineName, req.body.VaccineCost];

        await db.query(q, [values]);
        res.json("Vaccine added successfully");
    } catch (err) {
        res.json(err);
    }
};

export const getVaccineById = async (req, res) => {
    try {
        const q = "SELECT * FROM vaccines WHERE VaccineID = ?";
        const [rows] = await db.query(q, [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        res.json(err);
    }
};

export const updateVaccine = async (req, res) => {
    try {
        const q = "UPDATE vaccines SET VaccineName = ?, VaccineCost = ? WHERE VaccineID = ?";
        const values = [req.body.VaccineName, req.body.VaccineCost, req.params.id];

        await db.query(q, values);
        res.json("Vaccine updated successfully");
    } catch (err) {
        res.json(err);
    }
};

export const deleteVaccine = async (req, res) => {
    try {
        const q = "DELETE FROM vaccines WHERE VaccineID = ?";
        await db.query(q, [req.params.id]);
        res.json("Vaccine deleted successfully");
    } catch (err) {
        res.json(err);
    }
};