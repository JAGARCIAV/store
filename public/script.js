document.getElementById('adminButton').onclick = function() {
    document.getElementById('adminModal').style.display = 'block';
};

document.getElementById('closeModal').onclick = function() {
    document.getElementById('adminModal').style.display = 'none';
};

document.getElementById('clientLoginButton').onclick = function() {
    document.getElementById('adminModal').style.display = 'none';
    // Aquí puedes redirigir al login del cliente, por ejemplo:
    window.location.href = 'http://localhost:3000'; // Ajusta esta URL según tu aplicación
};

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == document.getElementById('adminModal')) {
        document.getElementById('adminModal').style.display = 'none';
    }
};

document.getElementById('loginButton').onclick = function() {
    document.getElementById('loginModal').style.display = 'block';
};

document.getElementById('closeModal').onclick = function() {
    document.getElementById('loginModal').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
};

/*login Cliente*/
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Redirige al usuario a la página correspondiente si las credenciales son correctas
                window.location.href = '/public/secionCliente.html';
            } else {
                // Muestra un mensaje de error si las credenciales no son válidas
                alert(data.message || 'Error en las credenciales');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            alert('Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.');
        }
    });
});


/*secionCliente */

