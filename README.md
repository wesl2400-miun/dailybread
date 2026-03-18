
# Projektuppgift - Frontend-baserad webbutveckling VT2026
## DailyBread - Christian Prayer App
Denna app är en böneapp för kristna av den messianska denominationen. Appen tilldelar
en anpassad bön från bibelns Psalmbok och ett Jesu ord från Nya Testamentet baserat
på väder, region och shabattider. Bibelverserna beräknas med hjälp av en så kallad
bibel-motor som räknar ut vilka bibelreferenser som ska skickas till bibel-API:n. Dessa
referenser väljs ur sex kategorier och vilken kategori som väljs beror på dagens
temperatur och väderkoder för en vald plats, världsregionen platsen befinner sig i samt shabbattider.

Till exempel om shabbatdagen är inne, vädret är dåligt och personen befinner sig i regionen
med få kristna, får användaren chans att få en bön och visdomsord som relateras till
shabbaten, religiös förföljelse och tröst. Bibel-motorn fungerar på ett sätt som är 
icke-deterministiskt, vilket innebär att det alltid finns en chans att användaren
får en vers från en slumpmässig kategori av fem kategorier (shabbat-kategori exkluderas här
eftersom det är en speciell kategori som reserveras till shabbatdagen).

Det finns också en liten funktionalitet för att spåra shabbattider för sin ort
samt se hur många dagar som finns kvar till shabbaten.

API:er som används är:
* Hebcal- Används för att hämta information om nästa shabbat samt räkna ut hur många dagar kvar som finns till shabbatdagen.
* Bible - Hämtar bibelverser
* OpenMeteo - Hämtar väderprognosen för dagen
* OpenStreeMap - Hämtar information om en vald ort, bland annat dess koordinater.

## Länken till webbplatsen -> https://wesl2400-miun.github.io/dailybread/