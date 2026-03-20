# TeamWork 365 Landing Page

Landing Page für das Produkt **TeamWork 365** mit Fokus auf:

- Funktionsumfang
- Pricing
- Anfrage für Demozugang oder Präsentation

## Stack

- Vite
- React
- TypeScript

## Lokaler Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Inhaltliche Grundlage

Die Inhalte und Preisstufen orientieren sich an der bestehenden Website:

- https://teamwork365.de/

Berücksichtigt wurden insbesondere:

- Produktpositionierung als CRM-Erweiterung für den SAP Business One Web Client
- Kernfunktionen rund um Dashboard, Geschäftspartner, CRM-Aktivitäten, Leads und digitale Angebote
- Integrationsfähigkeit über API, Power Automate und Zapier
- Preisstufen Starter, Pro und Premium

## Bilder

Folgende Screenshots der bestehenden Website wurden lokal ins Repository übernommen und in die Landing Page integriert:

- `public/images/tw365-header.webp`
- `public/images/tw365-dashboard.webp`
- `public/images/tw365-sales.webp`
- `public/images/tw365-techniker.webp`
- `public/images/tw365-marketing.webp`

## Anfrageformular

Das Formular nutzt aktuell einen `mailto:`-Flow und öffnet beim Absenden das lokale Mailprogramm an:

- `info@teamwork365.de`

Wenn du möchtest, kann im nächsten Schritt stattdessen eines dieser Setups eingebaut werden:

1. Typeform-Einbindung
2. Formularversand an einen eigenen API-Endpunkt
3. Netlify Forms / Formspree / Resend-Setup
