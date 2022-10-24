let deleteBtns = document.querySelectorAll('.delete');
let editBtns = document.querySelectorAll('.edit');

let tbody = document.querySelector('tbody');
let numbering = document.querySelectorAll('th[scope="row"]');

let names = document.querySelectorAll('.name');
let surnames = document.querySelectorAll('.surname');




function addEvents() {
    deleteBtns.forEach(btn => {
        btn.onclick= (e) => {
            let row = e.target.parentElement.parentElement;
            tbody.removeChild(row);
            numberRows();
        };
    });


    editBtns.forEach(btn => {
        btn.onclick =  (e) => {
            let row = e.target.parentElement.parentElement;

            // make names input
            let newName;
            let newSurname;
            let name = row.children[1].innerText;
            let surname = row.children[2].innerText;
            row.children[1].innerHTML = `<input type="text" value="${name}">`;
            row.children[2].innerHTML = `<input type="text" value="${surname}">`;

            // cancel btn
            let cancel = document.createElement('button');
            cancel.innerText = 'Ləğv et';
            cancel.classList.add('btn-outline-danger');
            cancel.classList.add('btn');
            e.target.parentElement.appendChild(cancel);

            cancel.onclick =  (ev) => {
                newName = row.children[1].children[0].value;
                newSurname = row.children[2].children[0].value;
                row.children[1].innerText = name;
                row.children[2].innerText = surname;

                e.target.style.display = 'inline-block';
                e.target.parentElement.children[1].style.display = 'inline-block';

                 e.target.parentElement.removeChild(save);
                 e.target.parentElement.removeChild(cancel);

            };

            // save btn
            let save = document.createElement('button');
            save.innerText = 'Saxla';
            save.classList.add('btn-outline-success');
            save.classList.add('btn');
            save.classList.add('ms-1');
            e.target.parentElement.appendChild(save);
            save.onclick = (ev) => {
                newName = row.children[1].children[0].value;
                newSurname = row.children[2].children[0].value;
                let isValid = true;
                if (!checkInput(newSurname)) {
                    row.children[2].children[0].style.border = '1px solid red';
                    isValid = false;
                }
                if (!checkInput(newName)) {
                    row.children[1].children[0].style.border = '1px solid red';
                    isValid = false;
                }

                if (!isValid)
                    return;


                row.children[1].innerText = newName;
                row.children[2].innerText = newSurname;

                e.target.parentElement.removeChild(save);
                e.target.parentElement.removeChild(cancel);
                e.target.parentElement.children[1].style.display = 'inline-block';
                e.target.style.display = 'inline-block';



            };

            // remove delete and edit btn
            e.target.parentElement.children[1].style.display = 'none';
            e.target.style.display = 'none';



        };
    });
}

addEvents();
numberRows();


function numberRows() {
    for (let i = 0; i < numbering.length; i++) {
        numbering[i].innerText = i + 1;

    }
}
function checkInput(input) {
    if (input.trim().length > 0)
        return true;
    return false;
}

// taking inputs and adding to the table

let nameInput = document.querySelector('.nameInput');
let surnameInput = document.querySelector('.surnameInput');
let addBtn = document.querySelector('#add');

addBtn.addEventListener('click', () => {
    let isValid = true;
    if (!checkInput(nameInput.value)) {
        nameInput.style.border = '1px solid red';
        isValid = false;
    }
    if (!checkInput(surnameInput.value)) {
        surnameInput.style.border = '1px solid red';
        isValid = false;

    }
    if (!isValid)
        return;
        nameInput.style.border = '1px solid black';
        surnameInput.style.border = '1px solid black';

    

    let row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">1</th>
        <td class="name">${nameInput.value}</td>
        <td class="surname">${surnameInput.value}</td>
        <td>
            <button class="btn btn-outline-dark edit">Redakte et</button>
            <button class="btn btn-outline-danger delete ">Sil</button>
        </td>
        `;

    tbody.appendChild(row);


    nameInput.value = "";
    surnameInput.value = "";


    deleteBtns = document.querySelectorAll('.delete');
    editBtns = document.querySelectorAll('.edit');
    numbering = document.querySelectorAll('th[scope="row"]');
    names = document.querySelectorAll('.name');
    surnames = document.querySelectorAll('.surname');


    addEvents();

    numberRows();



});