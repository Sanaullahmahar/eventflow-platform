# EventFlow – Backend Setup Guide

## What was added

| File | Purpose |
|---|---|
| `server.js` | Express backend — handles POST `/api/quote` and saves to MySQL |
| `server-package.json` | Backend npm dependencies (rename to `package.json` in the backend folder) |
| `database.sql` | MySQL schema — run once in phpMyAdmin to create the table |

---

## Step 1 — Create the database (phpMyAdmin)

1. Open **http://localhost/phpmyadmin** (XAMPP must be running)
2. Click **SQL** tab at the top
3. Paste the entire contents of `database.sql` and click **Go**

This creates the `events_db` database and the `insurance_quotes` table.

---

## Step 2 — Set up the backend server

Create a separate folder for the backend (e.g. `eventflow-backend/`):

```bash
mkdir eventflow-backend
cd eventflow-backend

# Copy server.js into this folder, then:
cp ../eventflow-platform-main/server.js .
cp ../eventflow-platform-main/server-package.json ./package.json

npm install
```

Or directly in the project root:

```bash
cd eventflow-platform-main
npm install express mysql2 cors
node server.js
```

You should see:
```
Backend running on http://localhost:8000
```

---

## Step 3 — Run the React frontend

In a **separate terminal**:

```bash
cd eventflow-platform-main
npm install
npm run dev
```

The React app already points to `http://127.0.0.1:8000/api/quote` — no changes needed.

---

## How it works

```
React (Vite, port 5173)
      │
      │  POST /api/quote  (JSON payload)
      ▼
Express server (port 8000)
      │
      │  INSERT INTO insurance_quotes
      ▼
MySQL via XAMPP (port 3306)  →  events_db.insurance_quotes
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `ECONNREFUSED` on port 8000 | Make sure `node server.js` is running |
| `Unknown database 'events_db'` | Run `database.sql` in phpMyAdmin first |
| `ER_ACCESS_DENIED` | Check `user`/`password` in `server.js` `dbConfig` |
| CORS error in browser | The server already has `app.use(cors())` — confirm server is running |
