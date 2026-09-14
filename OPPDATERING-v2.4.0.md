# Treningslogg v2.4.0 – kroppsvektlogging

Denne versjonen legger til forbedring nr. 6.

## Nytt
- Kroppsvektøvelser kan logges som **KV**, **+kg** eller **−kg / assistanse**.
- Vanlige vektøvelser beholder ordinær kg-logging.
- Kjente kroppsvektøvelser identifiseres automatisk.
- I programeditoren kan enhver øvelse markeres eller avmarkeres som **Kroppsvektøvelse**.
- Gamle registreringer med **1 kg** på kjente kroppsvektøvelser tolkes automatisk som **KV**.
- Gamle registreringer over 1 kg på kjente kroppsvektøvelser tolkes som **+kg**.
- Historikk og «Sist»-visning viser nå f.eks. `KV × 10`, `+5 kg × 8` eller `−20 kg × 10`.
- Progresjonsforslag for kroppsvektøvelser forstår overgang fra KV til +kg og redusert assistanse.
- Månedsrapporten sammenligner kroppsvektøvelser uten å bruke misvisende e1RM.
- Kroppsvektøvelser holdes utenfor vanlig kg-volum. Volumfeltet viser derfor **ekstern kg-volum**.

## Oppdatering
1. Ta full backup i dagens app.
2. Synkroniser til Supabase.
3. Last opp alle filene i denne mappen til samme GitHub Pages-repo og erstatt de gamle.
4. Vent til GitHub Pages er ferdig.
5. Åpne siden i Safari og kontroller at den viser v2.4.0.
6. Åpne PWA-en fra hjemskjermen. Hvis den fortsatt viser gammel versjon, lukk den helt og åpne igjen. Reinstaller bare snarveien hvis cachen ikke oppdateres.
7. Synkroniser én gang og kontroller historikken.

Ingen SQL-endring er nødvendig.
