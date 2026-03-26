# PokeLite

PokeLite is a React Native Pokedex app built with Expo and Expo Router.
It provides a fast, clean UI for browsing Pokemon, filtering by type, and
opening detailed profiles with stats, evolution data, and moves.

## Features

- Onboarding flow with first-run data setup
- Local-first Pokemon listing with search and type filters
- Pokemon detail screen with:
  - About section (flavor text, height, weight, capture rate, habitat)
  - Base stats with progress bars and radar chart
  - Evolution chain cards
  - Move set list with power, accuracy, and PP
- Type-based colors and icon-driven UI

## Tech Stack

- Expo + React Native + TypeScript
- Expo Router for file-based navigation
- NativeWind (Tailwind-style utility classes)
- Expo SQLite for local data storage
- AsyncStorage for onboarding/seed state
- PokeAPI as the upstream data source

## Project Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run start
```

From the Expo CLI menu, open on Android, iOS, web, or Expo Go.

## Available Scripts

- `npm run start` - Start Expo dev server
- `npm run android` - Launch on Android
- `npm run ios` - Launch on iOS
- `npm run web` - Launch on web
- `npm run lint` - Run lint checks

## App Flow

1. `app/index.tsx` checks whether Pokemon data has been seeded.
2. New users are routed to onboarding.
3. The loader seeds Pokemon data and then routes to `/pokedex`.
4. Returning users go directly to the Pokedex screen.

## Notes

- First launch may take longer because initial data is seeded.
- Network is required to fetch live Pokemon details/evolution/move metadata.
