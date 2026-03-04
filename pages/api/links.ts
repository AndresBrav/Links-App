// pages/api/links.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "linkdb",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

interface Link {
    id: number;
    url: string;
    description: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        db.query("SELECT * FROM links", (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error fetching links" });
                return;
            }
            res.status(200).json(results);
        });
    } else if (req.method === "POST") {
        const { url, description } = req.body;
        db.query(
            "INSERT INTO links (url, description) VALUES (?, ?)",
            [url, description],
            (err, results) => {
                if (err) {
                    res.status(500).json({ error: "Error adding the link" });
                    return;
                }

                // Asegúrate de acceder a insertId desde el resultado correcto
                const insertId = (results as mysql.ResultSetHeader).insertId;

                res.status(201).json({
                    id: insertId, // Aquí accedemos correctamente a insertId
                    url,
                    description,
                });
            },
        );
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
