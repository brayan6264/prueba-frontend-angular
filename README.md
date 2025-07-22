# Frontend - Prueba Técnica (Angular)

Este es el frontend de la prueba técnica desarrollada en Angular. Se conecta con un backend hecho en FastAPI y permite a los usuarios:

- Registrarse
- Iniciar sesión
- Ver productos
- Crear productos
- Comprar productos
- Ver historial de compras

---

## 🧱 Tecnologías

- [Angular 17+](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [ngx-toastr](https://www.npmjs.com/package/ngx-toastr)
- Consumo de API RESTful con `HttpClient`
- Despliegue en [Vercel](https://vercel.com/)

---

## 🚀 Instrucciones para desarrollo

### 1. Clona el repositorio

```bash
git clone https://github.com/brayan6264/prueba-frontend-angular
cd prueba-frontend-angular
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Crea un archivo `.env`


### 4. Genera el archivo de variables de entorno

```bash
node set-env.js
```

Esto creará el archivo `src/environments/environment.generated.ts` con tus variables.

### 5. Ejecuta el servidor de desarrollo

```bash
npm run start
# o
ng serve --open
```

---

## 🌐 Despliegue en Vercel

Este proyecto está listo para ser desplegado en Vercel:

### ✅ Pasos:

1. Conecta tu repositorio de GitHub a Vercel
2. En configuración de **variables de entorno**
3. Agrega un script `prebuild` en `package.json` si no existe:

```json
"scripts": {
  "prebuild": "node set-env.js",
  "set-env": "node set-env.js",
  "start": "ng serve",
  "build": "npm run set-env && ng build",
  ...
}
```

4. Vercel detectará automáticamente el framework Angular (`ng build`) y desplegará tu aplicación.

---

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── services/
│   ├── app.routes.ts
│   └── app.ts
├── assets/
├── environments/
│   └── environment.generated.ts  ← generado automáticamente
├── index.html
└── set-env.js
```

---

## ✅ Estado del despliegue

[![Deploy with Vercel](https://vercel.com/button)](https://prueba-frontend-angular-emza.vercel.app/)

URL de producción:  
👉 [https://prueba-frontend-angular-emza.vercel.app/](https://prueba-frontend-angular-emza.vercel.app/)

---

## 📌 Notas

- Asegúrate de que tu backend permita CORS desde Vercel.
- Si haces cambios al `.env`, vuelve a ejecutar `node set-env.js`.

---

## 📬 Autor

**Brayan Gómez**  
💼 Proyecto desarrollado como parte de la prueba técnica.