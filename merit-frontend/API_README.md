# Merit API Configuration

## Environment Variables

The Merit frontend application uses environment variables to configure the API endpoints. This ensures that the application can be deployed to different environments without changing the code.

### Available Environment Variables

- `VITE_API_BASE_URL`: The base URL for all API requests. Default fallback is `http://127.0.0.1:5000` for local development.
- `VITE_API_KEY`: The API key used for authenticating requests to the backend. This is included in the 'X-API-Key' header.

### Current Configuration

The production API is hosted at: `https://merit-uc58.onrender.com`

### How It Works

The application uses Vite's environment variable system to load configuration. In the `src/services/api.js` file, we access the environment variables using:

```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000'
const API_KEY = import.meta.env.VITE_API_KEY || '70fdc8133c334bf0912769a6407965cb'
```

These values are then used to configure the axios instance:

```javascript
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});
```

This allows the application to use the configured values if available, or fall back to the default values if not set.

### Setting Up Environment Variables

1. **Local Development**:
   Create a `.env` or `.env.local` file in the root of the project with:
   ```
   VITE_API_BASE_URL=https://merit-uc58.onrender.com
   VITE_API_KEY=70fdc8133c334bf0912769a6407965cb
   ```

2. **Production Deployment**:
   Set the environment variables in your hosting provider's configuration.

3. **Testing Different Environments**:
   You can create different environment files like `.env.development` or `.env.production` for different deployment targets.

## API Endpoints

The API service is configured in `src/services/api.js` and provides the following main functionalities:

- University information
- Course listings
- Aggregate score calculations
- Course recommendations
- Post-UTME requirements
- AI chat assistance

### Authentication

All API requests include the API key in the 'X-API-Key' header for authentication.

### Important Note

When developing locally, make sure your API server is running at `http://127.0.0.1:5000` or update the fallback URL in the code. 