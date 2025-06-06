# Documentação do Projeto Next.js

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Estrutura Atual do Projeto](#-estrutura-atual-do-projeto)
5. [Estrutura Completa (Referência Futura)](#-estrutura-completa-referência-futura)
6. [Convenções de Código](#convenções-de-código)
7. [Tecnologias Utilizadas](#tecnologias-utilizadas)
8. [Scripts Disponíveis](#scripts-disponíveis)
9. [Arquitetura e Conceitos](#arquitetura-e-conceitos)
10. [Testes](#testes)
11. [📚 Exemplos Práticos](#-exemplos-práticos)
12. [Workflows e Boas Práticas](#workflows-e-boas-práticas)

---

## 🎯 Visão Geral

Este é um projeto Next.js moderno utilizando o App Router e TypeScript. O projeto segue uma arquitetura bem definida com separação clara de responsabilidades e convenções consistentes de código.

### Características Principais

- ⚡ **Next.js** com App Router e Turbopack
- 🎨 **Tailwind CSS** para estilização
- 📱 **TypeScript** para tipagem robusta
- 🗃️ **Zustand** para gerenciamento de estado global
- 🧪 **Jest + Testing Library** para testes
- 📏 **ESLint + Prettier** para qualidade de código
- 🎯 **Conventional Commits** para versionamento
- 🏗️ **Estrutura escalável** - Preparada para crescimento

---

## ✅ Pré-requisitos

- **nvm** (Node Version Manager) para gerenciar versões do Node.js
- **Node.js** (versão especificada no `.nvmrc`)
- **npm** para gerenciamento de pacotes
- **Git** para controle de versão

---

## 🚀 Instalação e Configuração

### 1. Clone e Setup Inicial

```bash
# Clone o repositório
git clone [url-do-repositorio]
cd [nome-do-projeto]

# Use a versão correta do Node.js
nvm use

# Instale as dependências
npm install
```

### 2. Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Database (se necessário)
DATABASE_URL=postgresql://...

# Authentication (se usando NextAuth)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Primeiro Start

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

---

## 📁 Estrutura Atual do Projeto

Esta é a estrutura **real do template starter** - exatamente o que você encontrará ao clonar o projeto:

```
/app
├── (routes)/                    # 🗂️ Rotas da aplicação
│   ├── (auth)/                  # 🔒 Rotas autenticadas (ainda não implementado)
│   │   └── .placeholder         # Criar quando adicionar autenticação
│   ├── api/                     # 🔌 API Routes (ainda não implementado)
│   │   └── .placeholder         # Criar quando adicionar endpoints
│   └── (public)/                # 🌐 Rotas públicas
│       ├── (home)/              # 🏠 Página inicial
│       │   └── page.tsx         # PageHome (usa ViewHome)
│       ├── sample-1/            # 📄 Página de exemplo
│       │   └── page.tsx         # PageSample1 (usa ViewSample1)
│       └── layout.tsx           # Layout para páginas públicas
├── components/                  # 🧩 Componentes (preparado para uso)
│   ├── structure/              # 🏗️ Componentes estruturais
│   │   └── .placeholder        # Pasta vazia (pronta para usar)
│   └── ui/                     # 🎨 Componentes de interface
│       └── .placeholder        # Pasta vazia (pronta para usar)
├── constants/                   # 📊 Constantes da aplicação
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── hooks/                       # 🎣 Custom hooks
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── services/                    # 🔧 Serviços e APIs
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── stores/                      # 🗃️ Stores de estado
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── styles/                      # 🎨 Estilos globais
│   └── globals.css              # Estilos globais (Tailwind CSS)
├── typings/                     # 📝 Tipos globais
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── utils/                       # 🛠️ Funções utilitárias
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── views/                       # 📱 Views implementadas
│   ├── home/                   # 🏠 View da página inicial
│   │   ├── home.test.tsx       # Testes da view
│   │   ├── home.tsx            # Componente ViewHome
│   │   └── index.ts            # Exportação
│   └── sample-1/               # 📄 View de exemplo
│       ├── index.ts            # Exportação
│       ├── sample-1.test.tsx   # Testes da view
│       └── sample-1.tsx        # Componente ViewSample1
├── favicon.ico                  # 🌐 Favicon principal (App Router)
└── layout.tsx                   # Layout raiz da aplicação

/public/                          # 📁 Arquivos estáticos (vazia no template)
└── .placeholder                  # Arquivo temporário (remover ao usar)
```

> 📝 **Sobre os arquivos `.placeholder`**: São arquivos temporários para manter as pastas no Git. Remova-os quando começar a adicionar conteúdo real nas pastas.

### 🎯 O que está implementado

- ✅ **2 páginas funcionais** - Home e Sample-1
- ✅ **Layout básico** - Estrutura de rotas públicas
- ✅ **2 views completas** - Com testes e exportações
- ✅ **Estrutura preparada** - Pastas organizadas com `.placeholder`
- ✅ **Configurações completas** - ESLint, Prettier, Jest, Husky
- ✅ **TypeScript configurado** - Com paths aliases (@/)
- ✅ **Tailwind CSS** - Com configuração customizada
- ⏳ **Pasta /public/ vazia** - Pronta para adicionar assets conforme necessário
- ⏳ **Rotas (auth) e api/** - Estrutura preparada com placeholders

### 📋 Próximos passos

À medida que o projeto cresce, você pode:

1. **Adicionar componentes** em `/components/ui/` e `/components/structure/`
2. **Criar novas views** em `/views/[nome-da-view]/`
3. **Implementar stores globais** em `/stores/` usando Zustand (já configurado)
4. **Adicionar services** em `/services/` para APIs
5. **Criar hooks específicos** usando sufixo `.hook.ts` em views/components conforme necessário (ver exemplos na documentação)
6. **Adicionar hooks globais** em `/hooks/` para lógica reutilizável
7. **Organizar arquivos estáticos** em `/public/` criando subpastas como `/images/`, `/icons/`, `/documents/`
8. **Remover `.placeholder`** conforme usa as pastas

---

## 🚀 Estrutura Completa

Esta é uma **estrutura avançada de referência** para quando o projeto estiver mais completo mantendo a organização escalável:

```
/app
├── (routes)/                     # 🗂️ Todas as rotas da aplicação
│   ├── api/                      # 🔌 API Routes (endpoints)
│   │   └── example/
│   │       └── route.ts
│   ├── (auth)/                   # 🔒 Rotas protegidas (com auth)
│   │   ├── sample-3/             # 📄 Páginas protegidas
│   │   │   ├── page.tsx
│   │   │   └── queries.ts        # 🔍 Queries da rota
│   │   ├── sample-4/
│   │   │   ├── page.tsx
│   │   │   └── queries.ts        # 🔍 Queries da rota
│   │   └── layout.tsx            # Layout para rotas autenticadas
│   └── (public)/                 # 🌐 Rotas públicas (sem auth)
│       ├── (home)/               # 🏠 Página inicial
│       │   ├── error.tsx         # Error UI
│       │   ├── loading.tsx       # Loading UI
│       │   ├── page.tsx          # Página principal
│       │   └── queries.ts        # 🔍 Queries específicas desta rota
│       ├── sample-1/             # 📄 Outras páginas públicas
│       │   ├── page.tsx
│       │   └── queries.ts        # 🔍 Queries da rota
│       ├── sample-2/
│       │   ├── page.tsx
│       │   └── queries.ts        # 🔍 Queries da rota
│       └── layout.tsx            # Layout para rotas públicas
├── components/                   # 🧩 Componentes reutilizáveis
│   ├── structure/                # 🏗️ Componentes estruturais
│   │   ├── footer/
│   │   ├── header/
│   │   └── sidebar/
│   └── ui/                       # 🎨 Componentes de interface
│       ├── button/
│       │   ├── button.test.tsx
│       │   ├── button.tsx
│       │   ├── button.type.ts
│       │   ├── button.hook.ts   # 🎣 Hook específico (opcional)
│       │   ├── button.const.ts  # 📊 Constantes (opcional)
│       │   └── index.ts
│       ├── input/
│       └── modal/
├── constants/                    # 📊 Constantes da aplicação
├── hooks/                        # 🎣 Custom hooks reutilizáveis
│   ├── use-api/
│   │   ├── use-api.test.ts
│   │   ├── use-api.ts
│   │   ├── use-api.type.ts
│   │   ├── use-api.const.ts     # 📊 Constantes (opcional)
│   │   └── index.ts
│   └── use-local-storage/
├── services/                     # 🔧 Serviços e integrações de API
│   ├── auth/
│   │   ├── auth.test.ts
│   │   ├── auth.ts
│   │   ├── auth.type.ts
│   │   ├── auth.hook.ts         # 🎣 Hook específico (opcional)
│   │   ├── auth.const.ts        # 📊 Constantes (opcional)
│   │   └── index.ts
│   └── api/
├── stores/                       # 🗃️ Estados globais (Zustand)
│   └── user/
│       ├── user.test.ts
│       ├── user.ts
│       ├── user.type.ts
│       ├── user.hook.ts         # 🎣 Hook específico (opcional)
│       ├── user.const.ts        # 📊 Constantes (opcional)
│       └── index.ts
├── styles/                       # 🎨 Estilos globais e temas
├── typings/                      # 📝 Definições de tipos globais
├── utils/                        # 🛠️ Funções utilitárias
│   └── format-date/
│       ├── format-date.test.ts
│       ├── format-date.ts
│       ├── format-date.type.ts
│       ├── format-date.const.ts # 📊 Constantes (opcional)
│       └── index.ts
├── views/                        # 📱 Views/estruturas de páginas
│   ├── home/                     # 🏠 Página inicial (public)
│   │   ├── home.test.tsx
│   │   ├── home.tsx
│   │   ├── home.type.ts
│   │   ├── home.hook.ts         # 🎣 Hook específico (opcional)
│   │   ├── home.const.ts        # 📊 Constantes (opcional)
│   │   └── index.ts
│   ├── sample-1/                 # 📄 Sample 1 (public)
│   ├── sample-2/                 # 📄 Sample 2 (public)
│   ├── sample-3/                 # 🔒 Sample 3 (auth)
│   └── sample-4/                 # 🔒 Sample 4 (auth)
├── favicon.ico                   # 🌐 Favicon principal (App Router)
└── layout.tsx                    # Layout raiz da aplicação

/public/                          # 📁 Arquivos estáticos (raiz do projeto)
├── documents/                    # 📄 PDFs, documentos para download
├── icons/                        # 🎯 Ícones e favicons
├── images/                       # 🖼️ Imagens (logos, ícones, fotos)
├── robots.txt                    # 🤖 Instruções para crawlers
└── sitemap.xml                   # 🗺️ Mapa do site
```

> 💡 **Nota**: Esta é uma estrutura de referência completa. O template inicial vem com pastas vazias e arquivos `.placeholder` que devem ser removidos conforme você adiciona conteúdo real.

### Organização por Funcionalidade

**Todos os módulos** do projeto seguem a mesma estrutura padrão, garantindo consistência total:

#### 📁 Estrutura Padrão de Módulos

```
[nome-do-modulo]/
├── [nome].test.tsx              # 🧪 Testes unitários
├── [nome].tsx                   # 📄 Arquivo principal
├── [nome].type.ts               # 📝 Tipos específicos
├── [nome].hook.ts               # 🎣 Hook específico (opcional)
├── [nome].const.ts              # 📊 Constantes do módulo (opcional)
└── index.ts                     # 📤 Arquivo de exportação
```

Esta estrutura se aplica a:

- 🧩 **components/** (button, modal, card)
- 📱 **views/** (home, profile, dashboard)
- 🔧 **services/** (auth, api, payment)
- 🗃️ **stores/** (user, cart, theme)
- 🎣 **hooks/** (use-api, use-debounce)
- 🛠️ **utils/** (format-date, validate)

#### 🧩 Exemplo: Component

```
button/
├── button.test.tsx              # 🧪 Testes do botão
├── button.tsx                   # 📄 Componente React
├── button.type.ts               # 📝 IButtonProps, TButtonVariant
├── button.hook.ts               # 🎣 useButton (opcional)
├── button.const.ts              # 📊 BUTTON_VARIANTS, BUTTON_SIZES (opcional)
└── index.ts                     # 📤 Exportações
```

#### 🔧 Exemplo: Service

```
auth/
├── auth.test.ts                 # 🧪 Testes do serviço
├── auth.ts                      # 📄 Lógica de autenticação
├── auth.type.ts                 # 📝 IAuthResponse, TAuthStatus
├── auth.hook.ts                 # 🎣 useAuth (opcional)
├── auth.const.ts                # 📊 AUTH_ENDPOINTS, TOKEN_EXPIRY (opcional)
└── index.ts                     # 📤 Exportações
```

#### 🗃️ Exemplo: Store (Zustand)

```
user/
├── user.test.ts                 # 🧪 Testes da store
├── user.ts                      # 📄 Store Zustand
├── user.type.ts                 # 📝 IUserState, TUserActions
├── user.hook.ts                 # 🎣 useUserSelector (opcional)
├── user.const.ts                # 📊 USER_ROLES, DEFAULT_USER (opcional)
└── index.ts                     # 📤 Exportações
```

#### 📱 Estrutura de View (com componentes internos)

```
home/
├── components/                  # 🧩 Componentes internos da view
│   └── hero-section/
│       ├── hero-section.test.tsx
│       ├── hero-section.tsx
│       ├── hero-section.hook.ts # 🎣 Hook específico (opcional)
│       ├── hero-section.const.ts # 📊 Constantes do componente (opcional)
│       └── index.ts
├── home.test.tsx                # 🧪 Testes unitários
├── home.tsx                     # 📄 View principal
├── home.type.ts                 # 📝 Tipos específicos
├── home.hook.ts                 # 🎣 Hook específico (opcional)
├── home.const.ts                # 📊 Constantes da view (opcional)
└── index.ts                     # 📤 Arquivo de exportação
```

#### 📋 Arquivos Opcionais

- `.hook.ts` - Para lógica complexa ou reutilizável dentro do módulo
- `.const.ts` - Para constantes específicas do módulo (ex: configurações, enums, valores padrão)
- `/components/` - Apenas em views, para componentes internos

> 💡 **Quando criar `.const.ts`**: Quando você tem 3+ constantes relacionadas ao módulo, strings mágicas, configurações ou valores que podem mudar. Isso melhora a manutenibilidade e evita repetição.

> 🔒 **Dica de TypeScript**: Use `as const` nas constantes para garantir type safety e permitir que o TypeScript infira tipos literais ao invés de tipos genéricos.

> 💡 **Benefícios da padronização**: Previsibilidade total - você sempre sabe onde encontrar testes, tipos, hooks e constantes em qualquer parte do projeto.

> ✅ **Benefícios de usar `.const.ts`**:
>
> - **Centralização** - Todas as constantes do módulo em um lugar
> - **Type Safety** - TypeScript infere tipos literais com `as const`
> - **Manutenção** - Fácil atualizar valores em um único local
> - **Documentação** - Constantes servem como documentação do módulo
> - **Testabilidade** - Fácil importar e testar valores esperados

---

## 📝 Convenções de Código

### 🏷️ Nomenclatura

| Tipo                      | Convenção                     | Exemplo                                  |
| ------------------------- | ----------------------------- | ---------------------------------------- |
| **Arquivos e Diretórios** | `kebab-case`                  | `user-profile.tsx`, `auth-service/`      |
| **Variáveis e Funções**   | `camelCase`                   | `userName`, `handleSubmit()`             |
| **Componentes**           | `PascalCase`                  | `Button`, `Modal`, `Header`              |
| **Views**                 | `View + PascalCase` (prefixo) | `ViewHome`, `ViewSample1`, `ViewProfile` |
| **Páginas**               | `Page + PascalCase` (prefixo) | `PageHome`, `PageSample1`, `PageProfile` |
| **Interfaces**            | `I + PascalCase` (prefixo)    | `IUserData`, `IButtonProps`              |
| **Types**                 | `T + PascalCase` (prefixo)    | `TButtonVariant`, `TApiResponse`         |
| **Constantes**            | `UPPER_SNAKE_CASE`            | `API_BASE_URL`, `MAX_ATTEMPTS`           |

### 🏹 Arrow Functions (Obrigatório)

Este projeto utiliza **exclusivamente arrow functions** conforme configurado no ESLint:

```typescript
// ✅ Correto - Arrow functions com return explícito
const handleClick = () => {
  return console.log('clicked')
}

const Button = ({ children }: IButtonProps) => {
  return <button>{children}</button>
}

// ❌ Incorreto - Function declarations não são permitidas
function handleClick() {          // ESLint error!
  console.log('clicked')
}

function Button(props) {          // ESLint error!
  return <button>{props.children}</button>
}
```

### 🎣 Custom Hooks (Recomendado)

Use custom hooks para abstrair lógica, regras de negócio e gerenciamento de estado sempre que possível.

#### 📁 Organização de Custom Hooks

**Hooks globais** - Reutilizáveis em toda aplicação:

```
/app/hooks/
├── use-api.hook.ts              # Hook genérico para API calls
├── use-local-storage.hook.ts    # Hook para localStorage
└── use-debounce.hook.ts         # Hook para debounce
```

**Hooks específicos** - Usados apenas em um escopo (view/component):

```
/app/views/user-profile/
├── user-profile.tsx
├── user-profile.test.tsx
├── user-profile.hook.ts         # ✅ Hook específico desta view
└── index.ts

/app/components/ui/data-table/
├── data-table.tsx
├── data-table.test.tsx
├── data-table.hook.ts           # ✅ Hook específico deste component
└── index.ts
```

#### 🔍 Convenção de Nomenclatura

```typescript
// ✅ Hooks globais (em /hooks/)
export const useApi = () => {
  /* ... */
}
export const useLocalStorage = () => {
  /* ... */
}
export const useDebounce = () => {
  /* ... */
}

// ✅ Hooks específicos (com sufixo .hook.)
export const useUserProfile = () => {
  /* ... */
} // user-profile.hook.ts
export const useDataTable = () => {
  /* ... */
} // data-table.hook.ts
export const useFormValidation = () => {
  /* ... */
} // form-validation.hook.ts
```

#### 🎯 Quando Usar Cada Abordagem

| Cenário                       | Use `/hooks/` (Global)     | Use `.hook.` (Específico) |
| ----------------------------- | -------------------------- | ------------------------- |
| **Lógica reutilizável**       | ✅ API calls, localStorage | ❌                        |
| **Utilitários genéricos**     | ✅ debounce, throttle      | ❌                        |
| **Lógica específica de view** | ❌                         | ✅ user-profile.hook.ts   |
| **Estado complexo local**     | ❌                         | ✅ data-table.hook.ts     |
| **Validação específica**      | ❌                         | ✅ contact-form.hook.ts   |
| **Hooks usados 3+ lugares**   | ✅ Mover para `/hooks/`    | ❌                        |

#### 🎯 Quando Usar `.const.ts` vs `/constants/`

| Cenário                        | Use `.const.ts` (Local)         | Use `/constants/` (Global) |
| ------------------------------ | ------------------------------- | -------------------------- |
| **Constantes do módulo**       | ✅ BUTTON_VARIANTS, AUTH_ERRORS | ❌                         |
| **Configurações específicas**  | ✅ TOKEN_CONFIG, DATE_FORMATS   | ❌                         |
| **Classes CSS do componente**  | ✅ BUTTON_CLASSES               | ❌                         |
| **Constantes compartilhadas**  | ❌                              | ✅ API_BASE_URL            |
| **Configurações da aplicação** | ❌                              | ✅ APP_CONFIG              |
| **Valores usados globalmente** | ❌                              | ✅ MAX_FILE_SIZE           |

> 💡 **Regra simples**: Se a constante é específica do módulo, use `.const.ts`. Se é usada em múltiplos módulos, mova para `/constants/`.

**Benefícios dos Custom Hooks:**

- ✅ **Reutilização** - Lógica compartilhada entre componentes
- ✅ **Testabilidade** - Hooks podem ser testados isoladamente
- ✅ **Separação de responsabilidades** - Componentes focam apenas na renderização
- ✅ **Manutenibilidade** - Mudanças de lógica centralizadas
- ✅ **Legibilidade** - Componentes mais limpos e focados
- ✅ **Colocation** - Hooks específicos próximos ao código que os usa

**Quando criar custom hooks:**

- 🔄 **Estado complexo** - Múltiplos estados relacionados
- 🧠 **Lógica de negócio** - Validações, cálculos, transformações
- 🌐 **Chamadas de API** - Fetch, cache, loading states
- 🎯 **Side effects** - Subscriptions, timers, DOM manipulation
- 🔁 **Lógica reutilizável** - Usada em múltiplos componentes

📚 **[Ver exemplos práticos de implementação →](#-exemplos-práticos)**

### 🤔 Quando Usar Interface vs Type

| Uso                       | Interface (I)         | Type (T)                 |
| ------------------------- | --------------------- | ------------------------ |
| **Estruturas de objetos** | ✅ `IUser`, `IProps`  | ❌                       |
| **Unions/Literals**       | ❌                    | ✅ `TStatus`, `TVariant` |
| **Utilitários**           | ❌                    | ✅ `TApiResponse<T>`     |
| **Extensão**              | ✅ Pode ser estendida | ❌ Não extensível        |
| **Performance**           | ✅ Melhor para TS     | ⚡ Alias simples         |

### 🎯 Padrão de Prefixos

```typescript
// ✅ Correto - Prefixos consistentes (padrão atual)
const PageHome = () => {                        // Página do Next.js (arrow function)
  return <ViewHome />                           // View que estrutura a página
}

const ViewHome = () => {                        // View principal (arrow function)
  return (
    <div>
      <Header />                                // Component reutilizável
      <Button variant="primary" />              // Component de UI
    </div>
  )
}

// ❌ Incorreto - Function declarations
export default function Home() {                // Function declaration (não usar)
  return <ViewHome />                          // Confuso: mesmo nome da página
}
```

📚 **[Ver mais exemplos de nomenclatura →](#-convenções-de-nomenclatura)**

---

## 🛠 Tecnologias Utilizadas

### Core Stack

- **Next.js** - Framework React full-stack com SSR/SSG
- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

### State & Data

- **React State** - Hooks nativos (useState, useReducer) para gerenciamento de estado **local do componente**
- **Zustand** - Gerenciamento de estado **global** no diretório `/stores/` (padrão definido)

> 💡 **Padrão de uso**: React state para estado local/componente, Zustand **exclusivamente** para estado global no diretório `/stores/`.

📚 **[Ver exemplo de implementação com Zustand →](#-criando-store-global-zustand)**

### Development & Quality

- **ESLint** - Linter de código para qualidade
- **Prettier** - Formatador automático de código
- **Jest** - Framework de testes unitários
- **Testing Library** - Utilitários para testes de componentes React

### Tooling

- **Husky** - Git hooks para automação
- **Commitizen** - Padronização de commits convencionais
- **Turbopack** - Bundler rápido do Next.js

> 📦 **Versões específicas**: Consulte o arquivo `package.json` para versões exatas de todas as dependências. O template inclui apenas as dependências essenciais - outras podem ser adicionadas conforme necessário.

---

## 🔧 Scripts Disponíveis

### 🚀 Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento (Turbopack)
npm run build        # Gera build de produção
npm start           # Inicia servidor de produção
```

### 🧹 Qualidade de Código

```bash
npm run lint         # Verifica problemas no código
npm run lint:fix     # Corrige problemas automaticamente
npm run format       # Verifica formatação
npm run format:fix   # Formata código automaticamente
npm run tsc         # Verifica tipos TypeScript
```

### 🧪 Testes

```bash
npm test            # Executa todos os testes
npm run test:watch  # Executa testes em modo watch (desenvolvimento)
```

### 🔄 Git e Commits

```bash
npm run prepare     # Configura Husky (hooks do Git)
git commit          # Commitizen abre automaticamente via Husky
```

---

## 🏗️ Arquitetura e Conceitos

### 🧩 Diferença: Components vs Views

**Components** (`/components/`):

- 🔄 **Reutilizáveis** em várias partes da aplicação
- 🎯 **Responsabilidade única** (botão, input, modal)
- 🧩 **Testáveis isoladamente**
- 📦 **Sem lógica de negócio complexa**

**Views** (`/views/`):

- 📱 **Específicas de uma página/tela**
- 🎭 **Orquestram múltiplos components**
- 🧠 **Contêm lógica de negócio**
- 📊 **Recebem dados via props** (não fazem queries diretamente)

**Queries** (`/routes/.../queries.ts`):

- 🔍 **Específicas de uma rota/página**
- 📡 **Fazem chamadas para APIs**
- 🏗️ **Preparam dados para a view**
- ⚡ **Server Components** (executam no servidor)

### 🔄 Fluxo de Dados: Rota → Query → View

```typescript
// 1. Rota (Server Component) - Busca dados
const PageHome = async () => {
  const data = await getHomeData()  // Query
  return <ViewHome data={data} />   // Passa para View
}

// 2. Query - Abstrai chamadas de API
const getHomeData = async () => {
  return await fetch('/api/home').then(r => r.json())
}

// 3. View - Renderiza com os dados
const ViewHome = ({ data }) => {
  return <div>{data.title}</div>
}
```

**Benefícios dessa separação:**

- ✅ **Views testáveis** - Props diretas, sem side effects
- ✅ **Queries reutilizáveis** - Podem ser chamadas de outros lugares
- ✅ **Server Components** - Queries executam no servidor
- ✅ **Type Safety** - Dados tipados fluem da query até a view
- ✅ **Manutenção** - Responsabilidades bem definidas

### Hierarquia de Componentes e Views

1. **Structure Components** (`/components/structure/`)

   - Componentes estruturais da aplicação
   - Headers, Footers, Sidebars, etc.

2. **UI Components** (`/components/ui/`)

   - Componentes reutilizáveis da interface
   - Buttons, Inputs, Modals, etc.

3. **Views** (`/views/`)

   - Estruturas completas de páginas
   - Lógica de negócio e orquestração
   - Composição de componentes para formar uma tela

4. **Queries** (`/routes/.../queries.ts`)
   - Específicas de uma rota/página
   - Fazem chamadas para APIs e preparam dados

### 🗺️ Mapeamento Rotas → Views → Queries

A estrutura de rotas tem correspondência direta com views, e as queries ficam junto às rotas:

| Rota                                      | View                              | Query                 | Tipo           |
| ----------------------------------------- | --------------------------------- | --------------------- | -------------- |
| `app/(routes)/(public)/(home)/page.tsx`   | `views/home/` → `ViewHome`        | `(home)/queries.ts`   | 🌐 Pública     |
| `app/(routes)/(public)/sample-1/page.tsx` | `views/sample-1/` → `ViewSample1` | `sample-1/queries.ts` | 🌐 Pública     |
| `app/(routes)/(public)/sample-2/page.tsx` | `views/sample-2/` → `ViewSample2` | `sample-2/queries.ts` | 🌐 Pública     |
| `app/(routes)/(auth)/sample-3/page.tsx`   | `views/sample-3/` → `ViewSample3` | `sample-3/queries.ts` | 🔒 Autenticada |
| `app/(routes)/(auth)/sample-4/page.tsx`   | `views/sample-4/` → `ViewSample4` | `sample-4/queries.ts` | 🔒 Autenticada |

**Padrão:**

```
(routes)/[group]/[sample]/page.tsx    →  views/[sample]/  →  View[Sample]
(routes)/[group]/[sample]/queries.ts  →  Queries específicas da rota
```

### 🤔 Quando Usar Cada Abordagem

| Cenário                   | Use Component                      | Use View                              |
| ------------------------- | ---------------------------------- | ------------------------------------- |
| **Botão reutilizável**    | ✅ `/components/ui/button/`        | ❌                                    |
| **Modal de confirmação**  | ✅ `/components/ui/modal/`         | ❌                                    |
| **Header da aplicação**   | ✅ `/components/structure/header/` | ❌                                    |
| **Página inicial (Home)** | ❌                                 | ✅ `/views/home/` → `ViewHome`        |
| **Páginas de exemplo**    | ❌                                 | ✅ `/views/sample-1/` → `ViewSample1` |
|                           | ❌                                 | ✅ `/views/sample-2/` → `ViewSample2` |
| **Páginas autenticadas**  | ❌                                 | ✅ `/views/sample-3/` → `ViewSample3` |
|                           | ❌                                 | ✅ `/views/sample-4/` → `ViewSample4` |

📚 **[Ver exemplos práticos de implementação →](#-criando-component-reutilizável)**

---

## 🧪 Testes

### 🎯 Estratégia de Testes

#### Configuração Jest

O Jest está configurado para:

- Ambiente jsdom para testes de componentes
- Auto-mocking de módulos
- Suporte a TypeScript
- Testing Library preconfigurado

### 🏃‍♂️ Executando Testes

```bash
# Todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Com coverage
npm test -- --coverage

# Testes específicos
npm test -- button
```

📚 **[Ver exemplos de testes implementados →](#-exemplos-de-testes)**

---

## 📚 Exemplos Práticos

Esta seção centraliza todos os exemplos de implementação para facilitar a consulta e manutenção.

### 🎯 Convenções de Nomenclatura

```typescript
// ✅ Correto
const userAge = 25
const handleUserLogin = () => {
  return // lógica aqui
}
const UserDashboard = () => {
  return <div>Dashboard</div>
}

// Interfaces (para estruturas de objetos)
interface IUserData {
  id: string
  name: string
  email: string
}

interface IButtonProps {
  variant?: TButtonVariant
  children: React.ReactNode
}

// Types (para unions, primitivos, utilitários)
type TButtonVariant = 'primary' | 'secondary' | 'danger'
type TSize = 'sm' | 'md' | 'lg'
type TStatus = 'loading' | 'success' | 'error'
type TTheme = 'light' | 'dark'

const MAX_RETRY_ATTEMPTS = 3

// ❌ Incorreto
const user_age = 25                    // snake_case
function HandleUserLogin() {}          // function declaration
const userDashboard = () => {}         // camelCase para componente
interface ButtonProps {}              // sem prefixo I
type UserData = {}                     // type para estrutura (use interface)
```

### 🎣 Implementação de Custom Hooks

#### Custom Hook para Lógica de Negócio

```typescript
// useUserManagement - Hook para gerenciar usuários
const useUserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getUsersAPI()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { users, loading, fetchUsers }
}

// useFormValidation - Hook para validação de formulários
const useFormValidation = (initialValues: IFormData) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (field: string, value: string) => {
    // Lógica de validação
    return value.length > 0 ? '' : 'Campo obrigatório'
  }

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  return { values, errors, handleChange }
}
```

#### Utilizando Custom Hooks

```typescript
// ✅ Componente limpo usando custom hooks
const UserList = () => {
  const { users, loading, fetchUsers } = useUserManagement()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (loading) {
    return <div>Carregando usuários...</div>
  }

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {users.map(user => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
      <Button onClick={fetchUsers}>
        Atualizar Lista
      </Button>
    </div>
  )
}

// ✅ Formulário usando custom hook de validação
const UserForm = () => {
  const initialValues = { name: '', email: '', phone: '' }
  const { values, errors, handleChange } = useFormValidation(initialValues)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(errors).every(error => error === '')) {
      console.log('Formulário válido:', values)
      // Enviar dados...
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Nome"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <Input
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  )
}
```

### 🧩 Criando Component Reutilizável

#### 1. Estrutura Base

```bash
# Crie o diretório do componente
mkdir app/components/ui/button
cd app/components/ui/button
```

#### 2. Arquivos do Component

```typescript
// button.const.ts
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const

export const BUTTON_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const

export const BUTTON_CLASSES = {
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  disabled: 'opacity-50 cursor-not-allowed',
} as const
```

```typescript
// button.type.ts
import { BUTTON_VARIANTS, BUTTON_SIZES } from './button.const'

export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSize
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export type TButtonVariant = keyof typeof BUTTON_VARIANTS
export type TSize = keyof typeof BUTTON_SIZES
```

```typescript
// button.hook.ts (opcional - para lógica específica do button)
import { useState } from 'react'

export const useButton = ({ onClick }: { onClick?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (!onClick) return

    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleClick }
}
```

```typescript
// button.tsx
import { IButtonProps } from './button.type'
import { BUTTON_CLASSES } from './button.const'

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false
}: IButtonProps) => {
  const className = [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.variant[variant],
    BUTTON_CLASSES.size[size],
    disabled && BUTTON_CLASSES.disabled,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

```typescript
// button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'
import { BUTTON_CLASSES } from './button.const'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply correct variant classes', () => {
    render(<Button variant="secondary">Test</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain(BUTTON_CLASSES.variant.secondary)
  })

  it('should apply correct size classes', () => {
    render(<Button size="lg">Large Button</Button>)

    const button = screen.getByRole('button')
    expect(button.className).toContain(BUTTON_CLASSES.size.lg)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.className).toContain(BUTTON_CLASSES.disabled)
  })
})
```

```typescript
// index.ts
export { Button } from './button'
export { useButton } from './button.hook'
export { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_CLASSES } from './button.const'
export type { IButtonProps, TButtonVariant, TSize } from './button.type'
```

### 🔧 Criando Service

#### 1. Estrutura do Service

```bash
# Crie o diretório do service
mkdir app/services/auth
cd app/services/auth
```

#### 2. Arquivos do Service

```typescript
// auth.const.ts
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const

export const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_PREFIX: 'Bearer',
  EXPIRY_BUFFER: 60, // segundos antes de expirar para renovar
} as const

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  TOKEN_EXPIRED: 'Sessão expirada, faça login novamente',
  NETWORK_ERROR: 'Erro de conexão, tente novamente',
  SERVER_ERROR: 'Erro no servidor, tente mais tarde',
} as const
```

```typescript
// auth.type.ts
export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  user: IUser
  token: string
  refreshToken: string
}

export interface IUser {
  id: string
  name: string
  email: string
  role: TUserRole
}

export type TUserRole = 'admin' | 'user' | 'guest'
export type TAuthStatus = 'authenticated' | 'unauthenticated' | 'loading'
```

```typescript
// auth.ts
import { ILoginRequest, ILoginResponse } from './auth.type'
import { AUTH_ENDPOINTS, AUTH_ERRORS } from './auth.const'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authService = {
  login: async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS)
        }
        throw new Error(AUTH_ERRORS.SERVER_ERROR)
      }

      return response.json()
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR)
      }
      throw error
    }
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_URL}${AUTH_ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      credentials: 'include',
    })
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error(AUTH_ERRORS.TOKEN_EXPIRED)
    }

    const data = await response.json()
    return data.token
  },
}
```

```typescript
// auth.test.ts
import { authService } from './auth'
import { AUTH_ENDPOINTS, AUTH_ERRORS } from './auth.const'

