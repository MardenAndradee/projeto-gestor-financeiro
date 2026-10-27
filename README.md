# FinUp — Gestor Financeiro

Aplicação web para controle de despesas pessoais, desenvolvida em projeto de extensão universitária para um cliente real. Back-end em **Java + Spring Boot** e front-end em **Next.js + React + TypeScript**.

## Funcionalidades

- **Autenticação** com JWT (Spring Security), cadastro de usuário e recuperação de senha por e-mail
- **Despesas** com data, categoria, valor, descrição e responsável, com filtros por critério
- **Categorias** personalizáveis
- **Parcelamento** de despesas
- **Gráficos** de fluxo de gastos (Recharts)
- **Exportação para Excel** (Apache POI)
- **Documentação da API** com Swagger (springdoc-openapi)

## Stack

| Camada | Tecnologias |
|---|---|
| Back-end | Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, Spring Mail, Maven |
| Front-end | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Recharts |
| Banco | PostgreSQL |

## Estrutura

```
src/
├── main/java/com/mofc/financeiro/   # API Spring Boot
│   ├── controllers/  services/  repositories/  entities/  dtos/
│   ├── infra/security/              # JWT + Spring Security
│   ├── email/                       # recuperação de senha
│   └── excel/                       # exportação de despesas
├── frontend/                        # app Next.js
└── test/
```

## Como rodar localmente

Pré-requisitos: **Java 17+**, **Node.js 18+** e **PostgreSQL**.

### 1. Banco e variáveis de ambiente

Crie um banco no Postgres e configure as variáveis listadas em [`.env.example`](.env.example) (como env vars ou na Run Configuration da IDE):

| Variável | Descrição |
|---|---|
| `DB_URL` | ex.: `jdbc:postgresql://localhost:5432/projeto` |
| `DB_USERNAME` / `DB_PASSWORD` | credenciais do banco |
| `JWT_SECRET` | segredo de assinatura do token |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | conta SMTP (Gmail) usada na recuperação de senha |

### 2. Back-end

```bash
./mvnw spring-boot:run
```

A documentação da API fica em `http://localhost:8080/swagger-ui.html`.

### 3. Front-end

```bash
cd src/frontend
npm install
npm run dev   # http://localhost:3000
```

Para testar, cadastre um usuário e faça login.

## Equipe

- **Marden Andrade** e **Carlos**: back-end, banco de dados e integração com o front-end
- **Felipe** e **Otávio**: front-end e estilização
