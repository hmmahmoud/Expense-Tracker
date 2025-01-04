// import express from "express";
// import db from "../db/databases.js";
// import { Parser } from "json2csv";
// import ExcelJS from "exceljs"


const express = require('express');
const db = require('../db/databases.js');
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');

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

router.get("/export/csv",  (req, res) => {
    const sql = `SELECT * FROM expenses`;
    db.all(sql, [], (err, rows) => {
        if(err) {
            console.error("Error exporting data to CSV:", err.message);
            return res.status(500).send({error: "Failed to export data" });
        }
        const fields = ["id", "category", "amount", "description", "date"];
        const parser = new Parser({ fields });
        const csv = parser.parse(rows);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachement; filename=expenses.csv");
        res.send(csv);
    });
});

// router.get("/export/xls",  (req, res) => {
//     const sql = `SELECT * FROM expenses`;
//     db.all(sql, [], async (err, rows) => {
//         if(err) {
//             console.error("Error exporting data to XLS:", err.message);
//             return res.status(500).send({error: "Failed to export data" });
//         }
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet("Expenses");

//         worksheet.columns = [
//             { header: "ID", key: "id", width: 10 },
//             { header: "Category", key: "category", width: 20 },
//             { header: "Amount", key: "amount", width: 10 },
//             { header: "Description", key: "description", width: 30 },
//             { header: "Date", key: "date", width: 15 },
//         ];

//         rows.forEach((row) => {
//             worksheet.addRow(row);
//         });

//         res.setHeader("Content-Type", "text/csv");
//         res.setHeader("Content-Disposition", "attachement; filename=expenses.xlsx");

//         await workbook.xlsx.write(res);
//         res.end();
//     });
// });

module.exports = router;