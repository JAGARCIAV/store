const express = require('express');
const UserService = require('./services/userService.js');
const UserController = require('./controllers/controller.js'); // Cambia esto

const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
app.use('/image', express.static(path.join(__dirname, 'image')));


const userService = new UserService();
const userController = new UserController(userService);


// Ruta para mostrar el formulario de inicio de sesión
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, 'public', 'loginCliente.html'));
});

// Rutas para usuarios
app.get('/users', (req, res) => {
    res.json(userService.getUsers());
});

app.post('/users', (req, res) => {
    const { name, username, password, email, address, phone, age, image } = req.body;
    const newUser = new User(
        userService.getUsers().length + 1,
        name,
        username,
        password,
        email,
        address,
        phone,
        age,
        image
    );

    userService.addUser(newUser);
    res.status(201).json(newUser);
});

// Actualizar y eliminar usuarios
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;

    if (userService.editUser(id, updatedUser)) {
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (userService.deleteUser(id)) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Acceso para cliente y administrador
app.get('/client', userController.verifyClient, (req, res) => {
    res.json({ message: 'Welcome client!' });
});

app.get('/admin', userController.verifyAdmin, (req, res) => {
    res.json({ message: 'Welcome admin!' });
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = userService.getUsers().find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', role: user.role });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Aquí deberías verificar las credenciales con tu base de datos
    const user = userService.getUsers().find(u => u.username === username && u.password === password);
    
    if (user) {
        if (user.role === 'client') {
            // Envía una respuesta exitosa
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(403).json({ message: 'Solo los clientes pueden acceder' });
        }
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});
