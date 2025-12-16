# Guia de Preparação para a Defesa do Projeto DEISI Shop

## 1. Rotas Dinâmicas

### O que é uma rota dinâmica? (Explicação para crianças)
Imagina que o teu site é uma casa com quartos. Cada quarto tem um número, como quarto 1, quarto 2. Uma rota dinâmica é como um quarto que muda dependendo do número que escolhes. Por exemplo, em vez de ter uma página fixa para cada produto, tens uma página "mágica" que mostra o produto certo baseado no ID (número) que clicas. Isso é super útil para lojas, porque não precisas criar 100 páginas para 100 produtos — uma só página faz tudo!

### Por que é importante para a defesa?
Na defesa, podem pedir para criar uma rota nova para algo como "detalhes de uma categoria" ou "edição de produto". Mostra que sabes usar IDs para páginas personalizadas.

### Como funciona no teu código atual?
No teu projeto, já tens uma rota dinâmica para detalhes de produto: `app/produtos/[id]/page.tsx`. O `[id]` significa que é dinâmica. Quando clicas em "+info" num produto com ID 1, vai para `/produtos/1`. O código pega o ID com `params.id` e mostra os detalhes.

Onde está:
- Ficheiro: `app/produtos/[id]/page.tsx`
- Linha aproximada: 10-20, onde usa `params` para pegar o ID.

### Exemplo: Como criar uma nova rota dinâmica (para detalhes de categoria)
Suponha que queres uma rota para detalhes de categoria, como `/categorias/[categoriaId]`.

Passo 1: Cria uma pasta nova em `app`: `app/categorias/[categoriaId]`.

Passo 2: Cria o ficheiro `page.tsx` dentro dessa pasta.

Passo 3: Copia e cola este código (exemplo simples que mostra "Detalhes da categoria ID X"):

```tsx
export default async function CategoriaDetalhePage({ params }: { params: Promise<{ categoriaId: string }> }) {
  const { categoriaId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Detalhes da Categoria {categoriaId}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Aqui podes mostrar produtos ou info da categoria com ID {categoriaId}.
        </p>
        <Link href="/categorias" className="inline-block mt-8 text-blue-600 hover:underline font-semibold">
          ← Voltar às categorias
        </Link>
      </div>
    </div>
  );
}
```

Passo 4: Para testar, adiciona um link na página de categorias (ex.: em `app/loja/categorias/page.tsx`):

```tsx
<Link href={`/categorias/${cat.id}`}>
  <div className="...">  // O card existente
    {cat.nome}
  </div>
</Link>
```

Exemplo de uso: Clica na categoria "roupa" (ID "roupa"), vai para `/categorias/roupa` e mostra detalhes.

### Como mudar o teu código existente (exemplo: adicionar mais info na rota dinâmica de produto)
No `app/produtos/[id]/page.tsx`, para adicionar um botão extra ou texto:

- Linha 40 (aprox.), dentro do return, adiciona:

```tsx
<p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
  Exemplo de texto extra: Este produto tem {produto.rating.count} avaliações!
</p>
```

Isso muda a página de detalhes sem quebrar nada.

### Dicas para a defesa
Se perguntarem: "Cria uma rota dinâmica para comentários de produto", diz: "Crio pasta [comentarioId] em app/produtos/[id]/comentarios/[comentarioId], uso params para pegar ID e mostro dados."

## 2. Mais Filtros para a Loja

### O que é um filtro na loja? (Explicação para crianças)
Imagina a loja como uma caixa de brinquedos. Um filtro é como dizer "mostra só os brinquedos vermelhos" ou "só os caros". No teu site, já tens filtro por nome (pesquisa). Mais filtros significam opções extras, como por preço ou categoria, para o utilizador encontrar o que quer rápido.

### Por que é importante para a defesa?
Podem pedir para adicionar filtros novos, como "por preço abaixo de X" ou "por rating alto". Mostra que sabes manipular dados com JavaScript.

### Como funciona no teu código atual?
No `app/produtos/page.tsx`, tens filtro por nome com `search` e `useEffect` que filtra a lista. A ordenação é uma espécie de filtro também.

Onde está:
- Ficheiro: `app/produtos/page.tsx`
- Linha aproximada: 30-50, no useEffect com filtered = data.filter(...).

### Exemplo: Adicionar filtro por categoria
Passo 1: Adiciona um novo estado para categoria selecionada (depois do [sortOption]):

```tsx
const [categoryFilter, setCategoryFilter] = useState<string>("all");
```

