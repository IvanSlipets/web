const BASE_URL = 'http://localhost:3000/api/parks';

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorDetails = `HTTP error! status: ${response.status}`;
        try {
            const body = await response.json();
            errorDetails = body.message || errorDetails;
        } catch (e) {
        }
        throw new Error(errorDetails);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
};

// GET ALL
export const getAllParks = async () => {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
};

// POST (CREATE)
export const postPark = async (parkData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parkData),
    });
    return handleResponse(response);
};

// PUT (UPDATE)
export const updatePark = async (id, parkData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parkData),
    });
    return handleResponse(response);
};

// DELETE
export const deletePark = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};