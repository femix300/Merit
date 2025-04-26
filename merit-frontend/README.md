# Merit Frontend

A modern frontend application for the MERIT system, helping students determine their eligibility for courses at their dream universities.

## Project Structure

The frontend is organized using a feature-based architecture:

```
src/
├── assets/           # Images and static assets
├── components/       # Shared UI components
├── features/         # Feature-specific modules
│   ├── aggregate/    # Aggregate score calculation
│   ├── ai/           # AI assistant functionality
│   └── universities/ # University search and information
├── layouts/          # Layout components (Navbar, Footer)
├── pages/            # Page components
├── services/         # API and service functions
└── utils/            # Utility functions
```

## Technologies Used

- React with React Router
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API communication

## Features

- University search by course
- Aggregate score calculation
- Course recommendations
- Faculty and course listings
- University information
- AI Assistant for student guidance

## Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## API Integration

The frontend communicates with the MERIT backend API to fetch:

- University listings
- Course information
- Aggregate calculations
- Recommendations

## Contributing

Contributions are welcome! Please make sure to follow the project's code style and organization.

## License

This project is part of the MERIT system.
