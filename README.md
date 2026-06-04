# Vocabulário Diário

Aplicação React/Vite para aprender uma palavra nova em português todos os dias.

## Regras de negócio da primeira versão

- Exibir uma palavra nova por dia.
- Permitir configurar o horário de troca da palavra.
- Manter a palavra anterior até o horário configurado ser atingido.
- Exibir palavra, significado, origem e aplicação em uma frase.
- Persistir o horário configurado no `localStorage` do navegador.
- Funcionar sem backend, permitindo publicação no GitHub Pages.

## Como executar localmente

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
```

## Publicação no GitHub Pages

Este projeto já inclui o workflow:

```txt
.github/workflows/deploy.yml
```

Depois de subir os arquivos para a branch `main`, vá em:

```txt
Settings > Pages > Build and deployment > Source > GitHub Actions
```

A URL esperada será:

```txt
https://edriansds.github.io/vocabulario-diario/
```

## Onde cadastrar novas palavras

Edite o arquivo:

```txt
src/data/words.js
```

Cada palavra deve seguir este formato:

```js
{
  word: "Efêmero",
  meaning: "Aquilo que dura pouco tempo; passageiro, transitório.",
  origin: "Do grego ephémeros, que significa 'que dura apenas um dia'.",
  example: "A empolgação inicial foi efêmera, mas deixou uma boa lembrança."
}
```

## Próximos passos

Buscar palavras automaticamente, sem a necessidade de inserir palavras manualmente em arquivo word.js.
