document.getElementById('clientInfo').addEventListener('change', function() {
    const selectedValue = this.value;
    const dynamicFields = document.getElementById('dynamicFields');
    
    // Clear previous fields when changing client info
    dynamicFields.innerHTML = '';
});

// Event listener for the form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const clientInfo = document.getElementById('clientInfo').value;

    // Prepare to display the output
    let outputHTML = `<h3>Submitted Data:</h3>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Title:</strong> ${title}</p>
                      <p><strong>Description:</strong> ${description}</p>
                      <p><strong>Client Info:</strong> ${clientInfo}</p>`;

    // Display client-specific fields
    if (clientInfo === 'Client') {
        outputHTML += `<p><strong>Client Name:</strong> ${document.getElementById('clientName')?.value || ''}</p>
                       <p><strong>Client Email:</strong> ${document.getElementById('clientEmail')?.value || ''}</p>`;
    } else if (clientInfo === 'Business') {
        outputHTML += `<p><strong>Business Name:</strong> ${document.getElementById('businessName')?.value || ''}</p>
                       <p><strong>Business Type:</strong> ${document.getElementById('businessType')?.value || ''}</p>`;
    } else if (clientInfo === 'Other') {
        outputHTML += `<p><strong>Other Information:</strong> ${document.getElementById('otherInfo')?.value || ''}</p>`;
    }

    document.getElementById('output').innerHTML = outputHTML;

    // Clear the form
    document.getElementById('userForm').reset();
    document.getElementById('dynamicFields').innerHTML = ''; // Clear dynamic fields
});

// Function to handle adding predefined basic user fields
function addBasicUserField() {
    // Array of field definitions
    const fields = [
        { label: 'First Name', type: 'Text' },
        { label: 'Last Name', type: 'Text' },
        { label: 'Email', type: 'Email' },
        { label: 'Mobile Number', type: 'Number' },
        { label: 'Address', type: 'Text' },
        { label: 'Zip Code', type: 'Number' }
    ];

    // Get the additional fields container
    const additionalFieldsDiv = document.getElementById('additionalFields');

    // Create and append each field
    fields.forEach(field => {
        const newField = document.createElement('div');
        newField.classList.add('form-group');
        newField.innerHTML = `
            <div class="input-box">
                <div class="row">
                    <div class="field-container">
                        <input type="text" placeholder="${field.label}" value="${field.label}">
                    </div>
                    <div class="field-container">
                        <select class="field-type-select">
                            <option value="${field.type}" selected>${field.type}</option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            
                            <option value="date">Date</option>
                            <option value="checkbox">Checkbox List</option>
                            <option value="radio">Radio Button</option>
                            <option value="dropdown">Dropdown List</option>
                            <option value="yesno">Yes or No Option</option>
                        </select>
                    </div>
                </div>
                <div class="checkbox-row">
                    <div class="required-checkbox">
                        <input type="checkbox" id="isRequired" name="isRequired" checked>
                        <label for="isRequired">Required</label>
                    </div>
                    <div class="record-checkbox">
                        <input type="checkbox" id="record" name="record" checked>
                        <label for="record">Record</label>
                    </div>
                    <div class="action-checkbox">
                        <input type="checkbox" id="actionRequired" name="actionRequired" checked>
                        <label for="actionRequired">Action</label>
                    </div>
                </div>
                <span class="delete-field">×</span>
            </div>
        `;
        additionalFieldsDiv.appendChild(newField);
    });

    // Disable the Add Basic User Field button
    const addButton = document.getElementById('addBasicUserField');
    addButton.disabled = true;
}
// Function to handle adding a new label field
function addField() {
    const newField = document.createElement('div');
    newField.classList.add('form-group');
    newField.draggable = true; // Make the field draggable
    newField.innerHTML = `
        <div class="input-box">
            <div class="row">
                <div class="field-container">
                    <input type="text" placeholder="Label" value="Label">
                </div>
                <div class="field-container">
                    <select class="field-type-select">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="date">Date</option>
                        <option value="checkbox">Checkbox List</option>
                        <option value="radio">Radio Button</option>
                        <option value="dropdown">Dropdown List</option>
                        <option value="yesno">Yes or No</option>
                    </select>
                </div>
            </div>
            <div class="checkbox-row">
                <div class="required-checkbox">
                    <input type="checkbox" id="isRequired" name="isRequired" checked>
                    <label for="isRequired">Required</label>
                </div>
                <div class="record-checkbox">
                    <input type="checkbox" id="record" name="record" checked>
                    <label for="record">Record</label>
                </div>
                <div class="action-checkbox">
                    <input type="checkbox" id="actionRequired" name="actionRequired" checked>
                    <label for="actionRequired">Action</label>
                </div>
            </div>
            <span class="delete-field">×</span>
        </div>
    `;

    const additionalFieldsDiv = document.getElementById('additionalFields');
    const zipCodeField = additionalFieldsDiv.querySelector('div.form-group:last-of-type');
    if (zipCodeField) {
        zipCodeField.insertAdjacentElement('afterend', newField);
    } else {
        additionalFieldsDiv.appendChild(newField);
    }

    // Add drag events
    newField.addEventListener('dragstart', handleDragStart);
    newField.addEventListener('dragover', handleDragOver);
    newField.addEventListener('drop', handleDrop);
    newField.addEventListener('dragleave', handleDragLeave);
}