// Mock fetch
global.fetch = jest.fn()

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully', async () => {
    const mockResponse = {
      user: { id: '1', name: 'John', email: 'john@test.com', role: 'user' },
      token: 'token123',
      refreshToken: 'refresh123',
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await authService.login({
      email: 'john@test.com',
      password: 'password123',
    })

    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.LOGIN}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('should throw error on invalid credentials', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    })

    await expect(
      authService.login({
        email: 'john@test.com',
        password: 'wrong',
      })
    ).rejects.toThrow(AUTH_ERRORS.INVALID_CREDENTIALS)
  })

  it('should throw network error on connection failure', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Network failed'))

    await expect(
      authService.login({
        email: 'john@test.com',
        password: 'password123',
      })
    ).rejects.toThrow(AUTH_ERRORS.NETWORK_ERROR)
  })
})
```

```typescript
// index.ts
export { authService } from './auth'
export { AUTH_ENDPOINTS, TOKEN_CONFIG, AUTH_ERRORS } from './auth.const'
export type {
  ILoginRequest,
  ILoginResponse,
  IUser,
  TUserRole,
  TAuthStatus,
} from './auth.type'
```

### 🗃️ Criando Store Global (Zustand)

#### 1. Estrutura da Store

```bash
# Crie o diretório da store
mkdir app/stores/user
cd app/stores/user
```

#### 2. Arquivos da Store

```typescript
// user.const.ts
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

