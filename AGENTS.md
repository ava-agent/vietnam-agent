# Repository Guidelines

## Project Shape

VietnamGuide is a React Native travel-guide app for Chinese tourists visiting Vietnam. App entry is `App.tsx`; shared data, hooks, screens, and components live under `src/`; native projects are under `android/` and `ios/`.

## Commands

- `npm start` starts Metro.
- `npm run android` and `npm run ios` launch native builds.
- `npm run lint` runs ESLint.
- `npm test` runs Jest.
- `npm run build` runs the TypeScript no-emit check.

## Editing Rules

- Do not commit regenerated APKs, local signing files, pods, Gradle caches, or simulator artifacts.
- Keep static travel data deterministic so tests do not require network access.
- Android release packaging should be handled separately from routine source changes.
