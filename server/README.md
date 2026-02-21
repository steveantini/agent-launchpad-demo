# IBM CLG Custom Agents Analytics Server

A Node.js/Express backend server that tracks and stores analytics data for the IBM CLG Custom Agents website.

## Features

- **Click Tracking**: Records when users click on agent links
- **Real-time Analytics**: Provides dashboard metrics, top users, and clicks by agent
- **SQLite Database**: Lightweight, file-based database (no external dependencies)
- **RESTful API**: Clean API endpoints for all analytics operations

## Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` and serve both the static website files and the API endpoints.

## API Endpoints

### Track a Click
```
POST /api/track-click
Content-Type: application/json

{
  "agentName": "Revenue EA Review - Red Hat Paper",
  "agentCategory": "Revenue",
  "userEmail": "user@ibm.com",  // optional
  "userName": "John Doe"        // optional
}
```

### Get Dashboard Metrics
```
GET /api/analytics/metrics
```
Returns total interactions, daily/weekly active users, and repeat users with trend data.

### Get Top Users
```
GET /api/analytics/top-users?period=week|month|year
```
Returns the top users ranked by interaction count.

### Get Clicks by Agent
```
GET /api/analytics/clicks-by-agent?period=week|month|year
```
Returns click counts for each agent.

### Get User Details
```
GET /api/analytics/user/:email?period=week|month|year
```
Returns detailed interaction history for a specific user.

### Get Agent Details
```
GET /api/analytics/agent/:name?period=week|month|year
```
Returns detailed usage history for a specific agent.

## Database

The server uses SQLite with the database file stored at `server/analytics.db`. The database is automatically created on first run.

### Schema

**clicks** table:
- `id` - Primary key
- `agent_name` - Name of the agent clicked
- `agent_category` - Category (Procurement, Revenue, General)
- `user_email` - User's email (if provided)
- `user_name` - User's name (if provided)
- `timestamp` - When the click occurred
- `ip_address` - Client IP address
- `user_agent` - Browser user agent

## How It Works

1. **Frontend Tracking**: When a user clicks an agent link on the main page (`index.html`), JavaScript sends a POST request to `/api/track-click` before opening the agent.

2. **Data Storage**: The server stores each click in the SQLite database with timestamp and user information.

3. **Admin Dashboard**: The admin page (`admin.html`) fetches data from the API endpoints and displays real-time analytics.

4. **Fallback Mode**: If the server is not running, the admin dashboard gracefully falls back to displaying sample data.

## User Identification

For better tracking, users can optionally be identified. The frontend stores user email in `localStorage`. To enable the email prompt on first visit, uncomment the relevant code block in `index.html`.

Alternatively, you can integrate with:
- IBM SSO/w3id authentication
- Google Sign-In
- Any other identity provider

## Production Deployment

For production use, consider:

1. **Environment Variables**: Use `.env` file for configuration
2. **Process Manager**: Use PM2 or similar for process management
3. **Reverse Proxy**: Place behind Nginx or Apache
4. **Database Backup**: Regularly backup `analytics.db`
5. **HTTPS**: Enable SSL/TLS for secure connections

Example with PM2:
```bash
npm install -g pm2
pm2 start server.js --name "ibm-clg-analytics"
pm2 save
pm2 startup
```

## Troubleshooting

### "better-sqlite3" installation fails
This is a native module. You may need build tools:
- **macOS**: `xcode-select --install`
- **Ubuntu/Debian**: `sudo apt-get install build-essential`
- **Windows**: Install Visual Studio Build Tools

### Database locked errors
Ensure only one instance of the server is running. SQLite supports concurrent reads but not concurrent writes.

### CORS errors
The server includes CORS middleware. If accessing from a different domain, update the CORS configuration in `server.js`.

## License

Internal Use Only - IBM Legal and Regulatory Affairs
