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
      <h1>Lista de Enlaces</h1>

      {/* Formulario para agregar enlaces */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Agregar Enlace</button>
      </form>

      {/* Mostrar los enlaces */}
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
            <p>{link.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;