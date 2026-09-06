# Treningslogg – PWA/hybrid

Dette er en installérbar webapp for iPhone. Den trenger ikke Xcode, men må ligge på en HTTPS-adresse for at Safari skal kunne installere den som PWA og for at offline-cache skal fungere.

## Innhold
- Full Body A, Full Body B, Dag C – revidert og Calisthenics/CrossFit-ekstraøkt
- kg, reps og RIR per sett
- automatisk progresjonsforslag fra tidligere økter
- PR-markering og estimert 1RM
- historikk og progresjonsgraf
- hviletimer
- ekstra øvelser i en pågående økt
- lokal lagring
- JSON eksport/import for backup
- offline-støtte via service worker

## Publisering uten Xcode
Last inn hele mappen på en enkel statisk HTTPS-host (for eksempel GitHub Pages, Cloudflare Pages eller Netlify). Åpne deretter adressen i Safari på iPhone og velg Del → Legg til på Hjem-skjerm.

Viktig: Å åpne index.html direkte fra Filer-appen er ikke nok for full PWA/offline-funksjonalitet; den bør serveres over HTTPS.

## v2.1 – skysynk
Supabase-støtte er lagt til. Se `SKYOPPSETT.md` og kjør `supabase-setup.sql` i Supabase SQL Editor. Appen fungerer fortsatt lokalt dersom skyen ikke er konfigurert eller nettet er borte.
