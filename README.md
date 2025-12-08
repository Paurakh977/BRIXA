<div align="center">
  <img src="apps/web/public/logo/brixanp-285X285.png" alt="BRIXA Logo" width="200" height="200" style="border-radius: 50%;">
  <h1>BRIXA Platform</h1>
  <p><b>Revolutionizing Construction & Civil Engineering with Transparency & Efficiency</b></p>
</div>

<div align="center">

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,nestjs,tailwind,python,fastapi,postgres,redis,prisma,docker,git)](https://skillicons.dev) <img src="https://media.licdn.com/dms/image/v2/D4E0BAQHCopb-ejXUBg/company-logo_200_200/company-logo_200_200/0/1705679347367/turborepo_logo?e=2147483647&v=beta&t=BW1bX1ERO69bKD_dXNKXE68ZdajhQmVcLRTf-AYTf5g" alt="Turbo" height="52" style="vertical-align:middle; margin-left:6px;margin-bottom:40px;" />
<img src="https://github.com/qdrant/qdrant/raw/master/docs/logo.svg" alt="Qdrant" height="32" style="vertical-align:middle; margin-left:6px;margin-bottom:40px;" />

</div>

---

##  Table of Contents

- [Overview](#overview)
- [Tech Stack & Architecture](#tech-stack--architecture)
  - [Workspace Structure](#workspace-structure)
  - [Turbo Pipeline](#️turbo-pipeline)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)

---

##  Overview

BRIXA is a comprehensive SaaS platform designed to revolutionize the construction and civil engineering ecosystem. It establishes a transparent, efficient, and interconnected digital environment for all industry stakeholders, from government bodies and large construction firms to individual homeowners and daily wage laborers.

##  Tech Stack & Architecture

This project is built as a **high-performance Monorepo** using [Turborepo](https://turbo.build/).

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white) | React framework for the web application. |
| **Backend** | ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat-square&logo=nestjs&logoColor=white) | Scalable Node.js framework for the main API. |
| **AI/ML Service** | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi) | Python FastAPI for AI/ML microservices. |
| **Database** | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) | Primary relational database. |
| **Vector Store DB** | <img src="https://github.com/qdrant/qdrant/raw/master/docs/logo.svg" alt="Qdrant" height="24" /> | High-performance vector database for semantic search & embeddings. |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) | Next-generation ORM for Node.js and TypeScript. |
| **Caching** | ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=flat-square&logo=redis&logoColor=white) | In-memory data structure store for caching & queues. |
| **Containerization** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerizing services for consistent deployment. |
| **Monorepo** | <img src="https://media.licdn.com/dms/image/v2/D4E0BAQHCopb-ejXUBg/company-logo_200_200/company-logo_200_200/0/1705679347367/turborepo_logo?e=2147483647&v=beta&t=BW1bX1ERO69bKD_dXNKXE68ZdajhQmVcLRTf-AYTf5g" alt="Turborepo" height="44" /> | High-performance build system for JavaScript/TypeScript. |

###  Workspace Structure

The codebase follows a structured **Monorepo** architecture, separating concerns between applications and shared packages.

#### **Apps (`/apps`)**
The core applications that power the BRIXA platform.

| App | Package Name | Description | Tech Details |
| :--- | :--- | :--- | :--- |
| **Web** | `web` | The main frontend application. | **Next.js 15**, React 19, Tailwind CSS, Framer Motion. Handles SSR/SSG and client interactions. |
| **API** | `api` | The primary backend service. | **NestJS 11**, Prisma ORM. Serves as the API gateway and handles business logic. |

#### **Packages (`/packages`)**
Shared libraries and configurations used across the monorepo to ensure consistency and code reuse.

| Package | Package Name | Description |
| :--- | :--- | :--- |
| **Shared API** | `@BRIXA/api` | Shared DTOs, types, and interfaces between the frontend and backend to ensure type safety across the network boundary. |
| **UI Library** | `@BRIXA/ui` | A shared React component library containing reusable UI elements (Buttons, Cards, etc.) to maintain a consistent design system. |
| **Utils** | `@BRIXA/utils` | Common utility functions, including class name merging helpers (`clsx`, `tailwind-merge`) for UI components. |
| **Prisma Config** | `@BRIXA/prisma-config` | Centralized Prisma schema and configuration for database management. |
| **ESLint Config** | `@BRIXA/eslint-config` | Shared ESLint configurations to enforce code quality and consistent coding standards. |
| **TS Config** | `@BRIXA/typescript-config` | Shared `tsconfig.json` bases (base, nextjs, nestjs) to maintain consistent compiler options. |
| **Tailwind Config** | `@BRIXA/tailwind-config` | Shared Tailwind CSS configuration to ensure consistent styling tokens across apps. |
| **Jest Config** | `@BRIXA/jest-config` | Shared Jest testing configurations for unit and integration tests. |

###  Turbo Pipeline

We use **Turborepo** to orchestrate tasks. The `turbo.json` file defines the pipeline:

