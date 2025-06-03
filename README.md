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
11. [Exemplos Práticos](#exemplos-práticos)
12. [Workflows e Boas Práticas](#workflows-e-boas-práticas)

---

## 🎯 Visão Geral

Este é um projeto Next.js moderno utilizando o App Router e TypeScript. O projeto segue uma arquitetura bem definida com separação clara de responsabilidades e convenções consistentes de código.

### Características Principais

- ⚡ **Next.js** com App Router e Turbopack
- 🎨 **Tailwind CSS** para estilização
- 📱 **TypeScript** para tipagem robusta
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

```
/app
├── layout.tsx                    # Layout raiz da aplicação
├── styles/
│   └── globals.css              # Estilos globais (Tailwind CSS)
│
├── (routes)/                    # 🗂️ Rotas da aplicação
│   └── (public)/               # 🌐 Rotas públicas
│       ├── layout.tsx          # Layout para páginas públicas
│       ├── (home)/             # 🏠 Página inicial
│       │   └── page.tsx        # PageHome (usa ViewHome)
│       └── sample-1/           # 📄 Página de exemplo
│           └── page.tsx        # PageSample1 (usa ViewSample1)
│
├── views/                       # 📱 Views implementadas
│   ├── home/                   # 🏠 View da página inicial
│   │   ├── home.tsx            # Componente ViewHome
│   │   ├── home.test.tsx       # Testes da view
│   │   └── index.ts            # Exportação
│   └── sample-1/               # 📄 View de exemplo
│       ├── sample-1.tsx        # Componente ViewSample1
│       ├── sample-1.test.tsx   # Testes da view
│       └── index.ts            # Exportação
│
├── components/                  # 🧩 Componentes (preparado para uso)
│   ├── structure/              # 🏗️ Componentes estruturais
│   │   └── .placeholder        # Pasta vazia (pronta para usar)
│   └── ui/                     # 🎨 Componentes de interface
│       └── .placeholder        # Pasta vazia (pronta para usar)
│
├── constants/                   # 📊 Constantes da aplicação
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── hooks/                       # 🎣 Custom hooks
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── services/                    # 🔧 Serviços e APIs
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── stores/                      # 🗃️ Stores de estado
│   └── .placeholder            # Pasta vazia (pronta para usar)
├── typings/                     # 📝 Tipos globais
│   └── .placeholder            # Pasta vazia (pronta para usar)
└── utils/                       # 🛠️ Funções utilitárias
    └── .placeholder             # Pasta vazia (pronta para usar)

/public/                          # 📁 Arquivos estáticos (raiz do projeto)
├── images/                       # 🖼️ Imagens (logos, ícones, fotos)
├── icons/                        # 🎯 Ícones e favicons
├── documents/                    # 📄 PDFs, documentos para download
├── favicon.ico                   # 🌐 Favicon principal
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
3. **Implementar stores** em `/stores/` (ex: Zustand)
4. **Adicionar services** em `/services/` para APIs
5. **Remover `.placeholder`** conforme usa as pastas

---

## 🚀 Estrutura Completa (Referência)

Esta é uma **estrutura avançada** para quando o projeto estiver maduro e precisar de organização escalável:

```
/app
├── layout.tsx                    # Layout raiz da aplicação
│
├── (routes)/                     # 🗂️ Todas as rotas da aplicação
│   ├── api/                      # 🔌 API Routes (endpoints)
│   │   └── example/
│   │       └── route.ts
│   │
│   ├── (public)/                 # 🌐 Rotas públicas (sem auth)
│   │   ├── layout.tsx            # Layout para rotas públicas
│   │   ├── (home)/               # 🏠 Página inicial
│   │   ├── sample-1/             # 📄 Outras páginas públicas
│   │   └── sample-2/
│   │
│   └── (auth)/                   # 🔒 Rotas protegidas (com auth)
│       ├── layout.tsx            # Layout para rotas autenticadas
│       ├── sample-3/             # 📄 Páginas protegidas
│       └── sample-4/
│
├── components/                   # 🧩 Componentes reutilizáveis
│   ├── structure/                # 🏗️ Componentes estruturais
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   │
│   └── ui/                       # 🎨 Componentes de interface
│       ├── button/
│       ├── input/
│       └── modal/
│
├── views/                        # 📱 Views/estruturas de páginas
│   ├── home/                     # 🏠 Página inicial (public)
│   ├── sample-1/                 # 📄 Sample 1 (public)
│   ├── sample-2/                 # 📄 Sample 2 (public)
│   ├── sample-3/                 # 🔒 Sample 3 (auth)
│   └── sample-4/                 # 🔒 Sample 4 (auth)
│
├── constants/                    # 📊 Constantes da aplicação
├── hooks/                        # 🎣 Custom hooks reutilizáveis
├── services/                     # 🔧 Serviços e integrações de API
├── stores/                       # 🗃️ Stores do Zustand
├── styles/                       # 🎨 Estilos globais e temas
├── typings/                      # 📝 Definições de tipos globais
└── utils/                        # 🛠️ Funções utilitárias

/public/                          # 📁 Arquivos estáticos (raiz do projeto)
├── images/                       # 🖼️ Imagens (logos, ícones, fotos)
├── icons/                        # 🎯 Ícones e favicons
├── documents/                    # 📄 PDFs, documentos para download
├── favicon.ico                   # 🌐 Favicon principal
├── robots.txt                    # 🤖 Instruções para crawlers
└── sitemap.xml                   # 🗺️ Mapa do site
```

### Organização por Funcionalidade

Tanto **components** quanto **views** seguem a mesma estrutura padrão:

#### 🧩 Estrutura de Component

```
button/
├── button.tsx                   # 📄 Componente principal
├── button.test.tsx              # 🧪 Testes unitários
├── button.type.ts               # 📝 Tipos específicos
└── index.ts                     # 📤 Arquivo de exportação
```

#### 📱 Estrutura de View

```
home/
├── home.tsx                     # 📄 View principal
├── home.test.tsx                # 🧪 Testes unitários
├── home.type.ts                 # 📝 Tipos específicos
├── home.store.ts                # 🗃️ Store específico (se necessário)
├── home.query.ts                # 🔍 Queries/API calls (se necessário)
├── components/                  # 🧩 Componentes internos da view
│   └── hero-section/
│       ├── hero-section.tsx
│       ├── hero-section.test.tsx
│       └── index.ts
└── index.ts                     # 📤 Arquivo de exportação
```

#### 📋 Arquivos Opcionais

- `.store.ts` - Para views que precisam de estado específico
- `.query.ts` - Para views com chamadas de API específicas
- `/components/` - Para componentes que só existem dentro desta view

---

## 📝 Convenções de Código

### 🏷️ Nomenclatura

| Tipo                      | Convenção           | Exemplo                                  |
| ------------------------- | ------------------- | ---------------------------------------- |
| **Arquivos e Diretórios** | `kebab-case`        | `user-profile.tsx`, `auth-service/`      |
| **Variáveis e Funções**   | `camelCase`         | `userName`, `handleSubmit()`             |
| **Componentes**           | `PascalCase`        | `Button`, `Modal`, `Header`              |
| **Views**                 | `View + PascalCase` | `ViewHome`, `ViewSample1`, `ViewProfile` |
| **Páginas Next.js**       | `Page + PascalCase` | `PageHome`, `PageSample1`, `PageProfile` |
| **Interfaces**            | `I + PascalCase`    | `IUserData`, `IButtonProps`              |
| **Types**                 | `T + PascalCase`    | `TButtonVariant`, `TApiResponse`         |
| **Constantes**            | `UPPER_SNAKE_CASE`  | `API_BASE_URL`, `MAX_ATTEMPTS`           |

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

### 🤔 Quando Usar Interface vs Type

| Uso                       | Interface (I)         | Type (T)                 |
| ------------------------- | --------------------- | ------------------------ |
| **Estruturas de objetos** | ✅ `IUser`, `IProps`  | ❌                       |
| **Unions/Literals**       | ❌                    | ✅ `TStatus`, `TVariant` |
| **Utilitários**           | ❌                    | ✅ `TApiResponse<T>`     |
| **Extensão**              | ✅ Pode ser estendida | ❌ Não extensível        |
| **Performance**           | ✅ Melhor para TS     | ⚡ Alias simples         |

### 🎯 Padrão de Sufixos

```typescript
// ✅ Correto - Sufixos consistentes (padrão atual)
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

---

## 🛠 Tecnologias Utilizadas

### Core Stack

- **Next.js** - Framework React full-stack com SSR/SSG
- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

### State & Data

- **React State** - Hooks nativos (useState, useReducer) para gerenciamento de estado local
- **Context API** - Para estado global quando necessário

> 💡 **Recomendação**: Para projetos que crescem, considere adicionar **Zustand** ou **Redux Toolkit** para gerenciamento de estado mais robusto.

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
- 🔗 **Conectam stores, APIs, etc.**

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

### 🗺️ Mapeamento Rotas → Views

A estrutura de rotas tem correspondência direta com as views:

| Rota                                      | View                              | Tipo           |
| ----------------------------------------- | --------------------------------- | -------------- |
| `app/(routes)/(public)/(home)/page.tsx`   | `views/home/` → `ViewHome`        | 🌐 Pública     |
| `app/(routes)/(public)/sample-1/page.tsx` | `views/sample-1/` → `ViewSample1` | 🌐 Pública     |
| `app/(routes)/(public)/sample-2/page.tsx` | `views/sample-2/` → `ViewSample2` | 🌐 Pública     |
| `app/(routes)/(auth)/sample-3/page.tsx`   | `views/sample-3/` → `ViewSample3` | 🔒 Autenticada |
| `app/(routes)/(auth)/sample-4/page.tsx`   | `views/sample-4/` → `ViewSample4` | 🔒 Autenticada |

**Padrão:**

```
(routes)/[group]/[sample]/page.tsx  →  views/[sample]/  →  View[Sample]
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

---

## 📚 Exemplos Práticos

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
  // Props vazias para home, mas mantém consistência da estrutura
}

export interface IHeroSection {
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
// home.tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HeroSection } from '@/components/structure/hero-section'
import { IHomeProps } from './home.type'

const ViewHome = ({}: IHomeProps) => {
  const heroData = {
    title: 'Bem-vindo à Nossa Aplicação',
    subtitle: 'A solução perfeita para suas necessidades',
    ctaText: 'Começar Agora'
  }

  const features = [
    {
      id: '1',
      icon: '🚀',
      title: 'Rápido',
      description: 'Performance otimizada'
    },
    {
      id: '2',
      icon: '🔒',
      title: 'Seguro',
      description: 'Dados protegidos'
    },
    {
      id: '3',
      icon: '📱',
      title: 'Responsivo',
      description: 'Qualquer dispositivo'
    }
  ]

  return (
    <div className="min-h-screen">
      <HeroSection {...heroData} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que nos escolher?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.id} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <Button size="lg">
            Criar Conta Grátis
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
export type { IHomeProps, IHeroSection, IFeature } from './home.type'
```

#### 3. Usando a View na Rota

```typescript
// app/(routes)/(public)/(home)/page.tsx
import ViewHome from '@/app/views/home'

const PageHome = () => {
  return <ViewHome />
}

export default PageHome

// Metadados da página
export const metadata = {
  title: 'Bem-vindo | Minha Aplicação',
  description: 'Página inicial da nossa aplicação incrível'
}
```

### 🛣️ Roteamento Next.js

#### Estrutura de Rotas

```typescript
// app/(routes)/(public)/sample-1/page.tsx
import ViewSample1 from '@/app/views/sample-1'

const PageSample1 = () => {
  return <ViewSample1 />
}

export default PageSample1

// Metadados da página
export const metadata = {
  title: 'Sample 1 | Minha Aplicação',
  description: 'Página de exemplo 1 da nossa aplicação'
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

**Como funciona:**

- Todas as páginas em `(public)/` usam este layout
- `children` = conteúdo da página específica (ViewHome, ViewSample1, etc.)
- Header e Footer aparecem em todas as páginas públicas
- Layout é aplicado automaticamente pelo Next.js

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

### 📁 Arquivos Estáticos (Public Directory)

#### Estrutura Recomendada

```
public/
├── images/                      # 🖼️ Imagens gerais
│   ├── hero/                    # Imagens de hero sections
│   ├── samples/                 # Fotos de amostras/exemplos
│   └── backgrounds/             # Imagens de fundo
│
├── icons/                       # 🎯 Ícones e favicons
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── apple-touch-icon.png
│
├── documents/                   # 📄 Arquivos para download
│   ├── terms-of-service.pdf
│   └── privacy-policy.pdf
│
├── favicon.ico                  # 🌐 Favicon principal
├── robots.txt                   # 🤖 SEO - Instruções para crawlers
└── sitemap.xml                  # 🗺️ SEO - Mapa do site
```

#### Como Usar no Código

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
  src="/icons/user-avatar.svg"
  alt="Avatar"
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

**Benefícios do next/image:**

- 🚀 **Lazy loading** automático
- 📱 **Responsivo** por padrão
- 🎨 **Otimização** de formato (WebP, AVIF)
- ⚡ **Performance** melhorada
- 📐 **Evita layout shift**

#### 🤔 Quando Usar Cada Abordagem

| Cenário                     | Use next/image    | Use `<img>`     |
| --------------------------- | ----------------- | --------------- |
| **Fotos/imagens grandes**   | ✅ Sempre         | ❌              |
| **Ícones pequenos (<24px)** | ⚠️ Opcional       | ✅ Recomendado  |
| **SVGs simples**            | ⚠️ Depende        | ✅ Mais prático |
| **Imagens responsivas**     | ✅ Sempre         | ❌              |
| **Above-the-fold**          | ✅ Com `priority` | ❌              |
| **Background images**       | ❌ Não suporta    | ✅ Via CSS      |

### 📂 Organização de Imports

```typescript
// ✅ Ordem correta dos imports
import React from 'react' // 1. React sempre primeiro
import { create } from 'zustand' // 2. Bibliotecas externas (node_modules)

import { Button } from '@/components/ui/button' // 3. Imports internos (absolutos @/)
import { Header } from '@/components/structure/header'
import { useAuthStore } from '@/stores/auth.store'

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
