# AI Safety Incident Log API

A RESTful API service for logging and managing AI safety incidents.

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Clone the repository:
   \`\`\`
   git clone <repository-url>
   cd ai-safety-incident-log
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env` file based on the `.env.example` file:
   \`\`\`
   cp .env.example .env
   \`\`\`

4. Update the `.env` file with your MongoDB connection string if needed.

## Database Setup

### Option 1: Using the seed script

To populate the database with sample incidents:

\`\`\`
node utils/seed.js
\`\`\`

### Option 2: Manual setup

1. Start MongoDB locally:
   \`\`\`
   mongod
   \`\`\`

2. Connect to MongoDB and create a database:
   \`\`\`
   mongo
   use ai-safety-incidents
   \`\`\`

3. Insert sample incidents:
   \`\`\`
   db.incidents.insertMany([
     {
       title: "Unauthorized Data Access",
       description: "AI system accessed restricted user data without proper authorization.",
       severity: "High",
       reported_at: new Date("2025-03-15T10:30:00Z")
     },
     {
       title: "Biased Output Generation",
       description: "AI model produced biased outputs when processing demographic information.",
       severity: "Medium",
       reported_at: new Date("2025-03-20T14:45:00Z")
     },
     {
       title: "System Performance Degradation",
       description: "AI system showed unexpected performance degradation after latest update.",
       severity: "Low",
       reported_at: new Date("2025-04-01T09:15:00Z")
     }
   ])
   \`\`\`

## Running the Application

Start the server:

\`\`\`
npm start
\`\`\`

The API will be available at `http://localhost:3000`.

## API Endpoints

### 1. GET /incidents

Retrieves all incidents.

**Example Request:**
\`\`\`
curl -X GET http://localhost:3000/incidents
\`\`\`

**Example Response:**
\`\`\`json
[
  {
    "id": "60d21b4667d0d8992e610c85",
    "title": "Unauthorized Data Access",
    "description": "AI system accessed restricted user data without proper authorization.",
    "severity": "High",
    "reported_at": "2025-03-15T10:30:00.000Z"
  },
  {
    "id": "60d21b4667d0d8992e610c86",
    "title": "Biased Output Generation",
    "description": "AI model produced biased outputs when processing demographic information.",
    "severity": "Medium",
    "reported_at": "2025-03-20T14:45:00.000Z"
  }
]
\`\`\`

### 2. POST /incidents

Creates a new incident.

**Example Request:**
\`\`\`
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Incident Title",
    "description": "Detailed description here.",
    "severity": "Medium"
  }'
\`\`\`

**Example Response:**
\`\`\`json
{
  "id": "60d21b4667d0d8992e610c87",
  "title": "New Incident Title",
  "description": "Detailed description here.",
  "severity": "Medium",
  "reported_at": "2025-04-02T18:00:00.000Z"
}
\`\`\`

### 3. GET /incidents/{id}

Retrieves a specific incident by ID.

**Example Request:**
\`\`\`
curl -X GET http://localhost:3000/incidents/60d21b4667d0d8992e610c85
\`\`\`

**Example Response:**
\`\`\`json
{
  "id": "60d21b4667d0d8992e610c85",
  "title": "Unauthorized Data Access",
  "description": "AI system accessed restricted user data without proper authorization.",
  "severity": "High",
  "reported_at": "2025-03-15T10:30:00.000Z"
}
\`\`\`

### 4. DELETE /incidents/{id}

Deletes an incident by ID.

**Example Request:**
\`\`\`
curl -X DELETE http://localhost:3000/incidents/60d21b4667d0d8992e610c85
\`\`\`

**Example Response:**
Status: 204 No Content

### 5. PUT /incidents/{id}

Updates an incident by ID (additional functionality).

**Example Request:**
\`\`\`
curl -X PUT http://localhost:3000/incidents/60d21b4667d0d8992e610c86 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Incident Title",
    "description": "Updated description here.",
    "severity": "High"
  }'
\`\`\`

**Example Response:**
\`\`\`json
{
  "id": "60d21b4667d0d8992e610c86",
  "title": "Updated Incident Title",
  "description": "Updated description here.",
  "severity": "High",
  "reported_at": "2025-03-20T14:45:00.000Z"
}
\`\`\`

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Design Decisions

1. **MVC Architecture**: The project follows the Model-View-Controller pattern for better organization and separation of concerns.
2. **Validation**: Input validation is implemented at both the model level (using Mongoose schema validation) and the controller level.
3. **Error Handling**: Centralized error handling middleware to manage errors consistently.
4. **Environment Variables**: Configuration via environment variables for better security and flexibility.
5. **Additional Functionality**: Added a PUT endpoint for updating incidents, which wasn't explicitly required but provides a complete CRUD API.

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `dotenv`: Environment variable management