export const USER_PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  guest: ['read'],
} as const

export const USER_STORAGE_KEY = 'user-storage'

export const DEFAULT_USER_STATE = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
} as const
```

```typescript
// user.type.ts
import { IUser } from '@/services/auth'

export interface IUserState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface IUserActions {
  setUser: (user: IUser) => void
  clearUser: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export type TUserStore = IUserState & IUserActions
```

```typescript
// user.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { TUserStore } from './user.type'
import { USER_STORAGE_KEY, DEFAULT_USER_STATE } from './user.const'

export const useUserStore = create<TUserStore>()(
  devtools(
    persist(
      (set) => ({
        // State inicial usando constantes
        ...DEFAULT_USER_STATE,

        // Actions
        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
            error: null,
          }),

        clearUser: () =>
          set(DEFAULT_USER_STATE),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),
      }),
      {
        name: USER_STORAGE_KEY, // Nome no localStorage vindo das constantes
        partialize: (state) => ({ user: state.user }), // Persiste apenas o user
      }
    )
  )
)
```

```typescript
// user.test.ts
import { act, renderHook } from '@testing-library/react'
import { useUserStore } from './user'

describe('useUserStore', () => {
  it('should set user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@test.com',
      role: 'user' as const,
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('should clear user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.clearUser()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should handle error state', () => {
    const { result } = renderHook(() => useUserStore())

    const errorMessage = 'Authentication failed'

    act(() => {
      result.current.setError(errorMessage)
    })

    expect(result.current.error).toBe(errorMessage)
  })
})
```

```typescript
// index.ts
export { useUserStore } from './user'
export { USER_ROLES, USER_PERMISSIONS, USER_STORAGE_KEY, DEFAULT_USER_STATE } from './user.const'
export type { IUserState, IUserActions, TUserStore } from './user.type'
```

### 🛠️ Criando Utility

#### 1. Estrutura do Utility

```bash
# Crie o diretório do utility
mkdir app/utils/format-date
cd app/utils/format-date
```

#### 2. Arquivos do Utility

```typescript
// format-date.const.ts
export const DATE_FORMATS = {
  SHORT: 'short',
  LONG: 'long',
  ISO: 'iso',
  RELATIVE: 'relative',
} as const

export const DEFAULT_LOCALE = 'pt-BR'

export const RELATIVE_TIME_UNITS: [string, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

export const DATE_FORMAT_OPTIONS = {
  short: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  long: {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
} as const
```

```typescript
// format-date.type.ts
import { DATE_FORMATS } from './format-date.const'

export type TDateFormat = keyof typeof DATE_FORMATS

export interface IFormatDateOptions {
  format?: TDateFormat
  locale?: string
  timezone?: string
}
```

```typescript
// format-date.ts
import { IFormatDateOptions } from './format-date.type'
import {
  DEFAULT_LOCALE,
  RELATIVE_TIME_UNITS,
  DATE_FORMAT_OPTIONS
} from './format-date.const'

export const formatDate = (
  date: Date | string,
  options: IFormatDateOptions = {}
): string => {
  const { format = 'short', locale = DEFAULT_LOCALE, timezone } = options

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date')
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
  }

  switch (format) {
    case 'short':
      Object.assign(formatOptions, DATE_FORMAT_OPTIONS.short)
      break
    case 'long':
      Object.assign(formatOptions, DATE_FORMAT_OPTIONS.long)
      break
    case 'iso':
      return dateObj.toISOString()
    case 'relative':
      return formatRelativeTime(dateObj)
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj)
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  for (const [unit, seconds] of RELATIVE_TIME_UNITS) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      const rtf = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: 'auto' })
      return rtf.format(-interval, unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return 'agora'
}
```

```typescript
// format-date.test.ts
import { formatDate } from './format-date'

describe('formatDate', () => {
  const testDate = new Date('2024-01-15T10:30:00')

  it('should format date in short format', () => {
    const result = formatDate(testDate, { format: 'short' })
    expect(result).toBe('15/01/2024')
  })

  it('should format date in long format', () => {
    const result = formatDate(testDate, { format: 'long' })
    expect(result).toContain('janeiro')
    expect(result).toContain('2024')
  })

  it('should format date in ISO format', () => {
    const result = formatDate(testDate, { format: 'iso' })
    expect(result).toBe(testDate.toISOString())
  })

  it('should handle string dates', () => {
    const result = formatDate('2024-01-15', { format: 'short' })
    expect(result).toBe('15/01/2024')
  })

  it('should throw error for invalid date', () => {
    expect(() => formatDate('invalid-date')).toThrow('Invalid date')
  })

  it('should use custom locale', () => {
    const result = formatDate(testDate, {
      format: 'long',
      locale: 'en-US'
    })
    expect(result).toContain('January')
  })
})
```

```typescript
// index.ts
export { formatDate } from './format-date'
export { DATE_FORMATS, DEFAULT_LOCALE, RELATIVE_TIME_UNITS } from './format-date.const'
export type { TDateFormat, IFormatDateOptions } from './format-date.type'
```

### 🎣 Criando Hook Global

#### 1. Estrutura do Hook Global

```bash
# Crie o diretório do hook
mkdir app/hooks/use-local-storage
cd app/hooks/use-local-storage
```

#### 2. Arquivos do Hook

```typescript
// use-local-storage.type.ts
export interface IUseLocalStorageOptions {
  serializer?: (value: unknown) => string
  deserializer?: (value: string) => unknown
  syncData?: boolean
}

export type TSetValue<T> = T | ((prevValue: T) => T)
```

```typescript
// use-local-storage.ts
import { useState, useEffect, useCallback } from 'react'
import { IUseLocalStorageOptions, TSetValue } from './use-local-storage.type'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: IUseLocalStorageOptions = {}
) => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncData = true,
  } = options

  // Estado inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? deserializer(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Função para atualizar o valor
  const setValue = useCallback(
    (value: TSetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, serializer, storedValue]
  )

  // Função para remover o item
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Sincronizar entre abas
  useEffect(() => {
    if (!syncData || typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return

      try {
        const newValue = e.newValue ? deserializer(e.newValue) : initialValue
        setStoredValue(newValue)
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue, deserializer, syncData])

  return [storedValue, setValue, removeValue] as const
}
```

```typescript
// use-local-storage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './use-local-storage'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should initialize with initial value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    )

    expect(result.current[0]).toBe('initial')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    )

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorageMock.getItem('test-key')).toBe('"updated"')
  })

  it('should handle objects', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-object', { name: 'John', age: 30 })
    )

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 })
    })

    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 })
  })

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    )

    act(() => {
      result.current[1]('value')
    })

    expect(localStorageMock.getItem('test-key')).toBe('"value"')

    act(() => {
      result.current[2]() // removeValue
    })

    expect(result.current[0]).toBe('initial')
    expect(localStorageMock.getItem('test-key')).toBeNull()
  })

  it('should accept function updates', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-counter', 0)
    )

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(1)
  })
})
```

```typescript
// index.ts
export { useLocalStorage } from './use-local-storage'
export type { IUseLocalStorageOptions, TSetValue } from './use-local-storage.type'
```

### 📱 Criando View de Página

#### 1. Estrutura da View

```bash
# Crie o diretório da view
mkdir app/views/home
cd app/views/home
```

#### 2. Arquivos da View

```typescript
// home.type.ts
export interface IHomeProps {
  homeData: IHomeData
  features: IFeature[]
}