Passo 2: Adiciona um <select> para categorias (depois do input de pesquisa):

```tsx
<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="all">Todas categorias</option>
  <option value="roupa">Roupa</option>
  <option value="acessorios">Acessórios</option>
  <option value="canecas">Canecas</option>
</select>
```

Passo 3: Atualiza o useEffect para aplicar o filtro de categoria (dentro do filtered = ...):

```tsx
if (categoryFilter !== "all") {
  filtered = filtered.filter((produto) => produto.category.toLowerCase() === categoryFilter.toLowerCase());
}
```

Exemplo de uso: Seleciona "Canecas", só mostra canecas.

### Como mudar o teu código existente (exemplo: filtro por preço abaixo de 50€)
Passo 1: Adiciona estado [maxPrice, setMaxPrice] = useState<number>(Infinity);

Passo 2: Adiciona input: <Input type="number" placeholder="Preço máximo" onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)} />

Passo 3: No useEffect, adiciona: filtered = filtered.filter((produto) => Number(produto.price) <= maxPrice);

Isso muda o filtro para mostrar só produtos baratos.

### Dicas para a defesa
Se perguntarem: "Adiciona filtro por rating acima de 4 estrelas", diz: "Adiciono estado [minRating, setMinRating] = useState(0); input para número, e no filter: produto.rating.rate >= minRating."

## 3. Botão para Adicionar Tudo ao Carrinho

### O que é este botão? (Explicação para crianças)
Imagina que queres pegar todos os brinquedos vermelhos de uma só vez e pô-los na tua mochila (carrinho). Este botão faz isso: adiciona todos os produtos filtrados (ex.: todas as canecas depois de pesquisar "caneca") ao carrinho com um clique.

### Por que é importante para a defesa?
Na última defesa, tiveram algo similar. Mostra que sabes manipular listas e estados.

### Como funciona no teu código atual?
O carrinho usa `useCart` com `addToCart`. Não tem botão "Adicionar tudo" ainda.

Onde adicionar: Em `app/produtos/page.tsx`, depois da grelha de produtos.

### Exemplo: Criar botão "Adicionar Todos ao Carrinho"
Passo 1: Importa useCart no topo: import { useCart } from '@/hooks/useCart';

Passo 2: Desestrutura addToCart: const { addToCart } = useCart();

Passo 3: Adiciona botão depois do <h2> "Produtos disponíveis":

```tsx
<Button
  variant="secondary"
  onClick={() => displayData.forEach((produto) => addToCart(produto))}
  className="mb-6"
>
  Adicionar todos ao carrinho
</Button>
```

Exemplo de uso: Pesquisa "caneca", clica no botão, adiciona todas as canecas filtradas ao carrinho.

### Exemplo para criar mais botões e funções (ex.: "Limpar Filtros" e "Exportar Lista")
Passo 1: Botão "Limpar Filtros" (depois do select):

```tsx
<Button variant="ghost" onClick={() => { setSearch(""); setSortOption('name-asc'); }}>
  Limpar filtros
</Button>
```

Passo 2: Botão "Exportar Lista para JSON" (depois da grelha):

```tsx
<Button variant="outline" onClick={() => {
  const json = JSON.stringify(displayData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'produtos.json';
  a.click();
}}>
  Exportar lista
</Button>
```

Onde mudar: No return, dentro do <div className="max-w-7xl mx-auto">, adiciona os botões em lugares lógicos (ex.: acima da grelha para "Adicionar todos").

### Dicas para a defesa
Se perguntarem: "Cria botão para adicionar filtrados por preço", diz: "Uso displayData (já filtrado) no onClick, forEach addToCart(produto)."

## 4. Editar Mensagens Finais ou Adicionar Parte Extra

### O que é editar mensagens finais? (Explicação para crianças)
As mensagens finais são como o "fim da história" depois de comprar. Editar é mudar o texto que aparece (ex.: "Compra feita!" para "Obrigado por comprar, volta sempre!"). Adicionar parte extra é como pôr um brinde, tipo um novo input para email ou nota.

### Por que é importante para a defesa?
Podem pedir para personalizar mensagens ou adicionar campos extras na compra.

### Como funciona no teu código atual?
No `handleBuy`, tens setBuyResponse com mensagem. Onde está: Linha 150-200 em `app/produtos/page.tsx`, no handleBuy.

### Exemplo: Editar mensagem de sucesso/erro
No setBuyResponse de sucesso: message: result.message || "Compra feita com sucesso! Parabéns!"

De erro: message: error.message || "Algo deu errado, tenta de novo!"

