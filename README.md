
<h1 align="center">⚫ Notitas ⚫</h1>

<p align="center">
<img src="https://img.shields.io/badge/STATUS-DESARROLLO-green">
</p>

## 📋 Índice

* [Descripción](#descripcion)
* [Capturas](#capturas)
* [Funcionalidades](#funcionalidades)
* [Instalación](#instalacion)
* [Tecnologías](#tecnologias)
* [Demo](#demo)
* [Contacto](#contacto)

<h2 id="descripcion">📖 Descripción</h2>

**Notitas** es una aplicación web para crear, compartir y descubrir notas o posts cortos.
Los usuarios pueden crear notas con contenido en Markdown, darle likes, comentar y seguir a otros usuarios.
Ideal para quienes quieran organizar ideas, compartir conocimientos o interactuar en una comunidad de manera sencilla y visual.

<h2 id="capturas">📸 Capturas</h2>

<p align="center">
  <img src="https://res.cloudinary.com/dnk4cm0wq/image/upload/v1764309218/captura1_xh6kxw.png" width="500"/>
  <img src="https://res.cloudinary.com/dnk4cm0wq/image/upload/v1764309218/captura2_t55jpt.png" width="500"/>
</p>

<h2 id="funcionalidades">:hammer: Funcionalidades</h2>

* ✍️ Crear, editar y eliminar notas.
* ❤️ Dar y recibir likes en notas.
* 💬 Comentar en notas de otros usuarios.
* 📄 Formato Markdown en las notas.
* 👤 Perfil de usuario: editar nombre, foto, bio y lista de notas propias.
* 🔎 Explorar notas de la comunidad con filtros y búsqueda.
* 🔒 Registro y login seguro con JWT y contraseña hasheada con bcrypt.
* 🎨 Interfaz intuitiva, responsiva y moderna.
* ✅ Validaciones y autorización para acciones de usuarios.

<h2 id="instalacion">⚙️ Instalación</h2>

🔹 Backend

```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/francocasafus22/blog-diplomatura-DW.git

# 2️⃣ Accede al directorio del Backend
cd blog-diplomatura-DW/backend

# 3️⃣ Instala dependencias
npm install

# 4️⃣ Configura variables de entorno
# Crea un archivo .env con:
# PORT=3000
# FRONTEND_URL="http://localhost:5173"
# JWT_SECRET="tu_firma_secreta"
# MONGO_URI="cadena_de_conexión de MongoDB Atlas"
# CLOUDINARY_NAME="tu_nombre_cloudinary"
# CLOUDINARY_API_KEY="tu_api_key"
# CLOUDINARY_API_SECRET="tu_api_secret"

# 5️⃣ Ejecuta en modo desarrollo
npm run dev
```

🔹 Frontend

```bash
# 1️⃣ Accede al directorio del Frontend
cd blog-diplomatura-DW/frontend

# 2️⃣ Instala dependencias
npm install

# 3️⃣ Configura variables de entorno
# Crea un archivo .env con:
VITE_API_URL=http://localhost:3000

# 4️⃣ Ejecuta en modo desarrollo
npm run dev
```

<h2 id="tecnologias">🛠 Tecnologías</h2>

### 🔹 Backend

* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white) **Node.js**
* ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white) **Express.js**
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white) **MongoDB Atlas**
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-0000FF?style=for-the-badge\&logo=cloudinary\&logoColor=white) **Cloudinary**
* ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=JSONWebTokens\&logoColor=white) **JSON Web Tokens**
* ![Bcrypt](https://img.shields.io/badge/Bcrypt-FF5722?style=for-the-badge) **Bcrypt**

### 🔹 Frontend

* ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black) **React**
* ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white) **Vite**
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwind-css\&logoColor=white) **Tailwind CSS**
* ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white) **Axios**
* ![React Markdown](https://img.shields.io/badge/React_Markdown-000000?style=for-the-badge) **React Markdown**

<h2 id="demo">🌐 Demo</h2>

🚀 Puedes probar la aplicación aquí:
👉 [Notitas - Demo en línea](https://notitasblogapp.vercel.app)

<h2 id="contacto">📬 Contacto</h2>

<p align="center">
  <a href="https://github.com/francocasafus22">
    <img src="https://img.shields.io/badge/GitHub-francocasafus22-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/franco-casafus-17ba47230/">
    <img src="https://img.shields.io/badge/LinkedIn-FrancoCasafus-0077B5?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:francocasafus55@gmail.com">
    <img src="https://img.shields.io/badge/Email-francocasafus55@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</p>
