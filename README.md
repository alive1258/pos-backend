<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 📦 POS & Inventory Management System – Backend

This is the backend of a comprehensive full-stack Point-of-Sale (POS) and Inventory Management System built with NestJS, PostgreSQL, and TypeORM. It serves as the backbone for managing products, inventory, user authentication, and processing sales transactions.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- `Clone the Repository:`

```js
git clone https://github.com/alive1258/pos-backend

```

- `Navigate to Project Directory:`

```js
cd [Project Directory]
```

- `Create a .env.development file in the root folder of the frontend project.`
- `Add the following environment variable`

```js
 # AWS S3 Bucket
S3_BUCKET=your-s3-bucket-name

# PostgreSQL Database Configuration
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_USER=your-database-username
DB_PASS=your-database-password
DB_NAME=your-database-name
DB_SYNC=true
DB_AUTO_LOAD_ENTITIES=true

# Profile Management
PROFILE_API_KEY=your-profile-api-key

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_TOKEN_AUDIENCE=your-token-audience
JWT_TOKEN_ISSUER=your-token-issuer
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=864600

# API Version
API_VERSION=0.1.1

# Email Configuration (SMTP)
MAIL_HOST=your-mail-host
MAIL_PORT=your-mail-port
MAIL_SECURE=true
SMTP_USERNAME=your-email-username
SMTP_PASSWORD=your-email-password


```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Technologies Used

This project uses a modern tech stack for building a scalable, secure, and performant full-stack application.

## Tech Stack (Backend)

```bash
| Category          | Technologies & Libraries |
| ----------------- | ------------------------ |
| **Framework**     | NestJS                   |
| **Database**      | PostgreSQL + TypeORM     |
| **Validation**    | class-validator, Joi     |
| **Security**      | JWT, bcrypt              |
| **Rate Limiting** | @nestjs/throttler        |
| **HTTP Client**   | Axios                    |
| **Email Service** | Nodemailer               |
| **Config Mgmt**   | @nestjs/config, dotenv   |

```

## 📡 API Requirements (Backend - NestJS)

These are the core RESTful API endpoints required for the POS & Inventory Management system:

Product Endpoints

- `GET /products`
  -🔹 Fetch all available products.
  -📌 Used to display product listings.

- `POST /products`
  - 🔹 Create a new product entry.
    -📝 Required fields: `name`, `code`, `price`, `stockQty`.

-`GET /products/search?q=milk`
-🔹 Search for products by name or code (partial match supported).
-📌 Helps users quickly find items in the inventory.

- `PUT /products/:id`
  -🔹 Update product information (e.g., name, price, stock quantity).
  -📌 Mainly used for stock adjustments or price updates.

  ## 🧾 Sales / POS Endpoints

  -`POST /sales`
  -🔹 Accepts cart items from the frontend, processes the order, and:

  -Reduces stock quantity of the sold products

  -Records the sale transaction

  -Optionally triggers confirmation messages

### 🚀⚙️ Backend (NestJS)

- **[NestJS](https://nestjs.com/)** – NestJS – Progressive Node.js framework for building efficient and scalable server-side applications.
  - `@nestjs/common`
  - `@nestjs/core`
  - `@nestjs/platform-express`

### ⚙️ Configuration & Utilities

- `@nestjs/config` – For environment-based configuration management.
- `@nestjs/throttler` – Rate-limiting to prevent abuse.
- `cookie-parser` – Parse HTTP request cookies.
- `cross-env` – Set environment variables across platforms.

### 🔐 Authentication & Authorization

- `@nestjs/jwt` – JWT utilities for authentication.
- `bcrypt` – For hashing and verifying passwords.

### 🧠 Data Validation & Transformation

- `class-validator` – For request validation using decorators.
- `class-transformer` – For transforming and exposing class properties.
- `joi` – Schema description and validation.

### 🗃️ Database & ORM

- **PostgreSQL** – Relational database.
  - `pg` – PostgreSQL client for Node.js.
- **TypeORM** – ORM for TypeScript and JavaScript.
  - `@nestjs/typeorm`
  - `typeorm`

### 📦 API & HTTP Clients

- `@nestjs/axios` – Axios integration for NestJS.
- `axios` – Promise-based HTTP client.

### 📧 Email Support

- `nodemailer` – For sending emails.

### 🧪 API Documentation

- `@nestjs/swagger` – Swagger (OpenAPI) integration for automatic API documentation.

```bash
-After running the project, you can view the API documentation in your browser at:
$ http://localhost:5000/api/v1/swagger

```

### 🧵 Observables & Streams

- `rxjs` – Reactive Extensions for JavaScript.

### 🧱 Decorator Support

- `reflect-metadata` – Used by TypeScript decorators.

---

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
