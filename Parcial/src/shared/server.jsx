export async function getData(url) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los datos: ", error);
    }
}

export async function getElement(url, id) {
    const elementUrl = `${url}/${id}`;
    try {
        const response = await fetch(elementUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener elemento: ${response.status}`);
        }

        console.log('Receta obtenida exitosamente');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error al obtener la receta: ", error);
        throw error;
    }
}

export async function deleteData(url, id) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar: ${response.status}`);
        }

        console.log('Juego eliminado exitosamente');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error al eliminar la receta: ", error);
        throw error;
    }
}

export async function putData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error ' + response.statusText);
        }

        const result = await response.json();
        console.log('Receta actualizada:', result);
        return result;
    } catch (error) {
        console.error('Error al actualizar la receta:', error);
    }
}

export async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error ' + response.statusText);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No se pudo agregar la receta: ", error);
    }
}