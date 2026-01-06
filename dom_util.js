export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const REMOVE_BUTTON_PREFIX = 'remove-button-';

const titleInput = document.getElementById("title_input");
const addressInput = document.getElementById("address_input");
const bikePathLengthInput = document.getElementById("bike_path_length_input");
const ticketPriceInput = document.getElementById("ticket_price_input");
const descriptionInput = document.getElementById("description_input");

const itemsContainer = document.getElementById("card_container");

const parkTemplate = ({ _id, title, address, bike_path_length, ticket_price, description }) => `
<li id="${_id}" class="park-card">
    <div class="image-placeholder">Image Placeholder</div>
    <div class="card-body">
        <h4>${title}</h4>
        <p><strong>Addres:</strong> ${address}</p>
        <p><strong>Bike path length:</strong> ${bike_path_length} км</p>
        <p><strong>Ticket price:</strong> ${ticket_price} uan</p>
        <p>${description}</p>
    </div>
    <div class="card-footer">
        <button id="${EDIT_BUTTON_PREFIX}${_id}" type="button" class="edit-btn">
            Edit
        </button>
        <button id="${REMOVE_BUTTON_PREFIX}${_id}" type="button" class="remove-btn">
            Delete
        </button>
    </div>
</li>`;


export const getFormInputValues = () => {
    return {
        title: titleInput ? titleInput.value : '',
        address: addressInput ? addressInput.value : '',
        bike_path_length: bikePathLengthInput ? parseFloat(bikePathLengthInput.value) : 0,
        ticket_price: ticketPriceInput ? parseFloat(ticketPriceInput.value) : 0,
        description: descriptionInput ? descriptionInput.value : '',
    };
};

export const clearInputs = () => {
    if (titleInput) titleInput.value = "";
    if (addressInput) addressInput.value = "";
    if (bikePathLengthInput) bikePathLengthInput.value = "";
    if (ticketPriceInput) ticketPriceInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
};

export const fillInputsForEdit = (park) => {
    if (titleInput) titleInput.value = park.title;
    if (addressInput) addressInput.value = park.address;
    if (bikePathLengthInput) bikePathLengthInput.value = park.bike_path_length;
    if (ticketPriceInput) ticketPriceInput.value = park.ticket_price;
    if (descriptionInput) descriptionInput.value = park.description;
};

export const addParkToPage = (park, onEditItem, onRemoveItem) => {
    if (!itemsContainer) return;

    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        parkTemplate(park)
    );

    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${park._id}`);
    const removeButton = document.getElementById(`${REMOVE_BUTTON_PREFIX}${park._id}`);

    if (editButton) {
        editButton.addEventListener("click", onEditItem);
    }
    if (removeButton) {
        removeButton.addEventListener("click", onRemoveItem);
    }
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
    if (!itemsContainer) return;

    itemsContainer.innerHTML = "";

    for (const item of items) {
        addParkToPage(item, onEditItem, onRemoveItem);
    }
};

export const updateTotalCount = (count) => {
    const totalCountDiv = document.querySelector(".total-expenses");
    if (totalCountDiv) {
        totalCountDiv.textContent = `Total expenses: ${count}`;
    }
};