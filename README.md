# Dumb Charades

A simple and fun **Dumb Charades game** built with React, Vite, Tailwind CSS, and Capacitor.

## Features

*  Bollywood & Hollywood movie categories
*  Timed gameplay
*  Random movie selection
*  Simple and interactive game interface
*  Mobile-friendly design
*  Android app support using Capacitor
*  Can also be played as a web app

## Tech Stack

* **React** 
* **Vite** 
* **Tailwind CSS** 
* **Capacitor** 
* **JavaScript** 

## Android App

The web application is packaged as an Android application using Capacitor.

The Android project is included in the `android/` directory.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/sanwyam/dumb-charades-app.git
cd dumb-charades-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

## Build

Create a production build:

```bash
npm run build
```

The generated production files will be placed in the `dist/` directory.

## Movie Lists

The movie lists are stored in:

```text
src/App.jsx
```

The Bollywood and Hollywood movie arrays can be edited to add or remove movies.

## Project Structure

```text
dumb-charades-app/
├── android/              # Android/Capacitor project
├── src/                  # React source code
├── index.html            # Main HTML file
├── capacitor.config.json # Capacitor configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## Deployment

The application can be deployed as a web app using platforms such as Vercel or Netlify.

For Android builds, the Capacitor Android project can be opened and built using Android Studio.

## Author

**Sanyam Mishra**

---

⭐ If you like the project, consider giving the repository a star!
