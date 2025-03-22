async function fetchEmployees() {
    const response = await fetch(getBaseUrl()+"/employees",{
        headers:{
            'Authorization':getCookie('token')
        }
    });
    return response.json();
}

async function getEmployee(id) {
    const response = await fetch(`${getBaseUrl()}/employees/${id}`,{
        headers:{
            'Authorization':getCookie('token')
        }
    });
    return response.json();
}

async function addEmployee(data) {
    let result = await fetch(getBaseUrl()+"/employees", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json',
        'Authorization':getCookie('token')},
    });
    result = await result.json();
    return result.status !== 200? result.message : null;
}

async function updateEmployee(id, data) {
    let result = await fetch(`${getBaseUrl()}/employees/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json',
        'Authorization':getCookie('token')},
    });

    result = await result.json();
    return result.status !== 200 ? result.message : null;
}

async function deleteEmployee(id) {
    await fetch(`${getBaseUrl()}/employees/${id}`, {
        method: 'DELETE',
        headers: {'Authorization':getCookie('token')}
    });
}
