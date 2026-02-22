# Articles API

Base URL when running locally: `http://localhost:3001`

---

## Endpoints

### GET /

Health check.

**Response:** `200 OK`

```json
{ "ok": true }
```

---

### GET /articles

Returns a list of articles. Optionally filter by title.

**Query parameters**

| Parameter | Type   | Required | Description                                                                 |
|----------|--------|----------|-----------------------------------------------------------------------------|
| `title`  | string | No       | Filter by title (case-insensitive, partial match). If omitted, all articles are returned. |

**Response:** `200 OK`

JSON array of article objects. Each object has:

| Field      | Type   | Description                    |
|-----------|--------|--------------------------------|
| `id`      | number | Primary key                    |
| `title`   | string | Article title                  |
| `body`    | string | Article body text              |
| `createdAt` | string | ISO 8601 date (e.g. `2026-02-22T14:00:00.000Z`) |
| `updatedAt` | string | ISO 8601 date                  |

**Examples**

- All articles:  
  `GET /articles`

- Filter by title (e.g. articles whose title contains "react"):  
  `GET /articles?title=react`

**Sample response**

```json
[
  {
    "id": 1,
    "title": "How to bake sourdough bread at home",
    "body": "A beginner-friendly guide to making your first loaf.",
    "createdAt": "2026-02-22T14:00:00.000Z",
    "updatedAt": "2026-02-22T14:00:00.000Z"
  }
]
```
