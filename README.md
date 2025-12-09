# EverNorth React Native Training (Dec 2025)

## Purpose
This repository contains the material, exercises, and references used during the EverNorth React Native training program scheduled for December 2025. Use it to stay aligned on goals, track project work, and share key resources in one place.

## Intorduction Link

https://forms.gle/4jWkKHn2X7HufD7j9

## Quiz Links

1. Day 1: https://forms.gle/3ejmgSHrADSN4roo8
2. Day 2:  https://forms.gle/pdAsTwG4YTjz7cCZA
3. Day 3: https://forms.gle/DWvenB87Hz1eZR2Z8
4. Day 4: https://forms.gle/vnnaMyYR4ZYDp53R9

## Git Repository Links

1. Training: https://github.com/aniljos/react-native-dec-2025
2. API: https://github.com/aniljos/cric-roaster
3. Heath Tracker: https://github.com/aniljos/PersonalHeathTracker
4. https://github.com/aniljos/REST-API-Mock

## Assessment Links

## List of Projects

## Application Details
- **cricket-roaster-app**: Expo-managed app (scripts use `expo start`) wired to the roster API. Demonstrates React Navigation stacks/tabs, remote data fetching with Axios, pull-to-refresh team lists, grouped player views, and a validated player-creation form with image uploads via `expo-image-picker` that POSTs new roster entries.
- **PersonalHealthTracker**: Created with `create-expo-app` (see `PersonalHeathTracker/README.md`) using Expo Router. Features SQLite persistence for daily health entries (date, calories, sleep, workout), AsyncStorage-backed step logging, cross-platform date pickers, and safe-area aware screens.
- **ExpoRouterApp**: Created with `create-expo-app` (see `ExpoRouterApp/README.md`) showcasing Expo Router + Redux. Includes a themable home hub, auth flow with protected product listing/detail pages calling the secure product API, plus demos for deep linking actions, sharing, and device dimension utilities.
- **RNBareApp**: Bootstrapped with the React Native CLI (per `RNBareApp/README.md`). Demonstrates a bare workflow app invoking a custom native module (`NativeSayHello`) from JavaScript, with safe-area handling and basic text input/alerts.

## API Projects
- **REST-API-Mock**: Express mock server exposing `/login` + `/refreshToken`, public and JWT-protected `/products` + `/secure_products` (CRUD), `/customers` + `/secure_customers` (CRUD), and `/todoItems` for todo collection writes/reads.
- **api/cric-roaster**: Cricket roster API serving `/health`, `/teams`, `/players/all`, `/players/grouped`, `/players?teamName=...`, `/players/:uniquePlayerId`, and `POST /players` (accepts base64/file data for player images and persists to JSON + public assets).