// Function to handle adding a new field to the "Other Fields" form
function addFieldToOtherForm() {
    const newField = document.createElement('div');
    newField.classList.add('form-group');
    newField.classList.add('input-box');
    newField.draggable = true; // Make the field draggable

    const row = document.createElement('div');
    row.classList.add('row');

    const labelField = document.createElement('div');
    labelField.classList.add('field-container');

    const label = document.createElement('label');
    label.textContent = "Label Field:";
    labelField.appendChild(label);

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = 'Label';
    labelInput.classList.add('label-input');
    labelField.appendChild(labelInput);

    const fieldTypeDropdown = document.createElement('div');
    fieldTypeDropdown.classList.add('field-container');

    const dropdown = document.createElement('select');
    dropdown.classList.add('field-type-dropdown');

    const options = [
        { value: 'text', text: 'Text' },
        { value: 'number', text: 'Number' },
        { value: 'email', text: 'Email' },
        { value: 'password', text: 'Password' },
        { value: 'date', text: 'Date' },
        { value: 'checkbox', text: 'Checkbox List' },
        { value: 'radio', text: 'Radio Button List' },
        { value: 'dropdown', text: 'Dropdown List' },
        { value: 'yesno', text: 'Yes or No' }
    ];

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        dropdown.appendChild(opt);
    });

    fieldTypeDropdown.appendChild(dropdown);

    row.appendChild(labelField);
    row.appendChild(fieldTypeDropdown);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');

    const checkboxNames = ['Required', 'Record', 'Action'];
    checkboxNames.forEach(name => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.id = name.toLowerCase();
        checkbox.name = name.toLowerCase();

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', name.toLowerCase());
        checkboxLabel.textContent = name;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
    });

    newField.appendChild(row);
    newField.appendChild(checkboxContainer);

    const textareaContainer = document.createElement('div');
    textareaContainer.classList.add('textarea-container');

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter options (separated by commas)';
    textarea.classList.add('options-textarea');
    textareaContainer.appendChild(textarea);

    newField.appendChild(textareaContainer);

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-field');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function () {
        newField.remove();
    });

    newField.appendChild(deleteBtn);

    document.getElementById('additionalFieldsOther').appendChild(newField);

    // Create a container for the "Date Wise, Month Wise, Year Wise" dropdown (initially hidden)
    const dateWiseDropdownContainer = document.createElement('div');
    dateWiseDropdownContainer.style.display = 'none'; // Initially hidden

    const dateWiseDropdown = document.createElement('select');
    dateWiseDropdown.classList.add('date-wise-dropdown');

    const dateWiseOptions = [
        { value: 'datewise', text: 'Date Wise' },
        { value: 'monthwise', text: 'Month Wise' },
        { value: 'yearwise', text: 'Year Wise' }
    ];

    dateWiseOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        dateWiseDropdown.appendChild(opt);
    });

    dateWiseDropdownContainer.appendChild(dateWiseDropdown);
    newField.appendChild(dateWiseDropdownContainer);

    dropdown.addEventListener('change', function () {
        const selectedValue = dropdown.value;

        if (selectedValue === 'checkbox' || selectedValue === 'radio' || selectedValue === 'dropdown') {
            textareaContainer.style.display = 'block'; // Show textarea for options
            dateWiseDropdownContainer.style.display = 'none'; // Hide date-wise dropdown if visible
        } else if (selectedValue === 'date') {
            // Show the "Date Wise" dropdown when the 'date' option is selected
            dateWiseDropdownContainer.style.display = 'block';
            textareaContainer.style.display = 'none'; // Hide the textarea
        } else {
            textareaContainer.style.display = 'none'; // Hide textarea for other options
            dateWiseDropdownContainer.style.display = 'none'; // Hide date-wise dropdown for other options
        }
    });

    // Add drag events
    newField.addEventListener('dragstart', handleDragStart);
    newField.addEventListener('dragover', handleDragOver);
    newField.addEventListener('drop', handleDrop);
    newField.addEventListener('dragleave', handleDragLeave);
}

