class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    verifyClient(req, res, next) {
        const userId = req.userId; // Suponiendo que tienes middleware que establece el userId en req
        const user = this.userService.getUsers().find(u => u.id === userId);
        if (user && user.role === 'client') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Solo para clientes.' });
        }
    }

    verifyAdmin(req, res, next) {
        const userId = req.userId; // Suponiendo que tienes middleware que establece el userId en req
        const user = this.userService.getUsers().find(u => u.id === userId);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
        }
    }
}

module.exports = UserController;
