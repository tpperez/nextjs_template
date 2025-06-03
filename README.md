# Documentação do Projeto Next.js

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Estrutura Atual do Projeto](#estrutura-atual-do-projeto)
5. [Estrutura Completa (Referência)](#estrutura-completa-referência)
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

- **Node.js** (versão especificada no `.nvmrc` - recomendado usar nvm)
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

Esta é a estrutura **atual** do template starter - o que você encontrará ao clonar o projeto:

> 📝 **Nota**: Diretórios e arquivos estão organizados como nos editores - **pastas primeiro** em ordem alfabética, depois **arquivos** em ordem alfabética.

```
/app
├── (routes)/                    # 🗂️ Rotas da aplicação
│   └── (public)/               # 🌐 Rotas públicas
│       ├── (home)/             # 🏠 Página inicial
│       │   └── page.tsx        # PageHome (usa ViewHome)
│       ├── sample-1/           # 📄 Página de exemplo
│       │   └── page.tsx        # PageSample1 (usa ViewSample1)
│       └── layout.tsx          # Layout para páginas públicas
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

/public/                          # 📁 Arquivos estáticos (raiz do projeto)
├── documents/                    # 📄 PDFs, documentos para download
├── icons/                        # 🎯 Ícones adicionais e favicons
├── images/                       # 🖼️ Imagens (logos, ícones, fotos)
├── robots.txt                    # 🤖 Instruções para crawlers
└── sitemap.xml                   # 🗺️ Mapa do site
```

### 🎯 O que está implementado

- ✅ **2 páginas funcionais** - Home e Sample-1
- ✅ **Layout básico** - Estrutura de rotas públicas
- ✅ **2 views completas** - Com testes e exportações
- ✅ **Estrutura preparada** - Pastas organizadas com `.placeholder`

### 📋 Próximos passos

À medida que o projeto cresce, você pode:

1. **Adicionar componentes** em `/components/ui/` e `/components/structure/`
2. **Criar novas views** em `/views/[nome-da-view]/`
3. **Implementar stores globais** em `/stores/` usando Zustand (já configurado)
4. **Adicionar services** em `/services/` para APIs
5. **Criar hooks específicos** usando sufixo `.hook.ts` em views/components conforme necessário (ver exemplos na documentação)
6. **Adicionar hooks globais** em `/hooks/` para lógica reutilizável
7. **Remover `.placeholder`** conforme usa as pastas

---

## 🚀 Estrutura Completa (Referência)

Esta é uma **estrutura avançada** para quando o projeto estiver maduro e precisar de organização escalável:

> 📝 **Nota**: Diretórios e arquivos estão organizados como nos editores - **pastas primeiro** em ordem alfabética, depois **arquivos** em ordem alfabética.

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
│       │   └── index.ts
│       ├── input/
│       └── modal/
├── constants/                    # 📊 Constantes da aplicação
├── hooks/                        # 🎣 Custom hooks reutilizáveis
├── services/                     # 🔧 Serviços e integrações de API
├── stores/                       # 🗃️ Estados globais (Zustand)
├── styles/                       # 🎨 Estilos globais e temas
├── typings/                      # 📝 Definições de tipos globais
├── utils/                        # 🛠️ Funções utilitárias
├── views/                        # 📱 Views/estruturas de páginas
│   ├── home/                     # 🏠 Página inicial (public)
│   │   ├── home.test.tsx
│   │   ├── home.tsx
│   │   ├── home.type.ts
│   │   ├── home.hook.ts         # 🎣 Hook específico (opcional)
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

### Organização por Funcionalidade

Tanto **components** quanto **views** seguem a mesma estrutura padrão:

#### 🧩 Estrutura de Component

```
button/
├── button.test.tsx              # 🧪 Testes unitários
├── button.tsx                   # 📄 Componente principal
├── button.type.ts               # 📝 Tipos específicos
├── button.hook.ts               # 🎣 Hook específico (opcional)
└── index.ts                     # 📤 Arquivo de exportação
```

#### 📱 Estrutura de View

```
home/
├── components/                  # 🧩 Componentes internos da view
│   └── hero-section/
│       ├── hero-section.test.tsx
│       ├── hero-section.tsx
│       ├── hero-section.hook.ts # 🎣 Hook específico (opcional)
│       └── index.ts
├── home.test.tsx                # 🧪 Testes unitários
├── home.tsx                     # 📄 View principal
├── home.type.ts                 # 📝 Tipos específicos
├── home.hook.ts                 # 🎣 Hook específico (opcional)
└── index.ts                     # 📤 Arquivo de exportação
```

#### 📋 Arquivos Opcionais

- `/components/` - Para componentes que só existem dentro desta view

> 💡 **Estado na view**: Use React state (`useState`) para estado local da view. Para estado global, crie stores em `/stores/` usando Zustand.

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

📚 **[Ver exemplo de implementação com Zustand →](#-teste-de-store-global-zustand)**

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
// button.type.ts
export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSize
  children: React.ReactNode
  onClick?: () => void
}

export type TButtonVariant = 'primary' | 'secondary' | 'danger'
export type TSize = 'sm' | 'md' | 'lg'
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

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: IButtonProps) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
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

```typescript
// index.ts
export { Button } from './button'
export { useButton } from './button.hook'
export type { IButtonProps, TButtonVariant, TSize } from './button.type'
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

#### Teste de Store Global (Zustand)

```typescript
// user.store.test.ts
import { act, renderHook } from '@testing-library/react'
import { useUserStore } from './user.store'

describe('useUserStore', () => {
  it('should set user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    const mockUser = { id: '1', name: 'João', email: 'joao@test.com' }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
  })

  it('should clear user correctly', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.clearUser()
    })

    expect(result.current.user).toBeNull()
  })
})
```

### 📁 Arquivos Estáticos e Imagens

#### Como Usar Imagens no Código

```typescript
// ✅ Correto - next/image (recomendado)
import Image from 'next/image'

