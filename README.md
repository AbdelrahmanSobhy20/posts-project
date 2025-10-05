# Blog App (React + Firebase)

<p align="center">
  <img src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png" alt="React Logo" width="100" />
</p>

A modern blogging platform built with React, Vite, Firebase (Auth, Firestore, Storage), React Router, and Tailwind CSS + DaisyUI. Users can register/login, create posts with images, manage their profile, and browse content.

---

## Demo & Repo

- **Live Demo**: https://shoolbaba.vercel.app
- **GitHub Repo**: https://github.com/engbasel/blog-app

---

## Tech Stack

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white&style=for-the-badge)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Auth%2C%20Firestore%2C%20Storage-ffca28?logo=firebase&logoColor=black&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white&style=for-the-badge)
![DaisyUI](https://img.shields.io/badge/DaisyUI-Components-6b21a8?logo=daisyui&logoColor=white&style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white&style=for-the-badge)
![Toastify](https://img.shields.io/badge/React%20Toastify-Latest-12a0ff?style=for-the-badge)

---

## Features

- **Authentication**: Email/password auth via Firebase (`firebase/auth`).
- **Profiles**: View and edit profile with avatar upload to Firebase Storage.
- **Posts**: Create, view, and manage blog posts stored in Firestore.
- **Routing**: Client-side routing with `react-router-dom`.
- **UI/UX**: Tailwind CSS with DaisyUI components and responsive layout.
- **Notifications**: `react-toastify` for friendly toasts.
- **Mock API (optional)**: `json-server` for local data prototyping via `db.json`.

---

## Project Structure

```text
d:/courses/React/Projects/blog-app/
├─ firebase/
│  └─ config.js                 # Firebase initialization
├─ public/
├─ src/
│  ├─ components/
│  │  └─ Navbar.jsx             # Top navigation with auth-aware links
│  ├─ features/
│  │  ├─ about/                 # About page
│  │  ├─ auth/                  # Login/Register
│  │  ├─ posts/                 # AddPost, post features
│  │  └─ Profile/               # ProfileView, MyPosts
│  ├─ App.jsx                   # Routes and layout
│  ├─ App.css
│  └─ ...
├─ db.json                      # Optional mock API data for json-server
├─ tailwind.config.js           # Tailwind + DaisyUI config
├─ vite.config.js               # Vite setup
└─ package.json

```
---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm/yarn)

### 1) Install dependencies

```bash
npm install
```
### 2) Configure Firebase

The project initializes Firebase in `firebase/config.js`.
For production or public repos, move secrets to environment variables and do not commit keys. With Vite, environment variables must be prefixed with `VITE_` and loaded via `import.meta.env`.

Example `.env` (do not commit):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```
And then in `firebase/config.js` read from `import.meta.env`.

### 3) Run the app (development)

```bash
npm run dev
```
Vite will print a local URL (typically http://localhost:5173).

### 4) Optional: Start mock API (json-server)

If you want a quick REST endpoint for prototyping with `db.json`:

```bash
npx json-server --watch db.json --port 3001
```
This exposes resources at `http://localhost:3001`. Adjust your fetch calls accordingly.

---

## Available Scripts

- **dev**: Start Vite dev server.
- **build**: Production build.
- **preview**: Preview the production build locally.
- **lint**: Run ESLint.

```bash
npm run dev
npm run build
npm run preview
npm run lint
```
---

## Routing

Routes are defined in `src/App.jsx` using `react-router-dom`:

- `/` → Home
- `/login`, `/register`
- `/about`
- `/add` → AddPost
- `/profile` → ProfileView (auth-aware)
- `/MyPosts` → MyPosts
- `*` → PageNotFound

---

## Styling

- Tailwind utility classes (see `tailwind.config.js`).
- DaisyUI components enabled via Tailwind plugin.
- Local component styles (e.g., `Navbar.css`, feature CSS files).

---

## Firebase Notes

- Services initialized in `firebase/config.js`:
  - `auth` (Email/Password auth)
  - `db` (Firestore)
  - `storage` (image uploads)
- Ensure proper Firebase Security Rules for Firestore and Storage in production.
- Never commit real secrets in public repositories. Prefer `.env` and CI secrets.

---

## Quality

- **ESLint**: Configured via `eslint.config.js`.
- **Notifications**: `react-toastify` integrated in `src/App.jsx` (`<ToastContainer />`).

---

## Deployment

- Build with `npm run build` (output in `dist/`).
- Deploy the static build to your host (Vercel, Netlify, Firebase Hosting, etc.).
- Set environment variables on the hosting platform for Firebase configuration.

---

## Screenshots

Add screenshots to `public/` and embed here:

```md
![Home](public/screenshot-home.png)
![Profile](public/screenshot-profile.png)
```
---

## Acknowledgements

- Instructor: **Eng. Ahmed Zaghloul** — [LinkedIn](https://www.linkedin.com/in/azaghloul/)
- Built by: **Basel Embaby** (Mansoura, Egypt)
  - Website: https://shoolbaba.vercel.app
  - GitHub: https://github.com/engbasel
  - LinkedIn: (share your profile and we'll add it here)

---

## License

This project is provided for educational purposes. Add a license (e.g., MIT) if you plan to distribute.

---

## TODO / roadmap

- Draft/Publish flow for posts
- Comments and likes
- Search and tags
- Dark mode polish with DaisyUI themes
- Migrate Firebase config to environment variables
