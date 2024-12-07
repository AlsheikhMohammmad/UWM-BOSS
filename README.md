# UWM BOSS App 🚍

Welcome to the UWM BOSS app repository! This project is designed to enhance the Be on the Safe Side (B.O.S.S.) transportation service at the University of Wisconsin-Milwaukee (UWM). 

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Supervisor Login Credentials](#supervisor-login-credentials)

---

## Features
- **User-friendly mobile app** for requesting rides.
- **Backend integration** with Django for ride management.
- Real-time updates and notifications.
- Optimized for UWM's campus safety program.

---

## Tech Stack
- **Frontend**: React Native
- **Backend**: Django
- **Database**: SQLite / PostgreSQL (depending on deployment)
- **Other Tools**: Expo, AsyncStorage

---

## Prerequisites
Before cloning and running the app, make sure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Python** (v3.10 or later)
- **Expo** (`npm install -g expo`)
- **Django** (`pip install django`)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/uwm-boss.git
cd uwm-boss
```
## Running the app

### 2. Set Up the Frontend
1. Navigate to the `Frontend/userInterface` folder:
    ```bash
    cd Frontend/userInterface
    ```
2. Install the required modules:
    ```bash
    npm install --force
    ```
3. Start the Expo development server:
    ```bash
    npx expo start
    ```
4. When the Expo CLI opens, press:
    - **`w`** to launch the app in your browser.
   (Do not launch the application using the QR code)

---

### 3. View the App in Phone Dimensions
1. Open your browser's developer tools:
   - Right-click on the page and select **Inspect**.
   - Or press `F12`.
2. Toggle device emulation:
   - Click the **"Toggle Device Toolbar"** icon (📱) on the top-left corner of the developer tools.
   - Select a mobile device preset (e.g., iPhone, Pixel) from the dropdown menu.
  
---
  
## Supervisor Login Credentials
To log in as a guest supervisor, use the following credentials:
- **Username**: `Supervisor`
- **Password**: `Password@1`

This guest account is intended for testing and demonstration purposes only.