-   **Parallel Execution**: Tasks like `lint`, `build`, and `test` run in parallel across all workspaces.
-   **Caching**: Turbo caches the output of tasks. If you run `pnpm build` twice, the second time will be instant!
-   **Dependency Graph**: Turbo understands that `web` depends on `@BRIXA/ui`, so it builds the UI library before the web app.

---

##  Project Structure

```
BRIXA/
├── .vscode/                      # VS Code workspace settings
│   └── settings.json
├── apps/                         # Application workspaces
│   ├── api/                      # NestJS Backend API
│   │   ├── src/
│   │   │   ├── links/           # Links module (example feature)
│   │   │   │   ├── links.controller.ts
│   │   │   │   ├── links.service.ts
│   │   │   │   └── links.module.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── test/                # E2E tests
│   │   ├── Dockerfile.dev       # Development Docker config
│   │   ├── Dockerfile.prod      # Production Docker config
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── server/                   # Python FastAPI Server (AI/ML)
│   │   ├── main.py
│   │   ├── pyproject.toml       # Python dependencies (uv)
│   │   ├── Dockerfile.dev
│   │   ├── Dockerfile.prod
│   │   └── .python-version
│   │
│   └── web/                      # Next.js Frontend
│       ├── public/
│       │   └── logo/            # Brand assets
│       ├── src/
│       │   ├── app/             # Next.js 15 App Router
│       │   │   ├── draft_1/     # Draft pages (development)
│       │   │   ├── draft_2/
│       │   │   ├── draft_3/
│       │   │   ├── draft_4/
│       │   │   ├── draft_5/
│       │   │   ├── draft_6/
│       │   │   ├── fonts/       # Custom fonts
│       │   │   ├── styles/      # Global styles
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components/      # React components
│       │   ├── lib/             # Utility functions
│       │   ├── services/        # API services
│       │   └── types/           # TypeScript types
│       ├── Dockerfile.dev
│       ├── Dockerfile.prod
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── package.json
│
├── packages/                     # Shared packages
│   ├── api/                      # Shared API types & DTOs
│   │   └── src/
│   │       ├── links/
│   │       │   ├── dto/
│   │       │   └── entities/
│   │       └── entry.ts
│   │
│   ├── ui/                       # Shared React component library
│   │   └── src/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── code.tsx
│   │       ├── first_button.tsx
│   │       ├── first_card.tsx
│   │       ├── second_button.tsx
│   │       ├── second_card.tsx
│   │       ├── fifth_button.tsx
│   │       └── fifth_card.tsx
│   │
│   ├── utils/                    # Shared utility functions
│   │   └── src/
│   │       └── index.ts
│   │
│   ├── Database/            # Shared Prisma schema
│   │
│   ├── eslint-config/            # Shared ESLint configs
│   │   ├── base.js
│   │   ├── library.js
│   │   ├── nest.js
│   │   ├── next.js
│   │   ├── react-internal.js
│   │   └── prettier-base.js
│   │
│   ├── jest-config/              # Shared Jest configs
│   │   └── src/
│   │       ├── base.ts
│   │       ├── nest.ts
│   │       └── next.ts
│   │
│   ├── tailwind-config/          # Shared Tailwind config
│   │   ├── tailwind.config.js
│   │   └── postcss.config.mjs
│   │
│   └── typescript-config/        # Shared TypeScript configs
│       ├── base.json
│       ├── nestjs.json
│       ├── nextjs.json
│       └── react-library.json
│
├── .dockerignore                 # Docker ignore patterns
├── .eslintrc.mjs                 # Root ESLint config
├── .npmrc                        # npm configuration
├── .prettierrc.mjs               # Prettier config
├── Docker-compose.yml            # Multi-container setup
├── LICENCE                       # Project license
├── package.json                  # Root package.json
├── pnpm-lock.yaml                # Lock file for dependencies
├── pnpm-workspace.yaml           # pnpm workspace config
├── README.md                     # This file
├── tsconfig.json                 # Root TypeScript config
└── turbo.json                    # Turborepo configuration
```

## 🏁 Getting Started

Follow this guide to set up the project locally.

### Prerequisites

-   **Node.js** (>= 18)
-   **pnpm** (Recommended Package Manager)
    ```bash
    npm install -g pnpm
    ```
-   **Turbo** (Global CLI)
    ```bash
    npm install -g turbo
    ```

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Paurakh977/BRIXA.git
    cd BRIXA
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

### Running the Project

To start the development environment with Turbo:

```bash
pnpm start
```

This command runs the `start` script in `package.json`, which triggers `turbo run start`.
It will launch:
-   **NestJS API**: `http://localhost:3000`
-   **Next.js Web**: `http://localhost:3001`

> **Note**: The `dev` script (`pnpm dev`) is also available for development mode with hot-reloading.

---

##  Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts all apps in development mode (`turbo run dev`). |
| `pnpm build` | Builds all apps and packages (`turbo run build`). |
| `pnpm start` | Builds and starts production servers (`turbo run start`). |
| `pnpm lint` | Runs ESLint across the entire monorepo. |
| `pnpm format` | Formats code using Prettier. |
| `pnpm test` | Runs tests across all packages. |

---

<div align="center">
  <sub>Built by the BRIXA Team</sub>
</div>
