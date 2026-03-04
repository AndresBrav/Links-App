// app/page.tsx
"use client";

import { useState, useEffect } from "react";

// Tipo para un enlace
interface Link {
    id: number;
    url: string;
    description: string;
}

const Home = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");

    // Función para cargar los enlaces
    const loadLinks = async () => {
        const res = await fetch("/api/links");
        const fetchedLinks = await res.json();
        setLinks(fetchedLinks);
    };

    // Enviar un nuevo enlace
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, description }),
        });

        if (res.ok) {
            loadLinks(); // Recargar los enlaces
            setUrl("");
            setDescription("");
        }
    };

    // Cargar los enlaces al principio
    useEffect(() => {
        loadLinks();
    }, []);

    return (
        <div>
            <br />
            <div className="flex justify-center">
                <h1 className="text-green-100">Links List</h1>
            </div>
            <br />
            <br />
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    {/* Mostrar los enlaces */}
                    <table className="w-4/5 border-separate border border-gray-400 ...">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 ...">
                                    Link
                                </th>
                                <th className="border border-gray-300 ...">
                                    Description
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {links.map((link, i) => (
                                <tr key={i}>
                                    <td className="border border-gray-300">
                                        {link.url}
                                    </td>
                                    <td className="border border-gray-300">
                                        {link.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>

                <div className="...">
                    {/* Formulario para agregar enlaces */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <br />
                        <br />
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <br />
                        <br />
                        <button type="submit">Save link</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
