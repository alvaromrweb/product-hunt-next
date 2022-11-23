export default function validarLogin (valores) {
    let errores = {}

    if(!valores.email) {
        errores.email = "El email es obligatorio"
    }
    
    if(!valores.password) {
        errores.password = "La contraseña es obligatoria"
    }
    return errores
}