<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={100}
/>

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

**Exemplos de commits reais do Commitizen:**

```bash
feat: add user authentication component

Implements login form with email/password validation
and session management.

fix: resolve button alignment issue

Fixes horizontal alignment problem in mobile viewport.

docs: update component documentation

Adds usage examples and API reference for Button component.

# Com escopo
feat(auth): add login form validation

Implements client-side validation for email format
and password strength requirements.
```

### 🎯 Benefícios da Convenção com Card ID

**Rastreabilidade:**

- ✅ Conecta código diretamente ao requisito/bug
- ✅ Facilita code review e auditoria
- ✅ Histórico completo do desenvolvimento

**Organização:**

- ✅ Branches agrupadas por projeto no Git
- ✅ Fácil identificação do contexto
- ✅ Navegação eficiente entre ferramentas

**Automação:**

- ✅ Integração com ferramentas de projeto (Jira, Azure DevOps)
- ✅ Fechamento automático de cards via commit
- ✅ Relatórios de deployment automatizados

### 🤖 Automação com Husky

O projeto está configurado com **Husky hooks** que automatizam o processo:

```bash
# Ao fazer git commit, o Husky executa automaticamente:
git commit
# ↓ Husky hooks executam:
# 1. prepare-commit-msg: Abre Commitizen para commit estruturado
# 2. pre-commit: Executa tsc + testes + lint-staged
# 3. commit-msg: Valida formato do commit com commitlint
```

**Fluxo automatizado:**

- ✅ **Testes** rodam antes do commit
- ✅ **Linting** corrige código automaticamente
- ✅ **Commitizen** força commits padronizados
- ✅ **Validação** garante formato correto

### 📋 Checklist de Desenvolvimento

#### Antes de Commitar

- [ ] `npm run lint` - sem erros
- [ ] `npm run format` - código formatado
- [ ] `npm run tsc` - sem erros de tipo
- [ ] `npm test` - todos os testes passando

#### Antes do PR

- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Component/View exportado corretamente
- [ ] Tipos definidos adequadamente

---

**📅 Última atualização**: Maio 2025
**📦 Versão**: 1.0.0
**👥 Mantido por**: Thiago Pereira Perez
