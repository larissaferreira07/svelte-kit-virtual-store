cat << EOF > README.md
# Svelte Kit Virtual Store

Este é um projeto de e-commerce desenvolvido com SvelteKit, demonstrando uma loja virtual com funcionalidades básicas.

## Características

- Listagem de produtos
- Carrinho de compras
- Checkout
- Integração com Supabase para armazenamento de dados
- Design responsivo com Tailwind CSS

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (normalmente vem com Node.js)
- Conta no Supabase para armazenamento de dados

## Instalação

1. Clone o repositório:
   \`\`\`
   git clone https://github.com/larissaferreira07/svelte-kit-virtual-store.git
   cd svelte-kit-virtual-store
   \`\`\`

2. Instale as dependências:
   \`\`\`
   npm install
   \`\`\`

3. Crie um arquivo \`.env\` na raiz do projeto e adicione suas credenciais do Supabase:
   \`\`\`
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   \`\`\`

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

\`\`\`
npm run dev
\`\`\`

Acesse \`http://localhost:5173\` no seu navegador para ver a aplicação.

## Construção

Para criar uma versão de produção do site:

\`\`\`
npm run build
\`\`\`

## Estrutura do Projeto

- \`src/routes\`: Contém as rotas da aplicação
- \`src/lib/components\`: Componentes reutilizáveis
- \`src/lib/stores\`: Stores Svelte para gerenciamento de estado
- \`src/lib/utils\`: Funções utilitárias
- \`static\`: Arquivos estáticos como imagens

## Tecnologias Utilizadas

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)