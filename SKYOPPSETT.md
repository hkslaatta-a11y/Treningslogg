# Skylagring – Treningslogg v2.1

Denne versjonen kan synkronisere Håvard og Stine via Supabase.

1. Opprett et gratis prosjekt på Supabase.
2. Åpne SQL Editor, lim inn hele `supabase-setup.sql`, og kjør skriptet én gang.
3. Finn Project URL og anon/publishable key under prosjektets API-innstillinger.
4. Åpne Treningslogg > Data på Håvards telefon og lim inn URL + anon/publishable key.
5. Opprett bruker/logg inn med Håvards e-post. Opprett deretter en delt treningskonto. Noter delingskoden.
6. På Stines telefon: installer samme PWA, lim inn samme Project URL + anon/publishable key, opprett/logg inn med Stines egen e-post, og bruk Håvards delingskode.
7. Velg hvilken profil hver telefon primært bruker under Data.

Bruk aldri Supabase `service_role`-nøkkelen i appen.

Fullførte økter og programendringer synkroniseres automatisk. Appen sjekker også skyen omtrent hvert 20. sekund mens den er åpen, og når den kommer tilbake i forgrunnen. En pågående økt forblir lokal på telefonen til den fullføres.

Ta fortsatt JSON-backup med jevne mellomrom.
