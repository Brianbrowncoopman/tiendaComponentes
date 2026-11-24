const { onDocumentDeleted, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const logger = require("firebase-functions/logger");

initializeApp();

/**
 * Función auxiliar para extraer la ruta del archivo desde una URL de Firebase Storage
 * y eliminarlo del bucket.
 */
async function borrarArchivoDeStorage(imageUrl) {
  if (!imageUrl || !imageUrl.includes("firebasestorage.googleapis.com")) {
    return;
  }

  try {
    const decodedUrl = decodeURIComponent(imageUrl);
    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?");

    if (startIndex < 3 || endIndex === -1) {
      logger.warn("No se pudo extraer la ruta de la URL:", imageUrl);
      return;
    }

    const filePath = decodedUrl.substring(startIndex, endIndex);
    const bucket = getStorage().bucket();
    const file = bucket.file(filePath);

    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      logger.info(`Archivo eliminado de Storage correctamente: ${filePath}`);
    } else {
      logger.info(`El archivo ya no existía en Storage: ${filePath}`);
    }
  } catch (error) {
    logger.error("Error al eliminar archivo en Storage:", error);
  }
}

// 1. Trigger al ELIMINAR un producto
exports.limpiarImagenAlEliminarProducto = onDocumentDeleted("productos/{productId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const productoEliminado = snapshot.data();
  await borrarArchivoDeStorage(productoEliminado.imagenUrl);
});

// 2. Trigger al ACTUALIZAR un producto (si cambió su imagen)
exports.limpiarImagenAlActualizarProducto = onDocumentUpdated("productos/{productId}", async (event) => {
  const change = event.data;
  if (!change) return;

  const datosAnteriores = change.before.data();
  const datosNuevos = change.after.data();

  // Solo eliminamos la imagen anterior si efectivamente cambió por otra distinta
  if (datosAnteriores.imagenUrl && datosAnteriores.imagenUrl !== datosNuevos.imagenUrl) {
    logger.info(`Detectado cambio de imagen en producto ${event.params.productId}. Limpiando imagen anterior...`);
    await borrarArchivoDeStorage(datosAnteriores.imagenUrl);
  }
});