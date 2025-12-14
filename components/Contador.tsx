"use client";

import { useState, useEffect } from "react";

export default function Contador() {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  // Carregar valor inicial do localStorage ao montar o componente
  useEffect(() => {
    const savedCount = localStorage.getItem("contadorValue");
    const savedHistory = localStorage.getItem("contadorHistory");

    if (savedCount) {
      const value = parseInt(savedCount, 10);
      if (!isNaN(value) && value >= 0 && value <= 10) {
        setCount(value);
      }
    }

    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } catch (e) {
        // Em caso de erro no JSON, ignora
      }
    }
  }, []);

  // Atualizar localStorage sempre que count ou history mudarem
  useEffect(() => {
    localStorage.setItem("contadorValue", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("contadorHistory", JSON.stringify(history));
  }, [history]);

  const updateCount = (newValue: number) => {
    const clampedValue = Math.max(0, Math.min(10, newValue));
    setCount(clampedValue);
    setHistory((prev) => [...prev, clampedValue]);
  };

  const increment = () => updateCount(count + 1);
  const decrement = () => updateCount(count - 1);
  const reset = () => updateCount(0);

  // Determinar cor com base no intervalo
  const getColorClass = () => {
    if (count <= 3) return "text-red-600 dark:text-red-400";
    if (count <= 7) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-10 text-center border border-gray-200 dark:border-gray-700">
      <div className="mb-10">
        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
          Valor atual:
        </p>
        <p className={`text-7xl font-bold ${getColorClass()} transition-colors duration-300`}>
          {count}
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={decrement}
          className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md"
          disabled={count === 0}
        >
          Decrementar
        </button>
        <button
          onClick={reset}
          className="px-8 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors shadow-md"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md"
          disabled={count === 10}
        >
          Incrementar
        </button>
      </div>

      <div className="text-left">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Histórico de valores:
        </p>
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Ainda não houve alterações.
          </p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
            {history.map((value, index) => (
              <li
                key={index}
                className={`text-lg ${getColorClassForValue(value)}`}
              >
                {index + 1}. {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Função auxiliar para cor no histórico (reutiliza a lógica de cor)
function getColorClassForValue(value: number): string {
  if (value <= 3) return "text-red-600 dark:text-red-400";
  if (value <= 7) return "text-yellow-600 dark:text-yellow-400";
  return "text-green-600 dark:text-green-400";
}