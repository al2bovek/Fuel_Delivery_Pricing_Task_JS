Fuel Delivery Pricing Task
Autorius
Aleksandr Dubovik

Projekto aprašymas
Programa skirta kuro pristatymų sąskaitų skaičiavimui pagal JSON failuose pateiktus duomenis.

Programa:

nuskaito pristatymų duomenis;
atlieka įrašų validaciją;
apskaičiuoja kuro kainą, mokesčius ir galutinę sumą;
generuoja CSV ataskaitas;
palaiko alternatyvių tarifų skaičiavimą (What-If scenarijus).
Įgyvendintos užduoties dalys:

Task 1: Standard Prices
Task 2: What-If Prices
Bonus 1: Neįgyvendinta
Bonus 2: Neįgyvendinta

## Naudotos technologijos
Node.js
JavaScript (ES Modules)
decimal.js

Projekto struktūra
fuel-delivery-pricing/
│
├── shipments.json
├── payments.json
│
├── output/
│
├── src/
│   ├── index.js
│   ├── config/
│   ├── constants/
│   ├── readers/
│   ├── services/
│   └── utils/
│
├── package.json
├── package-lock.json
└── README.md

## Diegimas

### cd Fuel_Delivery_Pricing_Task

### npm install

## Programos paleidimas

### npm start

Prieš paleidžiant projekto šakniniame kataloge turi būti failai:

shipments.json

Vartotojo įvedami duomenys
Task 2 metu vartotojas turi įvesti:

Enter custom VAT rate for Private clients (%):
Enter custom Excise rate for Gasoline:
Pavyzdys:

25
0.52
Įvesties duomenų formatas

shipments.json
[
  {
    "id": "9ec55ff2-7ab5-4cdf-b2fb-2aee508a9d56",
    "type": "DIESEL",
    "client": "PRIVATE",
    "date": "2023-12-28",
    "volume": 6200,
    "distance": 145.5,
    "basePrice": 0.93
  }
]


## Pastaba:

payments.json šiuo metu nenaudojamas,
nes Bonus 2 funkcionalumas nėra įgyvendintas.

Duomenų validacija
Kiekvienas pristatymo įrašas tikrinamas prieš atliekant skaičiavimus.

Galimi klaidų kodai:

MISSING_FIELD
UNKNOWN_TYPE
UNKNOWN_CLIENT
INVALID_DATE
INVALID_VALUE
DUPLICATE_ID
Neteisingi įrašai įrašomi į failą:

output/errors.csv
ir nėra įtraukiami į skaičiavimus.

Skaičiavimo taisyklės
Nuolaidos
Kiekis > 20000 litrų → 10 %
Kiekis > 5000 litrų  → 5 %
Kitu atveju          → 0 %
Pristatymo kaina
1,80 €/km
Mažo užsakymo mokestis
Jei kiekis < 1000 litrų → +150,00
Akcizas
GASOLINE → 0.47
DIESEL   → 0.33
LPG      → 0.18
PVM
PRIVATE klientui:

Iki 2024-01-01 → 21 %
Nuo 2024-01-01 → 23 %
EXEMPT klientui:

0 %
Apvalinimas
Visi piniginiai skaičiavimai atliekami naudojant:

ROUND_HALF_UP
Pavyzdžiai:

0.125 → 0.13
2.675 → 2.68
Kad būtų išvengta JavaScript slankiojo kablelio netikslumų, naudojama biblioteka:

decimal.js
Generuojami failai
task1.csv
Standartinių tarifų skaičiavimo rezultatai.

ShipmentID,NetFuelPrice,LogisticsCost,TotalTax,GrandTotal
task2.csv
Rezultatai naudojant vartotojo įvestą PVM ir akcizo tarifą.

ShipmentID,NetFuelPrice,LogisticsCost,TotalTax,GrandTotal
errors.csv
Atmesti įrašai.

ShipmentID,ErrorCode
Projektavimo sprendimai
Programa sukurta remiantis Single Responsibility Principle (SRP) principu.

Pagrindiniai moduliai:

Modulis	Paskirtis
validator.js	Duomenų validacija
pricingService.js	Verslo logika ir skaičiavimai
jsonReader.js	JSON failų nuskaitymas
csvWriter.js	CSV failų generavimas
reportWriter.js	Ataskaitų formavimas
dateUtils.js	Datų apdorojimas
decimalUtils.js	Piniginių reikšmių skaičiavimai
Algoritmo sudėtingumas
Tegu:

n = pristatymų skaičius
Tada:

Validacija     O(n)
Skaičiavimai   O(n)
Eksportas      O(n)
Bendras sudėtingumas:

O(n)
Dirbtinio intelekto panaudojimas
Kuriant projektą buvo naudojamas Microsoft Copilot:

projekto architektūros planavimui;
pseudokodo parengimui;
kodo peržiūrai;
README dokumentacijos rengimui;
galimų sprendimų ir patobulinimų siūlymui.
Visa sugeneruota medžiaga buvo peržiūrėta, suprasta ir pritaikyta projekto poreikiams prieš pateikimą.