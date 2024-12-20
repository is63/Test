class Usuario {
    constructor(nombre, contrasena, rol) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.rol = rol;
        this.validado = false;
    }

    getInfo() {
        return `Nombre: ${this.nombre},
Contraseña: ${this.contrasena},
Rol: ${this.rol},
Validado: ${this.validado}`;
    }

    getValidado() {
        return this.validado;
    }

    validar() {
        this.validado = true;
    }
    noValidar() {
        this.validado = false;
    }
}