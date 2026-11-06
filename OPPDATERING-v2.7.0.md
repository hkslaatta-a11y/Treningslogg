# Treningslogg 2.7.0 – kandidat (ikke publisert)

Utgangspunkt: eksisterende 2.6.2 på main. `STORAGE_KEY`, Supabase-konfigurasjon, sync-payload og eksisterende treningsprogrammer er beholdt. Ingen database-migrering.

## Forbedringer
1. Drag og slipp: lett GPU-flyttet forhåndsvisning på mobil og støtte for opp/ned-knapper i aktiv økt. Endrer ikke originalprogrammet.
2. Historikk/profiler: siste resultater og progresjon beregnes fra profilen som er valgt. Reaksjoner ❤️ 🔥 💪 👏 😍 🏆 på enkeltøvelser i *den andre* profilens historikk. Reaksjoner legges i samme delte data som øktene og synkroniseres med Supabase (normalt ved neste synk).
3. Før økt: velg/fjern/bytt øvelser i felles øvelsesbank, legg til øvelser, endre sett, flytt rekkefølge. Endringene er kun for dagens økt. Under økten kan siste sett fjernes.
4. Øvelsesbanken: synlig Lukk-knapp i hovedbank og Tilbake fra redigering/velger.
5. Bonusøkt: foreslå øvelser som ikke ble gjennomført i sist fullførte ordinære økt, kun for korrekt profil og maks sju dager. Ingen automatisk akkumulering.
6. Uke: ny Uke-fane for siste sju dager: fullført, utelatt, delvis gjennomført, byttet. Egen informasjonsliste for programøvelser som ikke ble trent uten å regne dem som utelatte. Velg øvelser og planlegg bonusøkt.
7. Data → Utseende: mørk grønn, midnatt, kobber, plomme eller lys. Lagres kun på den aktuelle enheten.
8. Programredigering: beholdt usparte endringer når du velger øvelser fra banken og går tilbake til redigeringsskjermen.

## Før publisering – manuell iPhone-test
- [ ] Eksporter backup på begge telefonene (allerede gjort av bruker).
- [ ] Åpne utviklingsversjonen uten å overskrive 2.6.2 på main.
- [ ] Velg Stine, legg til en øvelse Håvard har trent: Stine må ikke få Håvards resultat som «Sist».
- [ ] Start Dag A, fjern en øvelse, bytt en annen, endre 3→2 sett, start. Verifiser at originalprogrammet fortsatt har opprinnelig oppsett.
- [ ] Revider rekkefølge ved å dra fra ☰ og ved ↑/↓. Verifiser vanlig scrolling uten ufrivillige flyttinger.
- [ ] Fjern siste sett under økten, lagre. Kontrollér «Delvis» i Uke dersom opprinnelig plan hadde flere sett.
- [ ] Se utelatt øvelse i Uke og som forslag til neste BONUSØKT; verifiser at forslag blir borte når ny ordinær økt er fullført.
- [ ] Bytt til den andre profilen, reager på ett øvelsesresultat. Kontrollér reaksjonen på den andre telefonen etter skysynk. Prøv også å fjerne reaksjonen.
- [ ] Legg til ny øvelse fra hovedmenybank, bruk både Lukk/Tilbake.
- [ ] Endre tema på den ene telefonen; tema på den andre skal være uendret.
- [ ] Test ny og gammel historikk, PR, kroppsvekt (KV / +kg / −kg), månedsrapport, programimport/-eksport og skysynk.

## Vær oppmerksom på
- Ingen faktisk Safari-/iPhone-test er utført i utviklingsmiljøet. JavaScript-syntaks og isolerte forretningslogikktester er kontrollert.
- **Synkroniseringskontroll 2026-11-06:** Testet faktiske JavaScript-funksjoner med to simulerte telefoner og isolert minnebasert Supabase-RPC (ingen ekte treningsdata berørt). Profilspesifikk historikk, overføring av emoji, ny økt og beholdning av eldre økter bestått. Den opprinnelige synkroniseringen mistet en endring ved to usynkroniserte lagringer. Det er derfor lagt inn en treveis sammenslåing av data ved opplasting og vern mot å overskrive lokale endringer under overføring. Nye tester bekreftet at separate økter og reaksjoner kan kombineres ved **fortløpende** lagring selv om enhetene startet med gamle kopier.
- **Rest-risiko:** Dagens `save_training_state`-RPC skriver hele husholdningsdokumentet uten atomisk revisjonskontroll. Dersom begge enheter leser samme skyversjon og skriver **helt samtidig**, kan én skrive over den andre. Dette kan ikke elimineres sikkert i klienten alene; krever egen Supabase-migrering med versjonskontroll. Ikke publiser som fullt synk-sikker før dette er håndtert og testet mot faktisk Supabase.
- Test-Netlify-hosting ble lastet opp før siste synkfikser; bruk oppdatert branch før ny test. Ikke logg inn i test-Netlify med ekte delte data.
- Ikke rediger den samme økten samtidig fra to telefoner.
- Uke- og bonusfunksjonene kan ikke rekonstruere utelatte øvelser fra historikk registrert *før* denne versjonen, fordi tidligere versjoner ikke lagret hvilke øvelser som ble valgt bort.
