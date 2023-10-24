# Russia Army Casualties API

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)
[![GitPod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/andriilive/russia-casualties-ukraine-war-parser)
[![Start parser](https://github.com/andriilive/russia-casualties-ukraine-war-parser/actions/workflows/start.yaml/badge.svg)](https://github.com/andriilive/russia-casualties-ukraine-war-parser/actions/workflows/start.yaml)

A cozy opensource Russia army casualties parser for open-source lovers. Parses, stores and publishes structured russian army losses. Updated daily at `5:30 UTC (8:30 Europe/KIEV)`

[https://russia-casualties-ukraine-war-parser.vercel.app](https://russia-casualties-ukraine-war-parser.vercel.app)

## API

By default api returns today's casualties data as array  of today's incremental and total casualties `[today, total]`.

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api
```

```json5
{
  "day": 607,
  "militaryPersonnel": [870, 294700],
  "jet": [0, 320],
  "copter": [0, 324],
  "tank": [12, 5093],
  "armoredCombatVehicle": [22, 9653],
  "artillerySystem": [25, 7057],
  "airDefenceSystem": [2, 551],
  "mlrs": [0, 825],
  "supplyVehicle": [15, 9419],
  "ship": [0, 20],
  "uav": [6, 5345]
}
```

---

### Casualties

#### Today

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/today
```

**Response structure example:**

```json5
{
  "id": 607, /* WAR DAY NUMBER */
  "militaryPersonnel": 294700,
  "jet": 320,
  "copter": 324,
  "tank": 5093,
  "armoredCombatVehicle": 9653,
  "artillerySystem": 7057,
  "airDefenceSystem": 551,
  "mlrs": 825,
  "supplyVehicle": 9419,
  "ship": 20,
  "uav": 5345,
  "created_at": "2023-10-23T08:34:32.371Z"
}
```

#### Specific day

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/607
```

#### Last 2 days

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/last
```

#### Parsed days

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/days
```

---

### i18n Strings

Languages available: `ua`, `ru`, `cs`, `en`

#### Single language

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/i18n/ua
```

**Response structure example:**

```json5
{
  "id": "ua",
  "languageName": "Українська",
  "casualtiesTypes": {
    "militaryPersonnel": "Особистий військовий склад",
    "jet": "Літаки",
    "copter": "Гелікоптери",
    "tank": "Танки",
    "armoredCombatVehicle": "Бойові броньовані машини",
    "artillerySystem": "Артилерійські системи",
    "airDefenceSystem": "Засоби протиповітряної оборони",
    "mlrs": "Реактивні системи залпового вогню",
    "supplyVehicle": "Автомобільна техніка і цистерни з паливом",
    "ship": "Кораблі та танкери",
    "uav": "Безпілотні літальні апарати"
  }
}
```

#### i18n All languages Listing

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/i18n
```

## Parser

Simplest ever parser. Uses [Ukrainska Pravda](https://www.pravda.com.ua/eng/) as data source.

## Useful Links 🔗

- Old [Crawlee branch](https://github.com/andriilive/russia-casualties-ukraine-war-parser/tree/old/crawlee)
- Old [pupetter-ts branch](https://github.com/andriilive/russia-casualties-ukraine-war-parser/tree/old/puppetter-ts)
- [Law of ukraine on copyright and related rights (ENG) - Article 10](https://zakon.rada.gov.ua/laws/show/en/3792-12/conv#n165)
- [War in UA: public data & infographics repo](https://github.com/lymenbae/War-in-Ukraine)
- [#russiagoodbyeproject](https://github.com/topics/russiagoodbyeproject)
- Inspiration Dev Resources: https://github.com/IgorVaryvoda/Help-Ukraine#for-developers
