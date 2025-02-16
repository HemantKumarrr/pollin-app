# Polling App

## Description

A simple polling application that allows users to create polls with multiple options, vote on polls, and view real-time results. The application is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database.

## Features

- Create a poll with a question and multiple options.
- Vote on a poll.
- View poll results in real-time (auto-refresh every 5 seconds).
- Recreate a poll.

## API Endpoints

### **Poll Management**

#### **Create a Poll**

**Endpoint:** `POST /api/poll`
**Description:** Creates a new poll.
**Request Body:**

```json
{
  "question": "Your poll question",
  "options": ["Option 1", "Option 2", "Option 3"]
}
```

**Response:**

```json
{
  "_id": "pollId",
  "question": "Your poll question",
  "options": ["Option 1", "Option 2", "Option 3"],
  "votes": { "Option 1": 0, "Option 2": 0, "Option 3": 0 }
}
```

#### **Get Latest Poll**

**Endpoint:** `GET /api/poll`
**Description:** Fetches the latest poll.
**Response:**

```json
{
  "_id": "pollId",
  "question": "Your poll question",
  "options": ["Option 1", "Option 2", "Option 3"],
  "votes": { "Option 1": 3, "Option 2": 5, "Option 3": 2 }
}
```

#### **Vote on a Poll**

**Endpoint:** `POST /api/vote`
**Description:** Registers a vote for a poll option.
**Request Body:**

```json
{
  "option": "Option 1"
}
```

**Response:**

```json
{
  "message": "Vote recorded successfully"
}
```

## Database Schema (MongoDB)

### **Poll Schema**

```js
const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  votes: { type: Map, of: Number, default: {} },
});
```

## Installation

1. Clone the repository:

```sh
git clone https://github.com/HemantKumarrr/pollin-app.git
```

2. Install dependencies:

```sh
cd polling-app
npm install
```

3. Start the backend:

```sh
npm run server
```

4. Start the frontend:

```sh
npm start
```

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
