# Backend Portfolio

Spring Boot REST API behind Samarth Dhanaji Pawar's portfolio site. Currently
serves the contact form and a couple of health checks.

## Stack

- Java 21, Spring Boot 4.1 (Web MVC, Data JPA, Security, Validation, Mail, Actuator)
- PostgreSQL
- Gmail SMTP for outgoing notification email

## Run it

### Option A - Docker Compose (recommended)

Brings up Postgres and the API together, with the API rebuilt from source.

```bash
cp .env.example .env   # then fill in real values
docker compose up --build
```

The API is then available at `http://localhost:8080`. Data persists in a
named Docker volume across restarts; `docker compose down -v` wipes it.

### Option B - Maven, against a Postgres you already have running

```bash
export DB_PASSWORD=...
export MAIL_USERNAME=...
export MAIL_PASSWORD=...
export CONTACT_RECEIVER_EMAIL=...
./mvnw spring-boot:run
```

Requires a database named `Portfolio` to already exist on that Postgres
instance (case-sensitive - create it as `Portfolio`, not `portfolio`).

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `DB_URL` | no | `jdbc:postgresql://localhost:5432/Portfolio` | JDBC connection string |
| `DB_USERNAME` | no | `postgres` | Postgres user |
| `DB_PASSWORD` | **yes** | none | Postgres password |
| `MAIL_USERNAME` | **yes** | none | Gmail address used to send notifications |
| `MAIL_PASSWORD` | **yes** | none | Gmail App Password (not your account password) |
| `CONTACT_RECEIVER_EMAIL` | **yes** | none | Where contact-form messages get emailed to |
| `FRONTEND_URL` | no | `http://localhost:5173` | Origin allowed by CORS |
| `PORT` | no | `8080` | Port the API listens on |

## Endpoints

- `POST /api/contact` - body `{ name, email, phone?, subject, message }` -> `201` with `{ id, message, createdAt }`
- `GET /api/health` - basic liveness check
- `GET /actuator/health` - Spring Boot Actuator health check (status only, no details exposed)

## Notes

- `spring.jpa.hibernate.ddl-auto=update` auto-migrates the schema on boot.
  Fine at this scale; move to Flyway/Liquibase if the schema grows or more
  than one person starts touching this database.
- The public `/api/contact` endpoint has no rate limiting yet.
