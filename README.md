# Next.js Front-End Template

Uma base completa e escalável para aplicações web modernas, com Next.js 15, React 19 e Tailwind CSS 4. Este template oferece estrutura pronta para produção com as melhores práticas incorporadas, permitindo que equipes iniciem rapidamente novos projetos sem se preocupar com decisões de configuração e arquitetura.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Sistema de Rotas](#sistema-de-rotas)
- [Autenticação com Auth.js](#autenticação-com-authjs)
- [Convenções de Código](#convenções-de-código)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Linting e Formatação](#linting-e-formatação)
- [Commits](#commits)
- [Ambientes](#ambientes)
- [Tecnologias](#tecnologias)
- [Contribuição](#contribuição)

## 🔍 Visão Geral

Este projeto utiliza o App Router do Next.js para criar uma aplicação web moderna com rotas públicas e autenticadas, componentes reutilizáveis e arquitetura escalável.

## 🛠️ Pré-requisitos

- Node.js v22.15.1
- npm 10.9.2

Recomendamos o uso de nvm para garantir a versão correta do Node.js:

```bash
# Instalar a versão correta do Node.js usando nvm
nvm install
# Usar a versão definida no arquivo .nvmrc
nvm use
```

## 🚀 Instalação

Para instalar e executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
/app                   # Centro de código principal para aplicação Next.js usando App Router
├── (routes)           # Conjunto organizado de todas as páginas e rotas navegáveis
│   ├── api            # Backend da aplicação com endpoints para requisições HTTP
│   │   └── auth       # (Exemplo: /api/auth/[...nextauth]/route.ts)
│   │   └── users      # (Exemplo: /api/users/route.ts)
│   ├── (public)       # Páginas abertas que qualquer visitante pode acessar
│   │   └── home       # (Exemplo: /app/(routes)/(public)/home/page.tsx)
│   │   │   └── queries # (Exemplo: queries utilizadas pela rota home)
│   │   │       └── featured-products.query.ts # (Exemplo: query para buscar produtos destacados)
│   │   └── about      # (Exemplo: /app/(routes)/(public)/about/page.tsx)
│   │   │   └── queries # (Exemplo: queries utilizadas pela rota about)
│   │   │       └── team-members.query.ts # (Exemplo: query para buscar membros da equipe)
│   │   └── contact    # (Exemplo: /app/(routes)/(public)/contact/page.tsx)
│   └── (auth)         # Páginas protegidas que exigem login para acesso
│       └── dashboard  # (Exemplo: /app/(routes)/(auth)/dashboard/page.tsx)
│       │   └── queries # (Exemplo: queries utilizadas pela rota dashboard)
│       │       └── dashboard-data.query.ts # (Exemplo: query para buscar dados do dashboard)
│       └── profile    # (Exemplo: /app/(routes)/(auth)/profile/page.tsx)
│           └── queries # (Exemplo: queries utilizadas pela rota profile)
│               └── user-profile.query.ts # (Exemplo: query para buscar perfil do usuário)
├── components         # Blocos de construção reutilizáveis da interface do usuário
│   ├── index.ts       # Exporta todos os componentes principais
│   ├── ui/            # Componentes UI genéricos
│   │   ├── index.ts   # Exporta todos os componentes UI
│   │   └── button/    # (Exemplo: button.tsx, button.test.tsx, index.ts)
│   │   └── input/     # (Exemplo: input.tsx, input.test.tsx, index.ts)
│   │   └── card/      # (Exemplo: card.tsx, card.test.tsx, index.ts)
│   └── pages/         # Componentes específicos para páginas
│       ├── index.ts   # Exporta todos os componentes de páginas
│       └── home/      # (Exemplo: home.tsx, home.test.tsx, home.type.ts, home.store.ts, index.ts)
│           └── components/ # (Exemplo: components/hero/hero.tsx, components/hero/hero.test.tsx, components/hero/hero.type.ts, components/hero/index.ts)
│       └── about/     # (Exemplo: about.tsx, about.test.tsx, about.type.ts, index.ts)
│           └── components/   # (Exemplo: components/team/team.tsx, components/team/team.test.tsx, components/team/team.type.ts, components/team/index.ts)
│       └── dashboard/ # (Exemplo: dashboard.tsx, dashboard.test.tsx, dashboard.type.ts, dashboard.store.ts, index.ts)
├── constants          # Valores fixos que não mudam durante a execução da aplicação
│   └── index.ts       # (Exemplo: exporta todas as constantes)
├── hooks              # Funções especiais do React para compartilhar lógica entre componentes
│   └── index.ts       # (Exemplo: exporta todos os hooks)
├── services           # Funções que encapsulam lógica de comunicação com recursos externos ou internos
│   └── index.ts       # (Exemplo: exporta todos os serviços)
├── stores             # Gerenciadores de estado global para dados compartilhados
│   ├── index.ts       # (Exemplo: exporta todos os stores)
│   └── user.store.ts  # (Exemplo: store para dados do usuário)
├── styles             # Aparência visual e temas da aplicação
│   └── index.ts       # (Exemplo: exporta estilos e temas)
├── typings            # Definições de tipos TypeScript para uso em toda a aplicação
│   └── index.ts       # (Exemplo: exporta todos os tipos comuns)
└── utils              # Ferramentas auxiliares para tarefas comuns de processamento
    ├── index.ts       # (Exemplo: exporta todas as funções utilitárias)
    └── format/        # (Exemplo: funções de formatação)
        ├── index.ts   # (Exemplo: exporta todas as funções de formatação)
        └── date.util.ts # (Exemplo: funções para formatação de datas)
/public                # Recursos estáticos como imagens e arquivos para download
```

### Estrutura de Componentes

A organização de componentes segue um padrão modular e escalável, otimizado para manutenção a longo prazo e testabilidade:

#### Componentes de Página e Subcomponentes

1. **Pastas dedicadas para cada página**:

   - Cada página possui sua própria pasta dentro de `components/pages/`
   - Exemplo: `components/pages/home/`, `components/pages/about/`

2. **Arquivos relacionados agrupados**:

   - O componente principal da página é acompanhado por arquivos de teste, tipo e store
   - Exemplo: `home.tsx`, `home.test.tsx`, `home.type.ts`, `home.store.ts`
   - Este agrupamento facilita a localização e manutenção de todos os arquivos relacionados

3. **Subpastas de componentes**:

   - Componentes específicos da página são organizados em uma subpasta `components/`
   - Exemplo: `components/pages/home/components/`
   - Isso isola claramente os componentes que só são usados naquela página específica

4. **Componentes encapsulados**:

   - Cada subcomponente possui sua própria pasta dedicada
   - Exemplo: `components/pages/home/components/hero/`
   - Esta abordagem facilita a adição de assets, estilos ou utilitários específicos para o componente

5. **Princípio de Coesão**:

   - Arquivos de código, teste, tipo e store são mantidos juntos para cada componente
   - Exemplo: `hero.tsx`, `hero.test.tsx`, `hero.type.ts`
   - Esta organização reduz o tempo de busca e melhora a manutenção

6. **Stores Locais e Globais**:

   - Stores Zustand globais são armazenados em `/stores`
   - Stores específicos para componentes de página ficam junto ao componente
   - Exemplo: `dashboard.store.ts` contém estado específico para a página de dashboard
   - Exemplo global: `user.store.ts` para gerenciamento de estado do usuário em toda a aplicação

7. **Queries específicas para rotas**:

   - Cada rota contém um diretório `queries` com as consultas específicas daquela página
   - Exemplo: `/app/(routes)/(public)/home/queries/featured-products.query.ts`
   - Isso mantém a lógica de busca de dados próxima de onde é usada
   - Facilita o gerenciamento e a localização de queries específicas

8. **Uso de index.ts para exportações**:
   - Cada diretório (exceto nas rotas) contém um arquivo `index.ts` para simplificar importações
   - Exemplo: `components/ui/button/index.ts` exporta o componente Button
   - Permite importações mais limpas como `import { Button } from '@/components/ui/button'`
   - Cria uma API clara para cada módulo, ocultando detalhes de implementação
   - Facilita a refatoração sem afetar os consumidores dos módulos

#### Benefícios desta Estrutura

- **Isolamento e Escopo**: Componentes específicos de página ficam claramente separados dos componentes UI genéricos
- **Previsibilidade**: Padrão consistente em todo o projeto facilita encontrar e adicionar código
- **Testabilidade**: Arquivos de teste próximos ao código que testam simplifica a manutenção
- **Escalonamento**: Estrutura que suporta crescimento sem perder organização
- **Onboarding**: Novos desenvolvedores podem entender rapidamente a arquitetura do projeto
- **Gerenciamento de Estado**: Separação clara entre estado global e local com stores dedicados
- **Importações Simplificadas**: O uso de arquivos index.ts reduz a complexidade das importações e cria uma API limpa
- **Organização Hierárquica**: Estrutura em árvore que facilita encontrar componentes e funcionalidades relacionadas
- **Colocalização de Queries**: Queries específicas ficam próximas às rotas que as utilizam

## 🛣️ Sistema de Rotas

...
