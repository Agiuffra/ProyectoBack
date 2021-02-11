const { Storage } = require('@google-cloud/storage');
// Inicializo mi objeto de Firebase para poder conectarme con mi Bucket
const credenciales = {
    projectId: 'codigo-backend-alessandro',
    keyFilename: './src/credenciales_firebase.json'
};

const storage = new Storage(credenciales);
// Se crea variable bucket
const bucket = storage.bucket('codigo-backend-alessandro.appspot.com');

const subirArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
        if (!archivo) {
            reject('No se encontró el archivo');
        }
        // Modificamos el nombre original para prevenir que el usuario pueda sobrescribir un archivo con el mismo nombre
        const nuevoNombre = `${archivo.originalname}_${Date.now()}`;
        // Aquí comenzamos a cargar el archivo con el nuevo nombre, pero aun no se sube a firebase
        const fileUpload = bucket.file(nuevoNombre);
        // Aquí agregamos configuración adicional de nuestro archivo a subir como su metadata   
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: archivo.mimetype
            }
        });
        // Si hay un error al momento de subir, ingresamos su estado "error"
        blobStream.on('error', (error) => {
            reject(`Hubo un error al subir el archivo: ${error}`)
        });
        // Si el archivo terminó de subirse satisfactoriamente, su estado es "finish"
        blobStream.on('finish', () => {
            fileUpload.getSignedUrl({
                action: 'read',
                expires: '12-12-2021'
            })
            .then(link=>resolve(link))
            .catch(error=>reject(`Error al devolver el link: ${error}`));
        });
        // Acá es donde se sube el archivo
        blobStream.end(archivo.buffer);
    });
}

const eliminarArchivoFirebase = async (nombre) => {
    let imagen = nombre.substring(
        nombre.lastIndexOf("/")+1,
        nombre.lastIndexOf("?")
    );
    try {
        let rpta = await bucket.file(imagen).delete();
        console.log(rpta);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    subirArchivo,
    eliminarArchivoFirebase,
}

