const API_URL = 'http://localhost:8080/InternshipOfferProject/employees';

async function fetchEmployees() {
    const response = await fetch(API_URL);
    return response.json();
}

async function getEmployee(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

async function addEmployee(data) {
    let result = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    });
    result = await result.json();
    return result.status !== 200? result.message : null;
}

async function updateEmployee(id, data) {
    let result = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    });

    result = await result.json();
    return result.status !== 200 ? result.message : null;
}

async function deleteEmployee(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}
