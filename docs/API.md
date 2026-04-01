# Документация API

Базовый URL (локально): `http://localhost:4000/api`

## Авторизация

### POST `/auth/register`
**Описание:** регистрация пользователя.

**Request**
```json
{
  "name": "Иван",
  "email": "ivan@example.com",
  "password": "secret123"
}
```

**Response 201**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "64f...",
    "name": "Иван",
    "email": "ivan@example.com",
    "role": "user"
  }
}
```

### POST `/auth/login`
**Описание:** вход пользователя.

**Request**
```json
{
  "email": "ivan@example.com",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "64f...",
    "name": "Иван",
    "email": "ivan@example.com",
    "role": "user"
  }
}
```

**Ошибки**
- `404` User not found
- `401` Wrong password

## Направления

### GET `/destinations`
**Описание:** список направлений.

**Response 200**
```json
[
  {
    "_id": "64f...",
    "title": "Алматы",
    "description": "Горный город...",
    "country": "Казахстан",
    "images": ["https://..."],
    "rating": 4.7
  }
]
```

### GET `/destinations/:id`
**Описание:** получить направление по id.

**Response 200**
```json
{
  "_id": "64f...",
  "title": "Алматы",
  "description": "Горный город...",
  "country": "Казахстан",
  "images": ["https://..."],
  "rating": 4.7
}
```

### POST `/destinations` (только admin)
**Описание:** создать направление.

**Headers**
```
Authorization: Bearer <token>
```

**Request**
```json
{
  "title": "Алматы",
  "description": "Горный город...",
  "country": "Казахстан",
  "images": ["https://..."],
  "rating": 4.7
}
```

**Response 201**
```json
{
  "_id": "64f...",
  "title": "Алматы",
  "description": "Горный город...",
  "country": "Казахстан",
  "images": ["https://..."],
  "rating": 4.7
}
```

### PUT `/destinations/:id` (только admin)
**Описание:** обновить направление.

**Headers**
```
Authorization: Bearer <token>
```

**Request**
```json
{
  "title": "Алматы",
  "description": "Обновлённое описание",
  "country": "Казахстан",
  "images": ["https://..."],
  "rating": 4.8
}
```

### DELETE `/destinations/:id` (только admin)
**Описание:** удалить направление.

**Headers**
```
Authorization: Bearer <token>
```

**Response 200**
```json
{
  "message": "Destination deleted"
}
```

## Админ

### GET `/admin/stats` (только admin)
**Описание:** статистика админ‑панели.

**Headers**
```
Authorization: Bearer <token>
```

**Response 200**
```json
{
  "usersCount": 10,
  "destinationsCount": 4
}
```

## Загрузка изображений

### POST `/uploads/images` (только admin)
**Описание:** загрузка изображения в Cloudinary.

**Headers**
```
Authorization: Bearer <token>
```

**Body (form-data)**
- `image`: файл изображения

**Response 201**
```json
{
  "url": "https://res.cloudinary.com/..."
}
```
