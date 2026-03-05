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
        // const data = await res.json();
        // console.log(data);


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
                            className="w-3/4 block min-w-0 grow bg-gray-600 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                            type="text"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <br />
                        <br />

                        <div>
                            <label
                                htmlFor="message" // Cambiado de 'for' a 'htmlFor'
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Description
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-3/4 p-3.5 shadow-xs placeholder:text-body"
                                placeholder="Write your description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <br />
                        <br />

                        <button
                            type="submit"
                            className="text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-3xl text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55 pl-12 pr-12 ml-5"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
