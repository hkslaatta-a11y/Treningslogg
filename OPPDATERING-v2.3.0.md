# Treningslogg v2.3.0

Denne versjonen gjør treningsprogrammene redigerbare direkte i appen og legger inn Håvards nye programmal med redusert beinvolum.

## Nytt

- Håvard originalmal er oppdatert til lavere beinvolum.
- Øvelser som er tatt ut av hovedvolumet ligger som valgfrie tillegg.
- Chest-supported row er lagt inn som fast øvelse på Full Body C.
- Rear-delt cable fly er lagt inn som valgfritt tillegg på A og C.
- Program kan redigeres direkte på iPhone: navn, øvelser, rekkefølge, sett, reps, tempo, pause, RIR/notat, alternativer og om øvelsen er valgfri.
- Øvelser kan flyttes opp og ned i programeditoren.
- Eksporter program til egen JSON-fil.
- Importer program fra JSON-fil.
- Tilbakestill profilens programmer til appens originalmal uten å røre treningshistorikken.
- Programendringer bruker samme Supabase-synk som resten av appen.

## Viktig ved oppdatering fra v2.2.3

Oppdatering av appkoden overskriver ikke de programmene som allerede ligger lagret i Supabase/localStorage. Det er med vilje, for å unngå å overskrive egne endringer.

For å ta i bruk Håvards nye program etter at v2.3.0 er installert:

1. Velg profilen **Håvard**.
2. Gå til **Program**.
3. Under **Programverktøy**, velg **Tilbakestill til original**.
4. Bekreft.

Dette erstatter bare Håvards programmaler. Tidligere økter og historikk beholdes. Stines programmer påvirkes ikke.

Ta gjerne **Eksporter program** før tilbakestilling dersom du vil ha en egen kopi av den gamle programstrukturen.

## Håvard – ny originalmal

### Full Body A
- Dype Smith-knebøy 2 × 8–12
- Smith benkpress 3 × 8–12
- Pull-ups 3 × 6–10
- RDL 2 × 8–10
- Sidehev 2 × 10–15
- Sittende incline DB curl 2 × 10–15
- Enarms cable triceps extension 2 × 10–15
- Cable crunch 3 × 8–12
- Valgfritt: Leg extension 1–2 sett
- Valgfritt: Rear-delt cable fly 2 sett

### Full Body B
- Bulgarian split squat, fremre fot forhøyet 2 × 8–10 per bein
- Incline Smith press 3 × 8–12
- Horizontal pull-ups 3 × 8–12
- DB shoulder press 3 × 8–12
- Leg curl 2 × 10–15
- Hanging leg raise 3 × 8–12
- Valgfritt: RDL 1–2 sett
- Valgfritt: Leg extension 1–2 sett

### Full Body C
- Dype Smith-knebøy 2 × 10–15
- Chin-ups 3 × 6–10
- Weighted dips 3 × 6–10
- Chest-supported row 2 × 8–12
- Sidehev 2 × 10–15
- Cable flyes 2 × 8–12
- Cable hammer curl 2 × 10–15
- Ab wheel rollout 3 × 6–12
- Valgfritt: Utfall fra boks 1–2 sett per bein
- Valgfritt: Rear-delt cable fly 2 sett
