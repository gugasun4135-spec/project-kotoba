# Kotoba

Japanese Knowledge OS MVP for tracking Japanese grammar, vocabulary, textbook lesson mappings, mastery, weak knowledge, and mock wrong-question analysis.

## Run Locally

```bash
npm install
npm run build
npm start
```

The default production server uses port `5173` from `package.json`. If that port is busy, run:

```bash
./node_modules/.bin/next start -H 0.0.0.0 -p 5175
```

## Current Scope

This is the SPRINT-001 MVP:

- JSON-driven Knowledge Catalog
- Dashboard
- Knowledge Browser
- Knowledge Detail Page
- Lesson Browser
- Lesson Detail Page
- Wrong Question Placeholder
- Mastery color system
- Relationship display

No real AI, OCR, Supabase, login, or database is implemented yet.
