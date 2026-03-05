// pages/api/links.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";

// Conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "linkdb",
});

// API handler para manejar solicitudes GET y POST
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Obtener todos los enlaces (GET)
    if (req.method === "GET") {
        db.query("SELECT * FROM links", (err, results) => {
            if (err)
                return res.status(500).json({ error: "Error fetching links" });
            res.status(200).json(results); // Devuelve los enlaces
        });
    }

    // Agregar un nuevo enlace (POST)
    else if (req.method === "POST") {
        const { url, description } = req.body;
        db.query(
            "INSERT INTO links (url, description) VALUES (?, ?)",
            [url, description],
            (err, results) => {
                if (err)
                    return res
                        .status(500)
                        .json({ error: "Error adding the link" });
                res.status(201).json({
                    id: (results as mysql.ResultSetHeader).insertId, // ID del nuevo enlace
                    url,
                    description,
                });
            },
        );
    } else {
        res.status(405).json({ error: "Method not allowed" }); // Si el método no es GET ni POST
    }
}