export interface IHomeData {
  title: string
  subtitle: string
  ctaText: string
}

export interface IFeature {
  id: string
  icon: string
  title: string
  description: string
}
```

```typescript
// home.hook.ts (opcional - para lógica específica da home)
import { useState, useEffect } from 'react'
import { IHomeData, IFeature } from './home.type'

export const useHome = (
  initialData: IHomeData,
  initialFeatures: IFeature[],
) => {
  const [homeData, setHomeData] = useState(initialData)
  const [features, setFeatures] = useState(initialFeatures)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId === selectedFeature ? null : featureId)
  }

  const resetSelection = () => {
    setSelectedFeature(null)
  }

  return {
    homeData,
    features,
    selectedFeature,
    handleFeatureSelect,
    resetSelection,
  }
}
```

```typescript
// home.tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HeroSection } from '@/components/structure/hero-section'
import { IHomeProps } from './home.type'
import { useHome } from './home.hook'

const ViewHome = ({ homeData, features }: IHomeProps) => {
  const { selectedFeature, handleFeatureSelect, resetSelection } = useHome(homeData, features)

  return (
    <div className="min-h-screen">
      <HeroSection {...homeData} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que nos escolher?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`text-center p-6 cursor-pointer transition-colors ${
                  selectedFeature === feature.id ? 'bg-blue-50 border-blue-300' : ''
                }`}
                onClick={() => handleFeatureSelect(feature.id)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>

          {selectedFeature && (
            <div className="mt-8 text-center">
              <Button onClick={resetSelection}>Limpar Seleção</Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <Button size="lg">
            {homeData.ctaText}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ViewHome
```

```typescript
// index.ts
import ViewHome from './home'
export default ViewHome
export { useHome } from './home.hook'
export type { IHomeProps, IHomeData, IFeature } from './home.type'
```

#### 3. Usando a View na Rota com Queries

```typescript
// app/(routes)/(public)/(home)/page.tsx
import ViewHome from '@/app/views/home'
import { getHomeData, getFeatures } from './queries'

const PageHome = async () => {
  const [homeData, features] = await Promise.all([
    getHomeData(),
    getFeatures()
  ])

  return <ViewHome homeData={homeData} features={features} />
}

export default PageHome

// Metadados da página
export const metadata = {
  title: 'Bem-vindo | Minha Aplicação',
  description: 'Página inicial da nossa aplicação incrível'
}
```

```typescript
// app/(routes)/(public)/(home)/queries.ts
export const getHomeData = async () => {
  const response = await fetch('/api/home')

  if (!response.ok) {
    throw new Error('Failed to fetch home data')
  }

  return response.json()
}

export const getFeatures = async () => {
  const response = await fetch('/api/features')

  if (!response.ok) {
    throw new Error('Failed to fetch features')
  }

  return response.json()
}
```

### 🛣️ Roteamento Next.js

#### Estrutura de Rotas com Queries

```typescript
// app/(routes)/(public)/sample-1/page.tsx
import ViewSample1 from '@/app/views/sample-1'
import { getSample1Data } from './queries'

const PageSample1 = async () => {
  const data = await getSample1Data()

  return <ViewSample1 data={data} />
}

export default PageSample1

// Metadados da página
export const metadata = {
  title: 'Sample 1 | Minha Aplicação',
  description: 'Página de exemplo 1 da nossa aplicação'
}
```

```typescript
// app/(routes)/(public)/sample-1/queries.ts
export const getSample1Data = async () => {
  // Query específica desta rota
  const response = await fetch('/api/sample-1')
  return response.json()
}

export const getSample1Stats = async () => {
  // Outra query específica desta página
  const response = await fetch('/api/sample-1/stats')
  return response.json()
}
```

#### Layouts Personalizados

```typescript
// app/(routes)/(public)/layout.tsx - Layout para páginas públicas
import { Header } from '@/components/structure/header'
import { Footer } from '@/components/structure/footer'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {children}  {/* Aqui vai a página (ViewHome, ViewSample1, etc.) */}
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
```

### 🧪 Exemplos de Testes

#### Teste de Component

```typescript
// button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply correct variant classes', () => {
    render(<Button variant="secondary">Test</Button>)

    expect(screen.getByRole('button')).toHaveClass('btn-secondary')
  })
})
```

#### Teste de View

```typescript
// home.test.tsx
import { render, screen } from '@testing-library/react'
import ViewHome from './home'

