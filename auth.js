const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '4life_proyecto',   
    port: 3307
});

// RUTA 1: REGISTRO DE USUARIO
app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Validación: ambos campos son obligatorios
    if (!usuario || !contrasena) {
        return res.status(400).send('Usuario y contraseña son obligatorios');
    }

    const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)';
    conexion.query(sql, [usuario, contrasena], (error, resultado) => {
        if (error) {
            // Error 1062 = usuario duplicado (por la restricción UNIQUE)
            if (error.errno === 1062) {
                return res.status(409).send('Ese usuario ya existe');
            }
            return res.status(500).send('Error al registrar el usuario');
        }
        res.send('Usuario registrado con éxito');
    });
});

// RUTA 2: INICIO DE SESIÓN
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).send('Usuario y contraseña son obligatorios');
    }

    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?';
    conexion.query(sql, [usuario, contrasena], (error, filas) => {
        if (error) return res.status(500).send('Error al validar el inicio de sesión');

        // Si encontramos una fila, las credenciales son correctas
        if (filas.length > 0) {
            const usuarioEncontrado = filas[0];
            res.json({
                mensaje: 'Autenticación satisfactoria',
                id_usuario: usuarioEncontrado.id_usuario,
                rol: usuarioEncontrado.rol
            });
        } else {
            res.status(401).send('Error en la autenticación');
        }
    });
});

// Servidor escuchando
app.listen(3001, () => {
    console.log('Servicio de autenticación corriendo en el puerto 3001');
});