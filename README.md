# Coding Challenge Game Manager

## Setup and Run

### 1. Start services with Docker Compose

Make sure you have Docker and Docker Compose installed.

From the project root, run:

```bash
docker-compose up -d
```

### 2. Initialize the database with Prisma

Go to the backend folder:

```bash
cd backend
```

Run the following commands to generate Prisma client and push your schema to the database:

```bash
npx prisma generate
npx prisma db push
```

### 3. Run the backend (NestJS)

From the backend directory, start the NestJS development server:

```bash
npm run start:dev
```

### 4. Run the frontend (Angular)

Open a new terminal window/tab, go to the frontend directory, and start Angular dev server:

```bash
cd frontend
ng serve
```

By default, the frontend will run on [http://localhost:4200](http://localhost:4200).