Onde mudar: No try/catch do handleBuy.

### Exemplo para adicionar parte extra (input para nome ou nota)
Passo 1: Adiciona estado [note, setNote] = useState("");

Passo 2: Adiciona input no formulário de compra (depois do cupão):

```tsx
<label htmlFor="note" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
  Nota extra
</label>
<Input
  id="note"
  type="text"
  placeholder="Adicione uma nota para a compra"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  className="max-w-sm"
 />
```

Passo 3: No body do fetch, adiciona: note: note.trim() || "",

Onde mudar: No body JSON do handleBuy.

### Dicas para a defesa
Se perguntarem: "Adiciona input para email", diz: "Crio estado [email, setEmail], input type='email', adiciono no body { email: email }."

## 5. Instruções para Interagir com a API

### O que é interagir com a API? (Explicação para crianças)
A API é como um amigo que guarda brinquedos e te dá quando pedes. Interagir é pedir (GET para ver) ou enviar (POST para comprar).

### Como funciona a API DEISI Shop
URL base: https://deisishop.pythonanywhere.com/

Endpoint principal: /products (GET para lista de produtos).

Endpoint de compra: /buy (POST com body JSON: { products: [IDs], student: true/false, coupon: "código" }).

### Exemplo: Pedir lista de produtos (GET)
Em código (no fetcher):

```tsx
fetch('https://deisishop.pythonanywhere.com/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

Onde mudar: No useSWR, é isso que faz.

### Exemplo: Comprar produtos (POST)
Em código (no handleBuy):

```tsx
fetch('https://deisishop.pythonanywhere.com/buy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ products: [1, 2], student: true, coupon: 'DESC10' })
})
  .then(response => response.json())
  .then(result => console.log(result.message))
  .catch(error => console.log(error));
```

Onde mudar: No handleBuy do carrinho.

### Dicas para a defesa
Se perguntarem: "Adiciona chamada API para novo endpoint", diz: "Crio fetch novo com URL, method POST, body JSON, then json()."

## 6. Tutorial para Criar e Usar Hooks

### O que é um hook? (Explicação para crianças)
Um hook é como uma receita mágica que faz o código "lembrar" coisas (estado) ou fazer ações automáticas (efeitos). É para React/Next.js.

### Passo a passo para criar um hook
Passo 1: Cria pasta `hooks` na raiz (se não tiver).

Passo 2: Cria ficheiro `useMeuHook.ts`.

Passo 3: Importa useState ou useEffect.

Passo 4: Exporta função: export const useMeuHook = () => { const [estado, setEstado] = useState(0); return { estado, setEstado }; }

Passo 5: Usa em componente: const { estado } = useMeuHook();

### Exemplo completo: Hook para contar cliques
Ficheiro: `hooks/useClickCounter.ts`

```ts
import { useState } from "react";

export const useClickCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return { count, increment };
};
```

Uso em página (ex.: adiciona em `app/produtos/page.tsx`):

```tsx
const { count, increment } = useClickCounter();

<Button onClick={increment}>Clicou {count} vezes</Button>
```

Onde mudar: Adiciona o button no return.

### Dicas para a defesa
Se perguntarem: "Cria hook para tema dark/light", diz: "useState para theme, toggle função, persist em localStorage."

## 7. Tutorial para Criar e Usar Models

### O que é um model? (Explicação para crianças)
Um model é como um molde para brinquedos: diz como o brinquedo deve ser (nome, cor, tamanho). No código, é uma interface TypeScript para definir tipos de dados, como Produto.

### Passo a passo para criar um model
Passo 1: Cria pasta `models` na raiz (tu tens!).

Passo 2: Cria ficheiro `meuModel.ts`.

Passo 3: Exporta interface: export interface MeuModel { nome: string; idade: number; }

Passo 4: Usa em código: import { MeuModel } from '@/models/meuModel';

### Exemplo completo: Model para Usuário
Ficheiro: `models/usuario.ts`

```ts
export interface Usuario {
  nome: string;
  email: string;
  idade: number;
}
```

Uso em página (ex.: adiciona em `app/produtos/page.tsx`):

```tsx
const usuario: Usuario = { nome: "João", email: "joao@email.com", idade: 10 };
console.log(usuario.nome);
```

Onde mudar: Adiciona const no componente.

### Dicas para a defesa
Se perguntarem: "Cria model para Encomenda", diz: "interface Encomenda { id: number; produtos: Product[]; total: number; }"

Fim do guia! Estuda devagar, copia códigos e testa no teu site. Boa sorte na defesa!