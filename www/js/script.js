$(document).ready(function () {
    loadTable();
    loadDefaults();
});

async function fetchDepartments() {
    const response = await fetch('http://localhost:8080/InternshipOfferProject/departments');
    return response.json();
}

async function fetchPositions() {
    const response = await fetch('http://localhost:8080/InternshipOfferProject/positions');
    return response.json();
}

async function loadDefaults() {
    const departments = await fetchDepartments();
    const positions = await fetchPositions();

    departments.forEach(department => {
        $('#departmentId').append(`<option value="${department.id}">${department.name}</option>`);
    });

    positions.forEach(position => {
        $('#positionId').append(`<option value="${position.id}">${position.name}</option>`);
    });
}

async function loadTable() {
    const data = await fetchEmployees();

    $('#employeeTable').DataTable({
        data, columns: [{data: 'id'}, {data: 'name'}, {data: 'department_name'}, {data: 'position_name'}, {
            data: 'id', render: function (data) {
                return `<button class="btn btn-primary" onclick="editEmployee(${data})">Edit</button>
                    <button class="btn btn-danger" onclick="removeEmployee(${data})">Delete</button>`;
            },
        },],
    });
}

function showAddForm() {
    $('#employeeForm').show();
    $('#employeeId').val('');
}

async function editEmployee(id) {
    const employee = await getEmployee(id);
    $('#employeeForm').show();
    $('#employeeId').val(employee.id);
    $('#name').val(employee.name);
    $('#departmentId').val(employee.department_id);
    $('#positionId').val(employee.position_id);
}

async function saveEmployee() {
    const id = $('#employeeId').val();
    const data = {
        name: $('#name').val(), department_id: $('#departmentId').val(), position_id: $('#positionId').val(),
    };

    let result
    if (id) {
        result = await updateEmployee(id, data);
    } else {
        result = await addEmployee(data);
    }
    if (result) {
        alert(result);
    } else {
        alert('Employee Saved!');
        location.reload();
    }
}

async function removeEmployee(id) {
    if (confirm('Are you sure?')) {
        await deleteEmployee(id);
        alert('Employee Deleted!');
        location.reload();
    }
}

function cancelForm() {
    $('#employeeForm').hide();
}
  