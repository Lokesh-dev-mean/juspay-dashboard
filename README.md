# Juspay Dashboard

A responsive analytics dashboard built with React, TypeScript, Vite, and Material UI. It showcases eCommerce KPIs, charts, maps, and tables with light/dark theme support.

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview the production build
npm run preview
```

- App runs on `http://localhost:5173` by default (Vite).
- Requires Node.js 18+.

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

## Tech stack

- React 18, TypeScript, Vite
- Material UI (MUI) for UI components and theming
- ECharts via `echarts-for-react` for charts
- `react-simple-maps` for a compact world map visualization
- React Router for routing

## Project structure

```
src/
  components/
    layout/        # App layout: TopBar, Left/Right sidebars, etc.
    ui/            # Reusable UI widgets (e.g., MetricCard, DonutChart)
  pages/
    ECommerce/     # Main dashboard page with charts, map, tables
  context/         # Theme & sidebar contexts/providers
  hooks/           # Custom hooks
  theme/           # Theme configuration (palette, typography, components)
  constant/        # Mock data and config for charts, tables, etc.
  utils/           # Helpers and formatters
```

## Environment

No external env configuration is required for local development. The app uses static mock data defined in `src/constant/`.

## Notable features

- Light/dark theme toggle via MUI theme context
- Responsive layout with persistent sidebar and top bar
- Stacked bar chart and line chart using ECharts
- World map with location markers using `react-simple-maps`
- Accessible tables and KPI metric cards

## Design decisions

- **Vite + React + TS**: Fast dev server, instant HMR, and strong type safety.
- **MUI theme**: Centralized theming to easily support dark mode and consistent spacing/typography.
- **Charts with ECharts**: Chosen for flexibility and performance; integrated via `echarts-for-react`.
- **Static constants for demo**: Business data is mocked to keep setup simple and deterministic.

## Challenges faced

- **Theming consistency across libraries**: Ensuring chart and map colors adapt to dark mode required explicit color tokens and conditional styles.
- **Chart responsiveness**: Managing grid, label spacing, and bar widths to avoid overlap across breakpoints.
- **Map projection sizing**: Tuning `react-simple-maps` projection and scale for a compact, legible sparkline-style map.

## Improvements made

- Extracted chart configuration and theme colors into `constant/ecommerce.constant.ts` for reuse.
- Added `MetricCard` and a canvas-based `DonutChart` component for performance and design parity.
- Normalized layout spacing and typography via `theme/` and page-level style objects.

## Future enhancements

- Replace mock data with real APIs and add data loading states.
- Add tests (React Testing Library + Vitest) and CI lint/build checks.
- Add i18n and number/date localization.
- Improve accessibility audits (ARIA, contrast) and keyboard navigation.

## License

This project is provided for the Juspay assignment. Use as reference unless otherwise specified.
