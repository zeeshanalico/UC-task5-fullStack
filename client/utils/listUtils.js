import { Duration } from "./durationUtil.js";
import { itemList } from "../index.js";
import { deleteItem } from "../api/api.js";
import { fetchItems } from "../index.js";
import { UpdateMasterCheckBoxStatus, } from "./toggle.js";
const tbody = document.getElementsByTagName('tbody')[0]; // Retrieve the tbody element
const checkBoxCollection = document.getElementsByClassName('check-box');
const inputs = document.getElementsByClassName('createInput');
const submitButton = document.getElementById('submitButton');
const heading = document.getElementById('exampleModalLabel');
const masterCheckBox = document.querySelector("#master-check-box");

export const createRow = ({ id, title, duration, link, status }) => {
    const row = document.createElement('tr');
    row.id = id;
    row.innerHTML = `
        <td><input class="form-check-input check-box" type="checkbox" id="${id}-checkbox"></td>
        <td>${title}</td>
        <td>${Duration(duration)}</td>
        <td><a href="${link}" target="_blank">${link}</a></td>
       <td><i id=${title + '-edit'} data-bs-toggle="modal" data-bs-target="#createModal" class="bi bi-pencil-square" style="color:blue"></i></td>
        <td><i id=${id}-delete class="bi bi-trash" style="color:red"></i></td>
    `;
    tbody.appendChild(row);
};

export const renderList = () => {
    const selectedOption = select.value;
    tbody.innerHTML = '';
    const listToRender = itemList.filter(item => item.status === selectedOption);
    listToRender.forEach(createRow);
    EditDeleteFunc();
    Array.from(checkBoxCollection).forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            UpdateMasterCheckBoxStatus(checkBoxCollection, masterCheckBox);
        });
    });
}

export const EditDeleteFunc = () => {
    Array.from(tbody.children).forEach(tr => {
        const iEdit = document.getElementById(`${tr.id}`);//uuid
        const iDelete = document.getElementById(`${tr.id}-delete`);//uuid+delete
        if (iEdit) {
            iEdit.addEventListener('click', () => {
                updateModalValues();
                form.dataset.editId = tr.id;
                const row = itemList.find(item => item.id === tr.id);
                if (row) {
                    inputs[0].value = row.title;
                    inputs[1].value = row.duration;
                    inputs[2].value = row.link;
                }
            });
        }

        if (iDelete) {
            iDelete.addEventListener('click', async () => {
                await deleteItem(tr.id);
                fetchItems();
            });
        }
    });
};

export const updateModalValues = () => {
    submitButton.value = 'Update';
    heading.innerHTML = 'Update the values';
};
