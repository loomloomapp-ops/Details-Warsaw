# Hybrid Doktor — Details Warsaw

Marketplace запчастей для гибридных Toyota.

Стек: **Next.js 14 (App Router) + Prisma + MySQL + NextAuth + TypeScript**.

---

## Этап 1 (текущий) — что готово

- Скаффолд Next.js 14 + TypeScript + Prisma + Tailwind + NextAuth.
- Схема БД: `Admin`, `Category`, `Product`, `ProductImage`, `ProductCategory` (с полями для RU / UA / PL).
- **Админ-панель `/admin`**:
  - Логин по логину/паролю (хэш bcrypt).
  - CRUD товаров: 8 полей (Название, Короткое описание, Артикул, Номер детали, Цвет, Материал, Категории, Детальное описание) + загрузка нескольких фото (автооптимизация в WebP через sharp).
  - CRUD категорий (RU/UA/PL).
  - Привязка товара к нескольким категориям.
  - Поиск товаров по названию и номеру детали/артикулу.
- Поиск в публичном каталоге (`/catalog?q=...`) по названию (RU/UA/PL) + артикулу + номеру детали.
- Базовая публичная страница товара (`/catalog/[id]`) — пустые поля **не отображаются** (по требованию).
- Защита `/admin/*` через middleware NextAuth.

> **Этап 2** — точное портирование Figma-дизайна (Home / Categories / Catalog / Card desktop) и подключение его к реальным данным.
> **Этап 3** — Mobile-версии всех страниц + переключатель языков RU/UA/PL.

---

## Локальный запуск

```bash
# 1) Установить зависимости
npm install

# 2) Создать .env (взять за основу .env.example)
cp .env.example .env
# и вписать DATABASE_URL, NEXTAUTH_SECRET, ADMIN_LOGIN, ADMIN_PASSWORD

# 3) Создать таблицы в БД и первого админа
npm run db:push
npm run db:seed

# 4) Запустить dev
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin/login
```

---

## Деплой на Hostinger (Node.js)

### Шаг 1. Создать MySQL базу в Hostinger

1. Панель Hostinger → **Базы данных → MySQL → Создать новую**.
2. Запиши:
   - имя БД (`u123_details`)
   - пользователь (`u123_admin`)
   - пароль
   - хост (обычно `localhost` для PHP-сайтов, но для Node.js часто другой — `mysql.hostinger.com` или IP; смотри в инфо БД)
   - порт (обычно `3306`)
3. Если планируешь миграции с локальной машины — включи **Remote MySQL** и добавь свой IP.

### Шаг 2. Создать Node.js приложение

1. Панель Hostinger → **Сайты → Создать сайт → Вебзастосунок Node.js**.
2. Подключить GitHub: репозиторий `loomloomapp-ops/Details-Warsaw`, ветка `main`.
3. **Application root**: `/`
4. **Application URL**: твой домен или временный поддомен.
5. **Application startup file**: `node_modules/next/dist/bin/next` с аргументом `start` (или используй встроенный shortcut «npm start», если он есть в интерфейсе).
6. **Node version**: 20.x (рекомендую) или 18+.

### Шаг 3. Переменные окружения

В разделе **Environment Variables** добавь:

| Ключ | Значение |
|------|----------|
| `DATABASE_URL` | `mysql://USER:PASS@HOST:3306/DB` (данные из шага 1) |
| `NEXTAUTH_SECRET` | сгенерируй: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://твой-домен.com` |
| `ADMIN_LOGIN` | `adminwar` |
| `ADMIN_PASSWORD` | `x1311973X!` |
| `NODE_ENV` | `production` |

### Шаг 4. Сборка

В Hostinger обычно есть кнопка **«Run NPM Install»** и **«Run NPM Script → build»**. Запусти:

1. `npm install`
2. `npm run build`

Если такого нет — открой SSH/Terminal в панели и выполни:

```bash
cd ~/domains/твой-домен.com/public_html  # путь приложения
npm install
npm run build
```

### Шаг 5. Создать таблицы БД и первого админа

В терминале Hostinger (или через NPM Script panel):

```bash
npm run db:push    # создаст таблицы
npm run db:seed    # создаст админа adminwar / x1311973X!
```

### Шаг 6. Запуск

Hostinger перезапустит приложение автоматически, либо нажми **Restart App**.

Проверка:

- `https://твой-домен.com/` — стартовая страница (заглушка с заглушкой счётчиков; на Этапе 2 заменится точной копией Figma)
- `https://твой-домен.com/admin/login` — логин в админку
- `https://твой-домен.com/catalog` — публичный каталог

---

## Структура проекта

```
src/
  app/
    page.tsx                 — главная (Этап 2: точная Figma-копия Home)
    catalog/
      page.tsx               — каталог + поиск
      [id]/page.tsx          — карточка товара
    admin/
      login/page.tsx         — форма входа
      (authed)/              — защищённая зона
        page.tsx             — дашборд
        products/            — CRUD товаров
        categories/          — CRUD категорий
    api/auth/[...nextauth]/  — NextAuth API
  lib/
    db.ts                    — Prisma client
    auth.ts                  — NextAuth config
    i18n.ts                  — словари RU/UA/PL + slugify
    uploads.ts               — загрузка фото (sharp → WebP)
  middleware.ts              — защита /admin/*
prisma/
  schema.prisma              — схема БД
  seed.ts                    — создание первого админа
public/
  uploads/                   — загруженные фото
```

---

## Учетные данные админа (по умолчанию)

- Логин: `adminwar`
- Пароль: `x1311973X!`

Создаются при запуске `npm run db:seed`. Хранятся в БД хэшем bcrypt.

---

## Что дальше

После деплоя Этапа 1:

1. **Этап 2** — портирование Figma-дизайна 1-в-1 (Home, Categories, Catalog, Card — desktop).
2. **Этап 3** — Mobile + переключатель языков RU/UA/PL.
