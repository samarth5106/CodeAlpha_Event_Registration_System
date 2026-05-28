
---

# GatherUp | Full-Stack Event Registration System

A lightweight, high-performance full-stack web application engineered to manage event publishing and automate attendee seat reservations in real time. Built using **Node.js**, **Express**, and **MongoDB Atlas**, the platform features a responsive single-page client dashboard styled with **Tailwind CSS**. It enforces strict business logic to prevent duplicate bookings, handle seat-capacity limits, and secure administrative nodes with an integrated passcode verification gateway.

## 🚀 Key Features

* **Dynamic Event Synchronization:** Fetches and displays active events directly from a cloud database cluster, automatically calculating seat availability.
* **Atomic Registration Transaction Engine:** Enforces validation middleware logic that checks maximum event capacity and blocks duplicate entries by tracking unique email identities.
* **Bidirectional Database Relationships:** Interlinks data schemas using Mongoose ObjectIds, allowing events to track attendee rosters and users to track their individual bookings.
* **Role-Based Frontend Isolation:** Implements a secure admin passcode verification system (`Admin@123`) to conceal and protect event creation tools from public attendees.
* **Clean Architectural Separation:** Isolates database drivers, routing matrices, database schemas, and operation controllers into distinct, scannable files.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, JavaScript (Fetch API Engine), Tailwind CSS Engine (via Client CDN)
* **Backend Runtime:** Node.js
* **Web Framework:** Express.js
* **Database Modeling (ODM):** Mongoose
* **Cloud Database Environment:** MongoDB Atlas Cluster
* **Environment Configuration:** `dotenv`

---

## 📋 API Architecture Rules

### 1. Administrative Controls

| HTTP Method | Endpoint | Description | Expected Request Body |
| --- | --- | --- | --- |
| **POST** | `/api/events` | Registers and deploys a new event schema block onto the database | `{ "title": "Hackathon", "description": "...", "date": "2026-07-01", "maxCapacity": 80, "location": "Auditorium" }` |

### 2. General Public / Attendee Rules

| HTTP Method | Endpoint | Description | Request Parameters / Payloads |
| --- | --- | --- | --- |
| **GET** | `/api/events` | Pulls down all registered events sorted chronologically | None (Returns JSON array) |
| **POST** | `/api/events/register` | Verifies seat capacity, runs a duplicate lookup, and logs a seat | `{ "eventId": "64f...", "name": "Samarth", "email": "samarth@gmail.com" }` |

---

## ⚙️ Local Station Installation Guide

Follow these sequential instructions to run a local instance of the application on your workspace:

### 1. Clone the Workspace Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_EVENT_REG_REPO_NAME.git
cd YOUR_EVENT_REG_REPO_NAME

```

### 2. Pull Down Framework Dependencies

```bash
npm install

```

### 3. Establish Local Environment Variables

Create a file named `.env` in your root project directory (safely blocked from tracking by your `.gitignore` filters) and attach your environment string configurations:

```env
PORT=8002
MONGO_URL=mongodb+srv://<your_username>:<your_password>@cluster0.wrbdit4.mongodb.net/event_reg_db?appName=Cluster0

```

*(Make sure to swap out `<your_username>` and `<your_password>` with your specific cluster credentials, ensuring the `/event_reg_db` router path is declared to maintain clean database partitioning.)*

### 4. Ignite the Server Core

```bash
node index.js

```

Upon verification, your terminal logs will confirm active network tracking:

```text
Server started and tracking on PORT: 8002
MongoDB Connected Successfully for Event Reg App

```

### 5. Access the Client UI Platform

Open your browser and navigate to the local hosting node:

```text
http://localhost:8002

```

---

## 📂 Project Structural Tree

```text
Event_Registration/
├── connect.js          # Asynchronous Mongoose driver bridge configuration
├── index.js            # Central runtime entry engine, parsing configurations, and middleware
├── controllers/
│   └── events.js       # Core business logic processing transaction registrations and creations
├── models/
│   ├── events.js       # Validated schema blueprint configuration for Event data structures
│   └── users.js        # Validated schema blueprint configuration for User identity records
├── public/
│   └── index.html      # Secure, responsive Tailwind CSS frontend single-page application dashboard
├── routes/
│   └── events.js       # Network routing matrix forwarding endpoints directly to operational controllers
├── .env                # Local environmental private token variables (Ignored by Git)
├── .gitignore          # Rules ledger preventing leaks of node_modules and secret environment variables
└── package.json        # Main manifest registry ledger tracking project dependency packages

```