[readme_md.md](https://github.com/user-attachments/files/35388683/readme_md.md)

# 🛒 Aplicación Web y Móvil de Comercio Electrónico — Proyecto Examen

Proyecto desarrollado como evaluación final para la asignatura **Programación de Componentes** de **IPLACEX**. Consiste en una aplicación de comercio electrónico construida con **React** y **Vite**, integrada con los servicios cloud de **Firebase** (Auth, Firestore, Storage y Cloud Functions v2), estilizada con **Bootstrap 5**, desplegada en **Netlify** y empaquetada para **Android** mediante **Apache Cordova**.

---

## 🌐 Despliegue y Distribución

* **Sitio Web en Producción (Netlify):** [https://tiendacomponentes-08h1.netlify.app/](https://tiendacomponentes-08h1.netlify.app/)
* **Aplicación Móvil Android (APK / Releases):** [Ver Releases en GitHub](https://github.com/Brianbrowncoopman/tiendaComponentes/releases)

---

## 🚀 Características Principales

* **Menú Principal con Módulos / Ejercicios:** Navegación centralizada desde **Proyecto Examen** hacia **Ejercicio 1** (Lista de Productos y Carrito), **Ejercicio 2** (Formulario y Firestore) y **Ejercicio 3 / Tienda** (Catálogo conectado a Firestore, Carrito e Inicio de Sesión).
* **Arquitectura de Componentes en React:** Uso de componentes reutilizables (`carrito.jsx`, `formulario.jsx`, `producto.jsx`, `gestionProductos.jsx`, `login.jsx`, `subirArchivo.jsx`, `tienda.jsx`, `ejercicioUno.jsx`, `ejercicioDos.jsx`), manejo de estado y propiedades, y comunicación entre componentes.
* **Autenticación y Control de Acceso:** Inicio de sesión con **Firebase Auth** y gestión diferenciada de vistas y acciones (catálogo, carrito e inicio de sesión).
* **Gestión de Productos (CRUD):** Registro de productos, carga y selección de archivos mediante `subirArchivo.jsx`, administración en `gestionProductos.jsx` y persistencia en **Cloud Firestore**.
* **Almacenamiento y Limpieza Cloud:** Almacenamiento de imágenes en **Firebase Storage** y automatización mediante **Cloud Functions v2** (`functions/index.js`) para eliminar imágenes huérfanas cuando se actualizan o eliminan productos.
* **Catálogo y Carrito Reactivo:** Renderizado dinámico de productos, control de stock y gestión en tiempo real del carrito de compras.
* **Exportación Móvil con Cordova:** Proyecto Android en `examenCordova` sincronizado con los archivos compilados de la aplicación web para generar el `.apk`.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, Vite 8, JavaScript (JSX), Bootstrap 5.
* **Backend & Cloud (Firebase):**
  * Firebase Authentication
  * Cloud Firestore (`firestore.rules`, `firestore.indexes.json`)
  * Firebase Storage
  * Cloud Functions v2 (`functions/`)
* **Móvil:** Apache Cordova (`examenCordova`, `config.xml`, `platforms/`, `www/`).
* **Despliegue y Control de Versiones:** Git, GitHub y Netlify.

---

## 📁 Estructura del Proyecto

```text
examen/
├── examenCordova/              # Proyecto wrapper para exportación a Android (Apache Cordova)
│   ├── config.xml              # Configuración de la aplicación Cordova
│   ├── platforms/              # Plataformas nativas (Android)
│   ├── www/                    # Recursos web sincronizados para el build móvil
│   └── package.json            # Scripts y dependencias de Cordova
├── proyectoExamne/             # Aplicación principal React + Vite + Firebase
│   ├── dist/                   # Build de producción generado por Vite
│   ├── functions/              # Cloud Functions v2 (triggers y limpieza en Storage)
│   │   ├── index.js
│   │   └── package.json
│   ├── public/                 # Archivos públicos estáticos
│   ├── src/
│   │   ├── assets/             # Recursos multimedia y estilos locales
│   │   ├── components/
│   │   │   ├── ejercicioUno/   # carrito.jsx, ejercicioUno.jsx, formulario.jsx, producto.jsx
│   │   │   ├── ejercicioDos/   # carrito.jsx, ejercicioDos.jsx, formulario.jsx, producto.jsx
│   │   │   └── ejercicioTres/  # carrito.jsx, formulario.jsx, gestionProductos.jsx, login.jsx, producto.jsx, subirArchivo.jsx, tienda.jsx
│   │   ├── App.jsx             # Componente principal y navegación entre módulos
│   │   ├── firebase.js         # Inicialización de Firebase
│   │   └── main.jsx            # Punto de entrada de Vite
│   ├── .env                    # Variables de entorno locales (no subir credenciales sensibles)
│   ├── firebase.json           # Configuración de proyectos/servicios Firebase
│   ├── firestore.rules         # Reglas de seguridad de Firestore
│   ├── package.json            # Dependencias y scripts del frontend
│   └── vite.config.js          # Configuración de Vite
└── README.md                   # Documentación general del repositorio
```

---

## ⚙️ Instrucciones de Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Brianbrowncoopman/tiendaComponentes.git
cd tiendaComponentes/proyectoExamne
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno de Firebase

Crea un archivo `.env` dentro de `proyectoExamne/` con las credenciales `VITE_*` de tu proyecto Firebase (utilizadas en `src/firebase.js`):

```env
VITE_API_KEY=TU_API_KEY
VITE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_PROJECT_ID=TU_PROJECT_ID
VITE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_APP_ID=TU_APP_ID
```

### 4. Ejecutar en desarrollo o compilar para producción

```bash
# Modo desarrollo
npm run dev

# Build de producción (genera la carpeta dist/)
npm run build
```

---

## 📱 Compilación Móvil (Apache Cordova)

1. Genera la compilación web dentro de `proyectoExamne/`:
   ```bash
   cd proyectoExamne
   npm run build
   ```
2. Copia o sincroniza los archivos compilados hacia `examenCordova/www/` y compila para Android desde `examenCordova/`:
   ```bash
   cd ../examenCordova
   cordova build android
   ```
   *(También puedes descargar el `.apk` directamente desde la sección de **Releases** de este repositorio).*

---

## ✒️ Autores

* **Brian Rodrigo Brown Coopman**
* **David Campos**
* **Alejandra Fredes**
* **Felipe Rosales**

**Institución:** IPLACEX
