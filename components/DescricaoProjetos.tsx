import Projeto from "./Projeto";

export default function DescricaoProjetos() {
  return (
    <div>
      <p className="mb-4">
        Aqui pode encontrar alguns dos projetos que desenvolvi durante a
        disciplina. Para ver todos os meus projetos, visite o meu
        <a
          href="https://teu-github-pages.github.io"
          target="_blank"
          className="text-blue-600 underline ml-1"
        >
          GitHub Pages
        </a>.
      </p>

      <h3 className="text-xl font-semibold mb-3">Projetos desenvolvidos:</h3>

      <Projeto
        nome="Loja Online"
        url="https://ideal-orbit-r4xpgwx6rwwrhxwqq-5502.app.github.dev/Lab7/index.html"
      />

      <Projeto
        nome="Website com JavaScript Interativo"
        url="https://ideal-orbit-r4xpgwx6rwwrhxwqq-5502.app.github.dev/Lab5/index.html"
      />

      <Projeto
        nome="Outro Projeto"
        url="https://ideal-orbit-r4xpgwx6rwwrhxwqq-5502.app.github.dev/#projetos"
      />
    </div>
  );
}
