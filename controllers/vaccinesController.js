import { db } from "../db/js";
export const getVaccines = (req, res) => {
    const q = "SELECT * FROM vaccines";

    db.querry(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const addVaccine = (req, res) => {
    const q ="INSERT INTO vaccines ('name', 'description') VALUES (?)";

    const values =[
        req.body.name,
        req.body.description
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Vaccine added successfully");
    });
};