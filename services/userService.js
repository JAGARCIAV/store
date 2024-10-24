const User = require('../models/User');

class UserService {
    constructor() {
        this.userList = [];
        this.addUser(new User(1, 'Jose Armando Garcia Vallejos', 'JOSE_ARMANDO_GARCIA_V', '1234', 'jose@example.com', 'Calle Falsa 123', '123456789', 30, 'imagen.png', 'admin')); // Usuario admin específico
        this.generateRandomUsers(3); // Generar usuarios aleatorios
    }

    generateRandomUsers(count) {
        for (let i = 1; i <= count; i++) {
            const id = this.userList.length + 1;
            const username = `user${id}`;
            const password = Math.random().toString(36).slice(-8);
            const user = new User(id, `User ${id}`, username, password, `user${id}@example.com`, 'Dirección desconocida', '000000000', 25, 'default.png', 'client');
            this.addUser(user);
        }
    }

    getUsers() {
        return this.userList;
    }

    addUser(user) {
        this.userList.push(user);
    }

    editUser(id, updatedUser) {
        const index = this.userList.findIndex(user => user.id === id);
        if (index !== -1) {
            this.userList[index] = { ...this.userList[index], ...updatedUser };
            return true;
        }
        return false;
    }

    deleteUser(id) {
        const initialLength = this.userList.length;
        this.userList = this.userList.filter(user => user.id !== id);
        return this.userList.length !== initialLength;
    }
}

module.exports = UserService;
