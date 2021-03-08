/**
 * Principales operaciones base de datos
 */

// Conexión base de datos
import { firestoreDB } from '../../constants/Firebase';

/**
 * Consulta un registro y lo actualiza
 * @param {String} collectionName Nombre de la colección
 * @param {Object} filter         Filtro de busqueda
 * @param {Object} data           Nuevos datos
 */
export const findOneAndUpdate = (collectionName, filter, data) => {
    const collection = firestoreDB.collection(collectionName);
    const { key, value, operator = '==' } = filter;
    const query = collection.where(key, operator, value).get();
    return new Promise((resolve) => {
        query.then((snapshot) => {
            if (snapshot.empty) {
                collection.add(data)
                    .then(resolve)
                    .catch(error => {
                        resolve(false);
                    });
            }
            const doc = snapshot.docs[0];
            collection.doc(doc.id).update(data)
                .then(resolve)
                .catch(error => {
                    resolve(false);
                });
        });
    });
};