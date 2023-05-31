# Dokumentacija projekta

## Sadržaj

- [Uvod](#uvod)
- [Instalacija](#instalacija)
- [Upotreba](#upotreba)
- [API Dokumentacija](#api-dokumentacija)
- [Licenca](#licenca)

## Uvod

Ovaj projekat omogućava slanje video snimaka sa React-om sa klijentske strane, dok se na serveru koristi Python sa Flask-om za obradu video snimka pomoću YOLOv5 algoritma za detekciju objekata. Nakon obrade, dobijeni rezultati o detektovanim objektima se vraćaju korisniku u obliku fajla. Projekat se nalazi na virtuelnoj mašini i uz pomoć NGINX-a moguće je isti koristiti.

## Instalacija

Ukoliko želite da koristite aplikaciju bez instalacija i konfiguracija dovoljno je da pokrenete virtuelnu mašinu i aplikacija će sa sama startovati.

Ukoliko želite lokalno da koristite projekat onda je potrebno uraditi sljedeće korake:

1. Klonirati repozitorijum

```
git clone https://github.com/feratovic/napredno-programiranje.git
```

2. Podesiti frontend

```
cd client
npm install
```

Dodati .env fajl:

```
REACT_APP_API_URL=http://127.0.0.1:5000/api #or your server base url
```

Pokrenuti aplikaciju:

```
npm start
```

pristupna tačka je: http://localhost:3000

3. Podesiti bekend

```
cd server
python3 -m venv venv
source venv/bin/activate #za windows ova komanda nije potrebna ukoliko ste podesili sve kako treba pri instalacija python-a
pip install -r requirements.txt # Ovim se instaliraju potrebne biblioteke za detekciju objekata
python3 app.py
```

**NAPOMENA**

- provjerite koju veriziju pythona koristite. Moguce je da vasa masina koristi python za pokretanje.
- Provjeriti /static/uploads folder. Ukoliko nepostoji krerati novi prazni na lokaciji /static.
- Snimci koje je generisao bekend tokom analize nalaze se u runs/detect/\*/ime_fajla

pristupna tačka je: http://localhost:5000/api

## Upotreba

Nakon što se projekat pokrene i forma za unos snimka se prikaže na http://localhost:3000 dovoljno je samo kliknuti na prostor za unos snimka ili prevući sam snimak na taj prostor. Nakon toga front će preći u stanje čekanja dok se video obrađuje na bekendu. Nakon obrađenog video snimka bekend će poslati gotovi excel fajl klijentu i istovremeno automatski ga preuzeti i poruka za uspješnu akciju biće prikaza. U suprotnom pojaviće se poruka za grešku.

## API dokumentacija

```
Base URL: https://localhost:5000/api
```

### Get Pozivi

1. https://localhost:5000/api - GET

Uspješni odgovor servera:

```
{'success': 'ok'}
```

2. https://localhost:5000/api/display/(ime_fajla) - GET

Uspješni odgovor servera biće link do snimka.

### POST Pozivi

1. https://localhost:5000/ - POST

Potrebno je poslati podatke na sljedeći način:

```
    file: File
```

```
 const formData = new FormData();
    formData.append('file', file);

    fetch(API, {
      method: 'POST',
      body: formData,
    })
```

Uspješni odgovor servera biće link do snimka.

## Licenca

Projekat koristi kao osnovu YOLOv5 i samim time i njegove licence:

- AGPL-3.0 Licenca: Pogledaj [Licencu](https://github.com/ultralytics/yolov5/blob/master/LICENSE) za više detalja.
- Enterprise License: Prati veću fleksibilnost za razvoj komercijalnih proizvoda bez zahteva otvorenog koda prema AGPL-3.0. Tipični scenariji upotrebe uključuju ugradnju Ultralytics softvera i AI modela u komercijalne proizvode i aplikacije. Zatražite Enterprise licencu na [Ultralytics Licensing](https://ultralytics.com/license).

Autorska prava (c) [2023] [Elmaz Feratović]

Dozvola se ovim daje, bez naknade, svakoj osobi koja je u posedu ovog softvera i pripadajućih datoteka (softver), da ga upotrebljava bez ograničenja, uključujući i bez ograničenja prava da kopira, menja, objavljuje, distribuira, sublicencira i/ili prodaje kopije softvera i omogući osobama kojima je softver dostavljen da to isto čine, u skladu sa sledećim uslovima:

Gore navedni tekst licence i sledeći opis autorskih prava i ovaj obaveštenje o dozvoli će biti uključeni u sve kopije ili bitne delove softvera.

SOFTVER JE ISPORUČEN "KAKAV JESTE", BEZ IKAKVE VRSTE GARANCIJA, IZRAŽENIH ILI PODRAZUMEVANIH, UKLJUČUJUĆI, ALI NE OGRANIČAVAJUĆI SE NA, GARANCIJE O POSEBNOM NAMENJENOSTI I GARANCIJE O USKLAĐENOSTI. AUTORI ILI NOSIOCI AUTORSKIH PRAVA NEĆE BITI ODGOVORNI ZA BILO KAKVU TUŽBU, ŠTETU ILI DRUGE ODGOVORNOSTI, BILE ONE UGOVORNE ILI DELOKTORNE, IZ PROIZILAZE IZ, U VEZI SA ILI U DRUGOM ODNOSU SA SOFTVEROM ILI UPOTREBOM ILI DRUGIM POSTUPANJEM SA SOFTVEROM.
