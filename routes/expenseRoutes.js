import express from "express";
import db from "../db/databases.js";

const router = express.Router();

router.post("/", (req, res) => {
    const {category, amount, description, date} = req.body;
    console.log(category);
    //  console.log(req.body);
    const sql = `INSERT INTO expenses (category, amount, description, date) VALUES (?, ?, ?, ?)`;
    db.run(sql, [category, amount, description, date], function (err) {
        if(err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

router.get("/", (req, res) => {
    // const {category, amount, description, date} = req.body;
    const sql = `SELECT * FROM expenses`;
    db.all(sql, [], function (err, rows) {
        if(err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

// router.put
router.put("/:id", (req, res) => {
    const {category, amount, description, date} = req.body;
    const sql = `UPDATE expenses SET category = ?, amount = ?, description = ?, date = ? WHERE id = ?`;
    db.run(sql, [category, amount, description, date, req.params.id], function (err) {
        if(err) return res.status(500).send(err.message);
        res.send( {changes: this.changes, message: "Expense updated successfully!" });
    });
});

router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM expenses WHERE id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if(err) return res.status(500).send(err.message);
        res.send( {changes: this.changes, message: "Expense deleted successfully!" });
    });
});
export default router;