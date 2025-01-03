import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/expenses.db", (err) => {
    if(err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(
            `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            amount REAL,
            description TEXT,
            date TEXT
            )`,
            (err) => {
                if(err) {
                    console.error("Error creating table:", err.message);
                }
            }
        );
    }
});
export default db;