// Function to handle drag start
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    event.target.classList.add('dragging');
}

// Function to handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.target.classList.add('drag-over');
}

// Function to handle drop
function handleDrop(event) {
    event.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement && event.target.classList.contains('form-group')) {
        const dropTarget = event.target.closest('.form-group');
        dropTarget.parentNode.insertBefore(draggingElement, dropTarget.nextSibling);
        draggingElement.classList.remove('dragging');
    }
    event.target.classList.remove('drag-over');
}

// Function to handle drag leave
function handleDragLeave(event) {
    event.target.classList.remove('drag-over');
}

// Function to handle the deletion of a field
function deleteField(event) {
    if (event.target.classList.contains('delete-field')) {
        event.target.parentElement.remove();
    }
}


// Function to handle adding conditional fields
function addConditionalField() {

    // Get all label inputs, textarea options, and dropdowns
    const labelInputs = document.querySelectorAll('.label-input');
    const textareaInputs = document.querySelectorAll('.options-textarea');
    const dropdowns = document.querySelectorAll('.field-type-dropdown');

    // Create an object to store options
    const labelOptionsMap = {};

    labelInputs.forEach((labelInput, index) => {
        const labelValue = labelInput.value.trim();
        if (labelValue) {
            const textareaValue = textareaInputs[index].value.trim();
            const options = textareaValue.split(',').map(opt => opt.trim()).filter(opt => opt !== '');
            labelOptionsMap[labelValue] = options;
        }
    });

    // Check if at least one conditional field (dropdown, checkbox, radio button) is selected
    let hasConditionalField = false;
    dropdowns.forEach(dropdown => {
        const selectedValue = dropdown.value;
        if (selectedValue === 'dropdown' || selectedValue === 'checkbox' || selectedValue === 'radio') {
            hasConditionalField = true;
        }
    });

    // If no conditional field is selected, show an alert and stop execution
    if (!hasConditionalField) {
        alert("Please enter at least one conditional field (dropdown, checkbox, radio button list).");
        return;  // Stop the function execution if no conditional field is added
    }

    // Show confirmation alert after validation passes
    const userConfirmed = confirm("Are you sure? Once you add a condition, you can't edit or remove the added fields.");

    // If user clicks "Cancel", return and do nothing
    if (!userConfirmed) {
        return;
    }

    const duplicatesContainer = document.createElement('div');
    duplicatesContainer.classList.add('duplicates-container');

    const dropdownRow = document.createElement('div');
    dropdownRow.classList.add('dropdown-row');

    // Create label dropdown
    const labelDropdown = document.createElement('select');
    labelDropdown.classList.add('label-dropdown');
    const selectFieldOption = document.createElement('option');
    selectFieldOption.textContent = 'Select Field';
    selectFieldOption.value = '';
    selectFieldOption.disabled = true;
    selectFieldOption.selected = true;
    labelDropdown.appendChild(selectFieldOption);

    // Populate label dropdown options
    labelInputs.forEach((labelInput, index) => {
        const labelValue = labelInput.value.trim();
        if (labelValue) {
            const opt = document.createElement('option');
            opt.textContent = labelValue;
            opt.value = labelValue;
            labelDropdown.appendChild(opt);
        }
    });

    // Create second dropdown
    const secondDropdown = document.createElement('select');
    secondDropdown.classList.add('second-dropdown');
    secondDropdown.style.display = 'none';  // Initially hidden
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select Option';
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    secondDropdown.appendChild(defaultOption);

    // Variable to track if fields have been added
    let fieldsAdded = false;

    // Event listener for label dropdown
    labelDropdown.addEventListener('change', function () {
        const selectedLabel = labelDropdown.value;

        // Clear the second dropdown
        secondDropdown.innerHTML = '';
        secondDropdown.appendChild(defaultOption);

        if (selectedLabel === 'Yes or No') {
            // Show Yes and No options when 'Yes or No' is selected
            secondDropdown.style.display = 'block';
            const yesOption = document.createElement('option');
            yesOption.textContent = 'Yes';
            yesOption.value = 'Yes';
            secondDropdown.appendChild(yesOption);

            const noOption = document.createElement('option');
            noOption.textContent = 'No';
            noOption.value = 'No';
            secondDropdown.appendChild(noOption);
        } else if (labelOptionsMap[selectedLabel]) {
            // Show options for the selected label
            secondDropdown.style.display = 'block';
            labelOptionsMap[selectedLabel].forEach(option => {
                const opt = document.createElement('option');
                opt.textContent = option;
                opt.value = option;
                secondDropdown.appendChild(opt);
            });
        } else {
            secondDropdown.style.display = 'none';  // Hide if no relevant options
        }
    });

    // Event listener for second dropdown
    secondDropdown.addEventListener('change', function () {
        const selectedOption = secondDropdown.value;

        // Only display the label and type if they haven't been added yet
        if (selectedOption && !fieldsAdded) {
            fieldsAdded = true;  // Mark that fields have been added

            const dynamicFieldsContainer = document.createElement('div');
            dynamicFieldsContainer.classList.add('dynamic-fields');

            const dynamicLabelInput = document.createElement('input');
            dynamicLabelInput.type = 'text';
            dynamicLabelInput.placeholder = 'Enter Label';
            dynamicLabelInput.classList.add('dynamic-label-input');
            dynamicFieldsContainer.appendChild(dynamicLabelInput);

            const typeDropdown = document.createElement('select');
            typeDropdown.classList.add('type-dropdown');
            const types = [
                { value: 'text', text: 'Text' },
                { value: 'number', text: 'Number' },
                { value: 'email', text: 'Email' },
                { value: 'password', text: 'Password' },
                { value: 'date', text: 'Date' },
                { value: 'dropdown', text: 'Dropdown List' },
                { value: 'radio', text: 'Radio Button List' },
                { value: 'checkbox', text: 'Checkbox List' },
                { value: 'yesno', text: 'Yes or No' }
            ];

            types.forEach(type => {
                const opt = document.createElement('option');
                opt.value = type.value;
                opt.textContent = type.text;
                typeDropdown.appendChild(opt);
            });
            dynamicFieldsContainer.appendChild(typeDropdown);

            const newRow = document.createElement('div');
            newRow.classList.add('dynamic-field-row');
            newRow.appendChild(dynamicLabelInput);
            newRow.appendChild(typeDropdown);

            duplicatesContainer.appendChild(newRow);
            document.getElementById('additionalFieldsOther').appendChild(dynamicFieldsContainer);

            // Event listener for type dropdown to show textarea or "Date Wise" dropdown for specific types
            typeDropdown.addEventListener('change', function () {
                const selectedType = typeDropdown.value;

                // Show textarea if "Dropdown List", "Radio Button List", or "Checkbox List" is selected
                if (selectedType === 'dropdown' || selectedType === 'radio' || selectedType === 'checkbox') {
                    if (!dynamicFieldsContainer.querySelector('textarea')) {
                        const textarea = document.createElement('textarea');
                        textarea.placeholder = 'Enter options separated by commas';
                        textarea.classList.add('options-textarea');
                        dynamicFieldsContainer.appendChild(textarea);
                    }
                } else if (selectedType === 'date') {
                    if (!dynamicFieldsContainer.querySelector('.date-wise-dropdown')) {
                        const dateWiseDropdown = document.createElement('select');
                        dateWiseDropdown.classList.add('date-wise-dropdown');

                        const dateWiseOption = document.createElement('option');
                        dateWiseOption.value = 'datewise';
                        dateWiseOption.textContent = 'Date Wise';

                        const monthWiseOption = document.createElement('option');
                        monthWiseOption.value = 'monthwise';
                        monthWiseOption.textContent = 'Month Wise';

                        const yearWiseOption = document.createElement('option');
                        yearWiseOption.value = 'yearwise';
                        yearWiseOption.textContent = 'Year Wise';

                        dateWiseDropdown.appendChild(dateWiseOption);
                        dateWiseDropdown.appendChild(monthWiseOption);
                        dateWiseDropdown.appendChild(yearWiseOption);

                        dynamicFieldsContainer.appendChild(dateWiseDropdown);
                    }
                } else {
                    // Remove textarea and "Date Wise" dropdown if other options are selected
                    const existingTextarea = dynamicFieldsContainer.querySelector('textarea');
                    if (existingTextarea) {
                        dynamicFieldsContainer.removeChild(existingTextarea);
                    }

                    const existingDateWiseDropdown = dynamicFieldsContainer.querySelector('.date-wise-dropdown');
                    if (existingDateWiseDropdown) {
                        dynamicFieldsContainer.removeChild(existingDateWiseDropdown);
                    }
                }
            });
        }
    });

    dropdownRow.appendChild(labelDropdown);
    dropdownRow.appendChild(secondDropdown);
    duplicatesContainer.appendChild(dropdownRow);
    document.getElementById('additionalFieldsOther').appendChild(duplicatesContainer);
}
 
// Function to disable other buttons but keep "+Add Conditional Fields" enabled
function disableOtherButtons(disabled) {
    document.getElementById('addBasicUserField').disabled = disabled;
    document.getElementById('addFields').disabled = disabled;
    document.getElementById('addFieldsOther').disabled = disabled;
    // "+Add Conditional Fields" button itself is not disabled
}

// Event listeners for the buttons
document.getElementById('addBasicUserField').addEventListener('click', addBasicUserField);
document.getElementById('addFields').addEventListener('click', addField);
document.getElementById('addFieldsOther').addEventListener('click', addFieldToOtherForm);
document.getElementById('addConditionalField').addEventListener('click', function() {
    addConditionalField();
});

// Event listener for field deletions
document.getElementById('additionalFields').addEventListener('click', deleteField);
document.getElementById('additionalFieldsOther').addEventListener('click', deleteField);

// Event listener for the Create button
document.getElementById('createButton').addEventListener('click', function() {
    alert('Create button clicked! You can implement your creation logic here.');
});










        