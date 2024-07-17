export const toggleButtonOnChange = (addToShowlistBtn, addToHidelistBtn) => {
    select.addEventListener('change', (e) => {
        const status = e.target.value;
        if (status === 'show') {
            addToShowlistBtn.style.display = 'none';
            addToHidelistBtn.style.display = 'block';
        } else if (status === 'hide') {
            addToHidelistBtn.style.display = 'none';
            addToShowlistBtn.style.display = 'block';
        }
    });
};

export const masterCheckboxToggle = (checkBoxCollection, masterIsChecked) => {
    Array.from(checkBoxCollection).forEach(checkbox => {
        checkbox.checked = masterIsChecked;
    });
};

export const UpdateMasterCheckBoxStatus = (checkBoxCollection, masterCheckBox) => {
    const allChecked = Array.from(checkBoxCollection).every(checkbox => checkbox.checked);
    const noneChecked = Array.from(checkBoxCollection).every(checkbox => !checkbox.checked);
    if (allChecked) {
        masterCheckBox.checked = true;
        // masterCheckBox.indeterminate = false;
    } else if (noneChecked) {
        masterCheckBox.checked = false;
    } else {
        masterCheckBox.checked = false;
    }
};
