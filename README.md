# 4Life Usuarios - Servicio de Autenticación

Evidencia: **GA7-220501096-AA5-EV01**
Diseño y desarrollo de servicios web - caso.

## Descripción

Este proyecto es un servicio web (API) que permite el registro y el
inicio de sesión de usuarios, según el caso solicitado en la guía de
aprendizaje. No incluye interfaz visual, ya que la evidencia pide
únicamente el diseño y la codificación del servicio web.

La prueba funcional de estos servicios (con interfaz tipo Postman) se
documenta en la evidencia AA5-EV02.

## Tecnologías

- Node.js
- Express
- MySQL (mysql2)


### POST `/registro`
Recibe un usuario y una contraseña y los guarda en la base de datos.

**Cuerpo de la petición (JSON):**
```json
{
  "usuario": "ejemplo",
  "contrasena": "12345"
}
```

**Respuestas posibles:**
- `200` → "Usuario registrado con éxito"
- `400` → "Usuario y contraseña son obligatorios"
- `409` → "Ese usuario ya existe"

### POST `/login`
Recibe un usuario y una contraseña y valida si la autenticación es correcta.

**Cuerpo de la petición (JSON):**
```json
{
  "usuario": "ejemplo",
  "contrasena": "12345"
}
```

**Respuestas posibles:**
- `200` → "Autenticación satisfactoria"
- `401` → "Error en la autenticación"
- `400` → "Usuario y contraseña son obligatorios"

## Cómo ejecutar el proyecto

```bash o terminal de VS code
npm install
node server.js
```

El servicio queda disponible en: `http://localhost:3001`

## Base de datos

Este proyecto utiliza la misma base de datos del proyecto principal
