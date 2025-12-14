"use client";

import { useState, useEffect } from "react";

export default function Relogio() {
  const [horaAtual, setHoraAtual] = useState<string>("");

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      const horas = String(agora.getHours()).padStart(2, "0");
      const minutos = String(agora.getMinutes()).padStart(2, "0");
      const segundos = String(agora.getSeconds()).padStart(2, "0");
      setHoraAtual(`${horas}:${minutos}:${segundos}`);
    };

    // Atualiza imediatamente ao montar
    atualizarHora();

    // Atualiza a cada segundo
    const intervalId = setInterval(atualizarHora, 1000);

    // Limpeza ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Hora atual: <span className="font-mono text-base">{horaAtual}</span>
    </div>
  );
}