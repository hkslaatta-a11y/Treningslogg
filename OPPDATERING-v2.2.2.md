# Treningslogg v2.2.2

Feilretting for redigering av fullførte økter når skylagring er aktiv.

Tidligere kunne en automatisk synk mens redigeringsvinduet var åpent erstatte den lokale profil-listen. Da ble endringen skrevet til en gammel kopi av økten og meldingen «Økten er korrigert» kunne vises uten at historikken faktisk ble endret.

v2.2.2 lagrer nå endringen mot riktig profil og økt-ID i den aktive state-en, også dersom en automatisk skysynk har skjedd mens redigeringsvinduet var åpent.
