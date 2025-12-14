"use client";

import { useState, useEffect } from "react";

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const [likes, setLikes] = useState<number>(0);

  // Chave única no localStorage baseada no title
  const storageKey = `likes_${title.replace(/\s+/g, "_").toLowerCase()}`;

  // Carregar likes do localStorage ao montar
  useEffect(() => {
    const savedLikes = localStorage.getItem(storageKey);
    if (savedLikes) {
      setLikes(parseInt(savedLikes, 10));
    }
  }, [storageKey]);

  // Salvar no localStorage sempre que likes mudar
  useEffect(() => {
    localStorage.setItem(storageKey, likes.toString());
  }, [likes, storageKey]);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <button
      onClick={handleLike}
      className="mt-4 flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
      aria-label={`Dar like em ${title}`}
    >
      <span className="text-xl">❤️</span>
      <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
    </button>
  );
}