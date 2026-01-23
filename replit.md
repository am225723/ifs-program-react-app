# IFS App

## Overview
This is a React + Vite frontend application for an Internal Family Systems (IFS) therapy curriculum. It features PIN-based authentication and personalized curriculum delivery.

## Tech Stack
- **Frontend**: React 19, Vite 7
- **Styling**: TailwindCSS 3
- **Routing**: React Router DOM 7
- **Backend Service**: Supabase (external)

## Project Structure
```
src/
├── App.jsx          # Main application component with routing
├── components/      # Reusable UI components
├── contexts/        # React context providers (DataContext)
├── data/            # Static curriculum and IFS data
├── lib/             # Supabase client and helpers
├── pages/           # Page components
└── utils/           # Utility functions
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint`

## Configuration
- Vite is configured to run on `0.0.0.0:5000` with all hosts allowed for Replit compatibility
- Static deployment configured with `dist` as the public directory

## Notes
- The app requires Supabase configuration (environment variables) for full functionality
- PIN-based authentication system for user access
