# Treningslogg v2.2.0 – trygg oppdatering

Denne versjonen er laget for å legges over eksisterende GitHub Pages/PWA på samme adresse.
Den eksisterende treningshistorikken i localStorage beholdes, og Supabase-dataene beholdes fordi appen fortsatt bruker samme skylagringsmodell.

## Nytt i v2.2.0
1. Kommentar per øvelse + «Kommentar sist» neste gang øvelsen trenes.
2. Redigering/korrigering av ferdige økter: dato/tid, øktnavn, øvelser, sett, vekt, reps, RIR, kommentarer og øktnotat.
3. Månedsrapport med tall og forklarende tekst per øvelse, sammenlignet med forrige måned. Rapport kan åpnes som e-post fra appen.
4. Valgfri startside med bildet av Stine og Håvard, «Stine & Håvard» og «Booty & the Beast». Kan slås av/på per telefon.
5. Ny SH-appikon med treningsstang/hantel i mørk premium-stil.

## Etter at backup er tatt

### A. Kontroller skylagring først
- Åpne dagens app på Håvards telefon.
- Gå til Data og trykk «Synkroniser nå».
- Kontroller at det ikke står en synkfeil.
- Gjør det samme på Stines telefon hvis den allerede er satt opp.

### B. Supabase
Hvis det eksisterende Supabase-oppsettet allerede fungerer, skal du IKKE kjøre noe nytt SQL for v2.2.0.
Kommentarer, redigerte økter, rapport-e-post og andre nye felter lagres inni den eksisterende JSON-dataen.

Hvis Supabase-oppsettet aldri ble fullført på grunn av feilen med gen_random_bytes, bruk den korrigerte `supabase-setup.sql` i denne pakken og kjør hele filen i SQL Editor.

### C. Oppdater GitHub
1. Pakk ut ZIP-filen.
2. Åpne GitHub-repoet som allerede publiserer Treningslogg.
3. Last opp ALT innholdet i `treningslogg_pwa` til samme mappe som dagens app.
4. Tillat at filer med samme navn erstattes.
5. Commit, f.eks. `Update Treningslogg to v2.2.0`.
6. Ikke opprett nytt repo eller ny GitHub Pages-adresse.

### D. Første åpning – Håvard
1. Vent ca. 1–2 minutter etter GitHub-commit.
2. Åpne appadressen i Safari først.
3. Bekreft at startsiden «Stine & Håvard / Booty & the Beast» vises.
4. Åpne appen og gå til Historikk. Kontroller noen gamle økter.
5. Gå til Data og trykk «Synkroniser nå».
6. Gå til Progresjon og sjekk månedsrapporten.

### E. Stines telefon
Når Håvard ser riktig historikk og skyen synker:
1. Åpne samme appadresse på Stines telefon.
2. Kontroller Stine-profil og synk.
3. Velg om startsiden skal vises på hennes telefon under Data.

## Nytt ikon på iPhone
Safari/iOS kan beholde gammelt PWA-ikon en stund. Ikke slett snarveien før backup og Supabase-synk er bekreftet.
Hvis SH-ikonet ikke oppdateres etter at v2.2.0 er bekreftet:
1. Bekreft full backup + fungerende Supabase-synk.
2. Fjern Treningslogg fra Hjem-skjermen.
3. Åpne samme GitHub Pages-adresse i Safari.
4. Del > Legg til på Hjem-skjerm.
Da brukes det nye SH-ikonet.

## Månedsrapport på e-post
Legg inn ønsket rapport-e-post under Data > Profiler. Fra Progresjon > Månedsrapport kan «Send e-post» åpne ferdig rapport i telefonens e-postapp med tall og tekst ferdig utfylt.

Automatisk utsending på fast dato krever i tillegg en serverbasert e-postjobb (f.eks. Supabase Edge Function + Resend). Dette er ikke nødvendig for selve v2.2.0 og kan kobles på senere uten å endre treningshistorikken.
