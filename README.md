# Calandariu Lametino

Calendario interattivo in dialetto lametino con aforismi, celebrazioni e tradizioni del 2026.

## Tecnologie utilizzate

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- PWA (Progressive Web App)

## Installazione

```sh
# Clona il repository
git clone <YOUR_GIT_URL>

# Naviga nella directory del progetto
cd calandariu-lametinu

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Build e Deploy

```sh
# Build per produzione
npm run build

# Preview del build
npm run preview

# Deploy su GitHub Pages
npm run deploy
```

## Struttura del progetto

- `/src/pages` - Pagine principali (Today, Calendar, Dictionary)
- `/src/components` - Componenti riutilizzabili
- `/src/data` - Dati del calendario e dizionario
- `/src/hooks` - Custom React hooks
- `/src/services` - Logica di business

## Deployment su GitHub Pages

Il progetto è configurato per il deployment automatico su GitHub Pages tramite GitHub Actions. Ogni push sul branch `develop` attiverà il deployment.
