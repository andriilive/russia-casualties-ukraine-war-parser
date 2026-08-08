

# API de Bajas del Ejército de Rusia

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)
[![GitPod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/andriilive/russia-casualties-ukraine-war-parser)
[![Start parser](https://github.com/andriilive/russia-casualties-ukraine-war-parser/actions/workflows/start.yaml/badge.svg)](https://github.com/andriilive/russia-casualties-ukraine-war-parser/actions/workflows/start.yaml)

Un práctico analizador (parser) de código abierto sobre las bajas del ejército ruso para amantes del software libre. Analiza, almacena y publica las pérdidas estructuradas del ejército ruso. Se actualiza diariamente a las `8:30 UTC (10:30 hora de Kiev)`

[https://russia-casualties-ukraine-war-parser.vercel.app](https://russia-casualties-ukraine-war-parser.vercel.app)

## API

Por defecto, la API devuelve los datos de bajas del día como un array con las bajas incrementales y totales de hoy `[hoy, total]`.

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

### Bajas

#### Hoy

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/today
```

**Ejemplo de estructura de respuesta:**

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

#### Día específico

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/607
```

#### Últimos 2 días

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/last
```

#### Días analizados

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/days
```

---

### Cadenas de internacionalización (i18n)

Idiomas disponibles: `ua`, `ru`, `cs`, `en`

#### Un solo idioma

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/i18n/ua
```

**Ejemplo de estructura de respuesta:**

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

#### Listado de todos los idiomas de i18n

```bash
curl -fsSL https://russia-casualties-ukraine-war-parser.vercel.app/api/i18n
```

## Analizador (Parser)

El analizador más sencillo hasta la fecha. Utiliza [Ukrainska Pravda](https://www.pravda.com.ua/eng/) como fuente de datos.

## Enlaces útiles 🔗

- Rama antigua de [Crawlee](https://github.com/andriilive/russia-casualties-ukraine-war-parser/tree/old/crawlee)
- Rama antigua de [pupetter-ts](https://github.com/andriilive/russia-casualties-ukraine-war-parser/tree/old/puppetter-ts)
- [Ley de Ucrania sobre derechos de autor y derechos conexos (ENG) - Artículo 10](https://zakon.rada.gov.ua/laws/show/en/3792-12/conv#n165)
- [Guerra en UA: repositorio de datos públicos e infografías](https://github.com/lymenbae/War-in-Ukraine)
- [#russiagoodbyeproject](https://github.com/topics/russiagoodbyeproject)
- Recursos de desarrollo de inspiración: https://github.com/IgorVaryvoda/Help-Ukraine#for-developers
