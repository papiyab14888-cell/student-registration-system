const form = document.getElementById('registrationForm');
const studentData = document.getElementById('studentData');
const tableWrapper = document.getElementById('tableWrapper');
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = -1;

// Load data on start
window.onload = () => {
    renderTable();
    checkScroll();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNo').value;

    // Validation (Task 6)
    if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Name should only contain characters.");
    if (isNaN(id) || isNaN(contact)) return alert("ID and Contact must be numbers.");
    if (contact.length < 10) return alert("Contact must be at least 10 digits.");

    const studentObj = { name, id, email, contact };

    if (editIndex === -1) {
        students.push(studentObj);
    } else {
        students[editIndex] = studentObj;
        editIndex = -1;
        document.getElementById('submitBtn').innerText = "Add Student";
    }

    localStorage.setItem('students', JSON.stringify(students));
    form.reset();
    renderTable();
    checkScroll();
});

function renderTable() {
    studentData.innerHTML = '';
    students.forEach((s, index) => {
        studentData.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.id}</td>
                <td>${s.email}</td>
                <td>${s.contact}</td>
                <td>
                    <button onclick="editStudent(${index})" style="width: auto; padding: 5px 10px; background: #fdcb6e;">Edit</button>
                    <button onclick="deleteStudent(${index})" style="width: auto; padding: 5px 10px; background: #ff7675;">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    checkScroll();
}

function editStudent(index) {
    const s = students[index];
    document.getElementById('studentName').value = s.name;
    document.getElementById('studentID').value = s.id;
    document.getElementById('email').value = s.email;
    document.getElementById('contactNo').value = s.contact;
    
    editIndex = index;
    document.getElementById('submitBtn').innerText = "Update Student";
}

// Dynamic Scrollbar Logic (Task 6)
function checkScroll() {
    if (students.length > 5) {
        tableWrapper.style.overflowY = "scroll";
    } else {
        tableWrapper.style.overflowY = "hidden";
    }
}