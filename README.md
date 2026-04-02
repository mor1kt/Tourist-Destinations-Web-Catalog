## Описание проекта
**Tourist Destinations Web Catalog** — веб‑приложение для просмотра и управления туристическими направлениями с авторизацией, изображениями и админ‑панелью статистики.

## Ссылка на сайт
https://tourist-destinations-web-catalog-h7bck1k06.vercel.app/

## Технологический стек
- Frontend: React (hooks), Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Storage: Cloudinary

## Установка
1. Клонировать репозиторий.
2. Установить зависимости:
```
cd "d:\Tourist Destinations Web Catalog\frontend"
npm install
cd "d:\Tourist Destinations Web Catalog\backend"
npm install
```

## Переменные окружения
**Backend (`backend/.env`)**
```
PORT=4000
MONGODB_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ORIGIN=http://localhost:5173
```

**Frontend (`frontend/.env`)**
```
VITE_API_BASE_URL=http://localhost:4000/api
```

## Запуск в разработке
**Backend**
```
cd "d:\Tourist Destinations Web Catalog\backend"
npm run dev
```

**Frontend**
```
cd "d:\Tourist Destinations Web Catalog\frontend"
npm run dev
```

## Продакшен билд
**Frontend**
```
cd "d:\Tourist Destinations Web Catalog\frontend"
npm run build
```

**Backend**
```
cd "d:\Tourist Destinations Web Catalog\backend"
npm run start
```


## Документация API
См. `docs/API.md`.
