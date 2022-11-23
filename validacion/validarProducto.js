export default function validarProducto (valores) {
    let errores = {}

    if(!valores.nombre) {
        errores.nombre = "El nombre es obligatorio"
    }

    if(!valores.empresa) {
        errores.empresa = "La empresa es obligatoria"
    }

    // if(!valores.imagen) {
    //     errores.imagen = "La imagen es obligatoria"
    // }
    
    if(!valores.url) {
        errores.url = "La url es obligatoria"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "La url no es válida"
    }

    if(!valores.descripcion) {
        errores.descripcion = "La descripción es obligatoria"
    }

    
    
    return errores
}