"use client";

import { useState } from "react";

interface Tarefa {
  id: number;
  texto: string;
  categoria: string;
}

const categorias = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "API RESTful",
  "GitHub",
  "Vercel",
];

export default function GestaoTarefas() {
  const [inputTexto, setInputTexto] = useState<string>("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(categorias[0]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState<string>("");

  const adicionarTarefa = () => {
    if (inputTexto.trim() === "") return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
      texto: inputTexto.trim(),
      categoria: categoriaSelecionada,
    };

    setTarefas([...tarefas, novaTarefa]);
    setInputTexto("");
  };

  const iniciarEdicao = (tarefa: Tarefa) => {
    setEditandoId(tarefa.id);
    setTextoEdicao(tarefa.texto);
  };

  const salvarEdicao = () => {
    if (textoEdicao.trim() === "" || editandoId === null) return;

    setTarefas(
      tarefas.map((t) =>
        t.id === editandoId ? { ...t, texto: textoEdicao.trim() } : t
      )
    );
    setEditandoId(null);
    setTextoEdicao("");
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setTextoEdicao("");
  };

  const apagarTarefa = (id: number) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700">
      {/* Input de texto com visualização imediata */}
      <div className="mb-10">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Texto digitado (atualiza em tempo real):
        </label>
        <input
          type="text"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          placeholder="Escreva algo aqui..."
          className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        />
        <p className="mt-4 text-2xl text-center text-gray-700 dark:text-gray-300">
          {inputTexto === "" ? (
            <span className="text-gray-400 italic">Nada digitado ainda.</span>
          ) : (
            inputTexto
          )}
        </p>
      </div>

      {/* Seletor de categoria e adição de tarefa */}
      <div className="mb-10">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Categoria da tarefa:
        </label>
        <div className="flex gap-4">
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={adicionarTarefa}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Adicionar Tarefa
          </button>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Lista de Tarefas ({tarefas.length})
        </h2>
        {tarefas.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic text-center">
            Ainda não há tarefas. Adicione uma acima.
          </p>
        ) : (
          <ul className="space-y-4">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  {editandoId === tarefa.id ? (
                    <input
                      type="text"
                      value={textoEdicao}
                      onChange={(e) => setTextoEdicao(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {tarefa.texto}
                      </span>
                      <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                        [{tarefa.categoria}]
                      </span>
                    </>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {editandoId === tarefa.id ? (
                    <>
                      <button
                        onClick={salvarEdicao}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicao(tarefa)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => apagarTarefa(tarefa.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Apagar
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}