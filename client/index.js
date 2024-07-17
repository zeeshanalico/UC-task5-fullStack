import { renderList } from './utils/listUtils.js';
import { toggleButtonOnChange, masterCheckboxToggle, UpdateMasterCheckBoxStatus } from './utils/toggle.js';
import { getItems, createItem, changeStatusOfItem, deleteItem, updateItem } from './api/api.js';


const createOuterButton = document.getElementById('create');
const heading = document.getElementById('exampleModalLabel');
const inputs = document.getElementsByClassName('createInput');
const submitButton = document.getElementById('submitButton');
const addToShowlistBtn = document.getElementById('add-to-showlist');
const addToHidelistBtn = document.getElementById('add-to-hidelist');
const masterCheckBox = document.querySelector("#master-check-box");
const checkBoxCollection = document.getElementsByClassName('check-box');
const form = document.getElementById('form');
const select = document.getElementById('select');
const modal = new bootstrap.Modal(document.getElementById('createModal'));

addToHidelistBtn.style.display = 'block';
addToShowlistBtn.style.display = 'none';

toggleButtonOnChange(addToShowlistBtn, addToHidelistBtn);

export let itemList = [];

export const fetchItems = async () => {
    itemList = await getItems() || [];
    renderList();
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newRowData = {
        title: inputs[0].value,
        duration: inputs[1].value,
        link: inputs[2].value
    };

    if (submitButton.value === 'Create') {
        newRowData.status = select.value;
        await createItem(newRowData.title, newRowData.duration, newRowData.link, newRowData.status);//for future change in adding hidelist
    } else if (submitButton.value === 'Update') {
        const id = form.dataset.editId;
        await updateItem(id, newRowData.title, newRowData.duration, newRowData.link);
    }
    fetchItems();
    form.reset();
    modal.hide();
});

addToHidelistBtn.addEventListener('click', async () => {
    await updateLists('show-to-hide');
    masterCheckBox.checked = false;
});

addToShowlistBtn.addEventListener('click', async () => {
    await updateLists('hide-to-show');
    masterCheckBox.checked = false;
});

select.addEventListener('change', renderList);




createOuterButton.addEventListener('click', () => {
    submitButton.value = 'Create';
    heading.innerHTML = 'Create the Row';
    form.reset();
});

masterCheckBox.onchange = (e) => {
    let masterIsChecked = e.target.checked;
    masterCheckboxToggle(checkBoxCollection, masterIsChecked);
};

for (let checkbox of checkBoxCollection) {
    checkbox.addEventListener('change', () => {
        UpdateMasterCheckBoxStatus(checkBoxCollection, masterCheckBox);
    });
}

async function updateLists(action) {
    const selectedRows = Array.from(checkBoxCollection).filter(checkbox => checkbox.checked).map(checkbox => checkbox.parentElement.parentElement);
    for (const row of selectedRows) {
        const id = row.id;
        await changeStatusOfItem(id, action);
    }
    fetchItems();
}

fetchItems();
