const API_BASE_URL = 'http://localhost:3000/items'

export const getItems = async (status) => {
    let url = API_BASE_URL;
    if (status) {
        url += `?status=${status}`;
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching Items:', error);

    }
}

export const createItem = async (title, duration, link) => {//further we have to modify only 4rth param as status to add in hide
    if (!title || !duration || !link) {
        return;
    } try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, duration, link })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating Item:', error);
    }
}

export const getItem = async (id) => {
    if (!id) return
    try {

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching Item:', error);
    }
}

export const updateItem = async (id, title, duration, link) => {
    if (!title || !duration || !link) {
        return;
    } try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, duration, link })
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating Item:', error);

    }
}

export const deleteItem = async (id) => {
    if(!id) return;
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting Item:', error);

    }
}

export const changeStatusOfItem = async (id, status) => {
    if (!id) return
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
        return await response.json();
    } catch (error) {
        console.error('Error changing status of Item:', error);

    }
}
