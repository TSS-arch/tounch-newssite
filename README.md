# Tounch Software Solutions — News Platform

A professional 3-part project:

```
newsproject/
├── backend/     Flask (app-factory + blueprints + service layer) + SQLite
├── admin/       React + Redux Toolkit + Axios + Tailwind  (admin console)
└── newssite/    React + Redux Toolkit + Axios + Tailwind  (public website)
```

---

## Architecture

### Frontend — 4-layer, feature-based (same pattern in `admin/` and `newssite/`)

```
src/
├── api/
│   └── axiosInstance.js        # ONE shared Axios instance — every call goes through it
├── store/
│   └── index.js                # Redux Toolkit store
├── config/                     # (newssite) company & contact info in one place
└── pages/
    └── <feature>/              # e.g. admin / feed
        ├── api/                # API functions for this page (use axiosInstance)
        ├── state/              # Redux slice + async thunks  (STATE layer)
        ├── hooks/              # business logic hooks         (LOGIC layer)
        ├── ui/                 # Tailwind + JSX components     (UI layer)
        └── <Feature>Page.jsx   # composition root
```

- **UI layer** (`ui/`) — pure presentation, Tailwind + JSX, no API/logic.
- **Hooks layer** (`hooks/`) — business logic; UI calls these, never the store/API directly.
- **State layer** (`state/`) — Redux Toolkit slices and async thunks.
- **API layer** (`api/`) — functions that talk to the backend through the shared
  `src/api/axiosInstance.js`.

### Backend — layered Flask

```
backend/
├── run.py                  # entry point:  python run.py
├── config.py               # configuration
└── app/
    ├── __init__.py         # application factory (create_app)
    ├── database.py         # SQLite connection + schema
    ├── utils.py            # helpers (YouTube parsing, file types)
    ├── routes/posts.py     # Blueprint — thin HTTP controllers
    └── services/
        └── post_service.py # business logic (create/list/update/delete)
```

Uploaded files are stored in `backend/resources/`; their index/metadata lives in
SQLite (`database.db`). `/api/media/<id>` looks up the filename by id and serves
the real file.

---

## Install & run (3 terminals)

### 1) Backend — http://localhost:5000
```bash
cd backend
python -m venv venv
# Windows:   venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### 2) Admin console — http://localhost:5173
```bash
cd admin
npm install        # pulls React, Redux Toolkit, Axios, Tailwind, Framer Motion
npm run dev
```

### 3) Public website — http://localhost:5174
```bash
cd newssite
npm install
npm run dev
```

> Start the backend first, then the two React apps. Needs Node.js and Python.

### Front-end dependencies (installed automatically by `npm install`)
`@reduxjs/toolkit`, `react-redux`, `axios`, `framer-motion`, plus dev deps
`tailwindcss`, `postcss`, `autoprefixer`. Nothing to install by hand.

---

## Features

- **Admin**: upload image/video **or** paste a YouTube link, add a caption,
  edit, and delete. Live stat cards, animated grid, modal editor, toasts.
- **Public site**: animated hero, live auto-refreshing feed (images, videos,
  embedded YouTube players), a **Contact Us** section with your phone, email and
  a Google Map of your location, and a full footer — with hover effects and
  scroll-reveal animations throughout.

### Your details (edit in `newssite/src/config/site.js`)
- Phone: +91 7044371446
- Email: Touchsoftware@Gmail.Com
- Location: B047, Nilganj Road, Duttapukur, Shibalaya, Near Shibalaya F.P School,
  West Bengal — 743248

---

## API reference

| Method | Route               | Purpose                               |
|--------|---------------------|---------------------------------------|
| POST   | `/api/posts`        | Create (`file` OR `youtube_url`)      |
| GET    | `/api/posts`        | List all posts                        |
| GET    | `/api/posts/<id>`   | Single post                           |
| PUT    | `/api/posts/<id>`   | Edit caption / replace media          |
| DELETE | `/api/posts/<id>`   | Delete post (and its file)            |
| GET    | `/api/media/<id>`   | Serve the real uploaded file by id    |

To point the frontends at a different backend, set `VITE_API_BASE` or edit
`src/api/axiosInstance.js`.