describe('ViewHome', () => {
  it('should render main heading', () => {
    render(<ViewHome />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should display welcome message', () => {
    render(<ViewHome />)

    expect(screen.getByText(/bem-vindo/i)).toBeInTheDocument()
  })
})
```

### 📁 Arquivos Estáticos e Imagens

#### Estrutura Sugerida para /public/

Quando precisar adicionar arquivos estáticos, organize assim:

```
/public/
├── documents/     # PDFs, downloads
├── icons/         # Ícones e SVGs
├── images/        # Fotos e imagens
├── robots.txt     # SEO
└── sitemap.xml    # SEO
```

> 📝 **Nota**: O `favicon.ico` no App Router fica em `/app/favicon.ico`, não em `/public/`.

#### Como Usar Imagens no Código

```typescript
// ✅ Correto - next/image (recomendado)
import Image from 'next/image'

// Primeiro, crie a pasta /public/images/
<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={100}
/>

// Para ícones, crie a pasta /public/icons/
<Image
  src="/icons/logo-dark.svg"
  alt="Logo"
  width={40}
  height={40}
/>

// ⚠️ Use <img> apenas quando necessário
<img src="/icons/small-icon.svg" alt="Icon" className="w-4 h-4" />

// ❌ Incorreto - não precisa de '/public'
<Image src="/public/images/logo.png" alt="Logo" width={200} height={100} />
```

#### Com Next.js Image (Recomendado)

> ⚠️ **Importante**: Você precisa criar as pastas `/public/images/` e `/public/icons/` antes de adicionar arquivos.

```typescript
import Image from 'next/image'

// ✅ Otimização automática de imagens
<Image
  src="/images/hero-banner.jpg"
  alt="Banner principal"
  width={800}
  height={400}
  priority // Para imagens above-the-fold
/>

// ✅ Imagens responsivas
<Image
  src="/images/sample-photo.jpg"
  alt="Sample"
  fill
  className="object-cover"
/>

// ✅ Com placeholder
<Image
  src="/images/profile-photo.jpg"
  alt="Foto do perfil"
  width={150}
  height={150}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 📂 Organização de Imports

```typescript
// ✅ Ordem correta dos imports
import React from 'react' // 1. React sempre primeiro
import { create } from 'zustand' // 2. Bibliotecas externas (node_modules)

import { Button } from '@/components/ui/button' // 3. Imports internos (absolutos @/)
import { Header } from '@/components/structure/header'
import { useUserStore } from '@/stores/user.store'

import { ComponentProps } from './component.type' // 4. Imports relativos (./ ou ../)
import './component.styles.css' // 5. CSS/Styles sempre por último

// ❌ Ordem incorreta
import './styles.css' // CSS no meio
import React from 'react' // React depois de outros
import { Button } from '@/components/ui/button'
import { create } from 'zustand' // Externa depois de interna
```

**Regras de organização:**

1. **React** sempre primeiro
2. **Bibliotecas externas** (node_modules)
3. **Imports internos** com path absoluto (@/)
4. **Imports relativos** (./ ou ../)
5. **CSS/Styles** sempre por último

---

## 🔄 Workflows e Boas Práticas

### 🌿 Git Flow

```bash
# 1. Nova branch - SEMPRE incluir número do card
git checkout -b ABC-123_user-authentication
git checkout -b ABC-456_button-alignment
git checkout -b ABC-789_critical-security-patch

# 2. Commits (Commitizen executa automaticamente)
git commit
# O Husky abre o Commitizen automaticamente

# 3. Push e PR
git push origin ABC-123_user-authentication
```

### 📋 Convenção de Branches

**Formato obrigatório:**

```
[CARD-ID]_[descrição-kebab-case]
```

**Exemplos:**

```bash
PROJ-123_add-user-profile
PROJ-456_resolve-login-bug
PROJ-789_security-vulnerability
PROJ-101_update-dependencies
PROJ-202_update-readme
```

**Por que usar underscore para separar card da descrição:**

- ✅ **Separação visual clara** - distingue ID da descrição
- ✅ **Legibilidade** - mais fácil identificar onde acaba o card
- ✅ **Mantém kebab-case** - descrição continua no padrão de arquivos
- ✅ **Consistência** - descrição igual aos nomes de arquivos

### 🎯 Padrões de Commit

**Formato gerado pelo Commitizen:**

```
tipo(escopo): descrição breve

Descrição mais detalhada (opcional)
```
