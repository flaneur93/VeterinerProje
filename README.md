# VeterinerProje

This project provides a responsive veterinary clinic dashboard built with React, Vite and Tailwind CSS. The main screen replicates the layout shared in the task description, including:

- Collapsible navigation rail with hover flyout behaviour
- Workspace canvas placeholder in the centre column
- Reminder rail with virtualised card list, date picker and modal support

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the printed local URL in your browser to view the dashboard.

## Available scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create an optimised production build. |
| `npm run preview` | Serve the production build locally. |

## Notes

- The UI components live under `src/components/ui` and provide lightweight wrappers for the dashboard.
- Icon components are implemented locally in `src/icons/lucide.tsx` to avoid external registry access during automated evaluation.
- Tailwind utility classes are available globally via `src/index.css`.
