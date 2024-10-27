# Gymbara 

A Next.js project bootstrapped with create-next-app, designed for tracking workouts and managing exercise routines.

## Features

- **Custom Timer**
  - Start, pause, and reset functionality
  - Zustand state management
  - Session storage persistence
  - State retention across page reloads

- **Responsive UI**
  - Optimized for multiple screen sizes
  - Flexible layouts and components
  - Clean typography with Vercel-optimized Geist font

- **Exercise Tracking**
  - Dynamic exercise cards
  - Custom weight, sets, and reps tracking
  - Persistent data storage
  - Progress tracking capabilities

- **State Management**
  - Zustand store for global state
  - Efficient management of timer and workout settings
  - Cross-component state synchronization

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```plaintext
.
├── app/
│   ├── page.tsx          # Home page component
│   ├── layout.tsx        # Main layout component
│   └── components/       # Reusable components (e.g., Timer, ExerciseCard)
├── public/               # Static assets
├── stores/               # Zustand state stores
├── utils/                # Utility functions
├── styles/              # Global styles
├── package.json
└── README.md
```

## Configuration

The project uses various configuration files for customization:
- `next/font` for font optimization
- `.env` for environment variables
- `next.config.js` for Next.js settings
- `tailwind.config.js` for styling (if Tailwind is used)

## Dependencies

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Zustand**: Lightweight state management solution
- **lucide-react**: Icon library for UI elements
- **TypeScript**: Static type checking

## Usage

### Timer
- Start, pause, and reset functionality
- Session storage for state persistence
- State retention across page reloads

### Exercise Tracking
- Add custom weights, sets, and reps
- Dynamic exercise card components
- Progress tracking capabilities

### State Management
- Global state managed with Zustand
- Extensible state architecture
- Cross-component state synchronization

## Future Improvements

### Todo
- [ ] Update more exercises
- [ ] Change routine after 1 month
- [ ] Add notes for every exercise
- [ ] Add Substition for exercise

### Data Management
- [ ] Backend integration with database support (PostgreSQL)
- [ ] User authentication system
- [ ] Persistent workout data storage

### Enhanced Functionality
- [ ] Dark mode and theme customization

### Technical Enhancements
- [ ] Progressive Web App (PWA) implementation
- [ ] Offline functionality
- [ ] Workout analytics and visualizations
- [ ] Performance optimizations

## Deployment

Deploy your app to the Vercel Platform with zero configuration. For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.