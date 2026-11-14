# 🛒 Eco Pilgua - Aplicación Web de Comercio Electrónico

Proyecto desarrollado como evaluación final para la asignatura **Programación de Componentes** de **IPLACEX**. Consiste en una aplicación web interactiva de comercio electrónico basada en React, conectada a los servicios Cloud de Firebase (Auth, Firestore, Storage y Cloud Functions) y estilizada con Bootstrap.

---

## 🚀 Características Principales

- **Arquitectura de Componentes en React:** Uso de componentes de clase y funcionales, manejo estricto de `state` y `props`, y comunicación bidireccional entre componentes (Padre-Hijo e Hijo-Padre) mediante callbacks.
- **Autenticación y Roles:** Sistema de inicio de sesión con Firebase Auth con control de acceso diferenciado (`admin` y `client`).
- **Panel de Administración (CRUD):** 
  - Registro de nuevos productos con validaciones.
  - Edición en línea de productos existentes con selector de archivos.
  - Eliminación directa de registros conectados a la base de datos.
- **Gestión Cloud Automatizada:** 
  - Almacenamiento de imágenes de productos en **Firebase Storage**.
  - **Cloud Functions (Node.js 2nd Gen):** Disparadores automáticos (*triggers*) configurados para limpiar y eliminar del Storage las imágenes huérfanas cada vez que se actualiza o elimina un producto.
- **Catálogo y Carrito de Compras:** Listado dinámico de productos mediante el uso de `map()`, control de stock visual y gestión de carrito de compras reactivo.
- **Estilos Profesionales:** Interfaz completamente adaptada y responsiva utilizando **Bootstrap**.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React (JavaScript, JSX), Bootstrap 5.
- **Backend & Cloud (Firebase):**
  - Firebase Authentication (Gestión de usuarios y roles).
  - Cloud Firestore (Base de datos NoSQL en tiempo real).
  - Firebase Storage (Alojamiento de archivos multimedia).
  - Cloud Functions v2 (Automatización de limpieza en backend).
- **Control de Versiones:** Git y GitHub.

---

## 📁 Estructura del Proyecto

```text
proyectoExamne/
├── functions/                  # Backend en la nube (Cloud Functions v2)
│   ├── index.js                # Triggers de limpieza de imágenes en Storage
│   └── package.json            # Dependencias de Node.js para Firebase Functions
├── public/                     # Archivos públicos estáticos
├── src/                        # Código fuente de la aplicación React
│   ├── components/             # Componentes reutilizables (Formulario, Gestión, Carrito, etc.)
│   ├── App.jsx                 # Componente principal y manejo de estado global/rutas
│   ├── firebase.js             # Configuración e inicialización de servicios Firebase
│   └── index.js                # Punto de entrada de la aplicación
├── package.json                # Dependencias y scripts del frontend
└── README.md                   # Documentación del proyecto
```

---

## ⚙️ Instrucciones de Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Brianbrowncoopman/tiendaComponentes.git
   cd tiendaComponentes
   ```

2. **Instalar las dependencias del proyecto web:**
   ```bash
   npm install
   ```

3. **Configurar las credenciales de Firebase:**
   Crea un archivo llamado `src/firebase.js` con las credenciales de tu proyecto de Firebase:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";

   const firebaseConfig = {
     apiKey: "TU_API_KEY",
     authDomain: "TU_AUTH_DOMAIN",
     projectId: "TU_PROJECT_ID",
     storageBucket: "TU_STORAGE_BUCKET",
     messagingSenderId: "TU_MESSAGING_SENDER_ID",
     appId: "TU_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);
   ```

4. **Ejecutar la aplicación en modo desarrollo:**
   ```bash
   npm run start
   ```
   La aplicación se abrirá automáticamente en `http://localhost:3000` (o el puerto configurado por tu entorno).

---

## 📦 Despliegue y Distribución

- **Despliegue Web:** Preparado para distribución en plataformas de alojamiento estático (Netlify / Vercel).
- **Despliegue Móvil:** Configurado para exportación a entorno nativo Android mediante Apache Cordova.

---

## ✒️ Autor
* **Estudiante:** Brian Rodrigo Brown Coopman
* **Institución:** IPLACEX