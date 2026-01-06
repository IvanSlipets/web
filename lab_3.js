import {
    EDIT_BUTTON_PREFIX,
    REMOVE_BUTTON_PREFIX,
    clearInputs,
    getFormInputValues,
    renderItemsList,
    updateTotalCount,
    fillInputsForEdit,
} from "./dom_util.js";
import {
    deletePark,
    getAllParks,
    postPark,
    updatePark
} from "./api_util.js";


const searchInput = document.querySelector(".search-form input[type='search']");
const searchButton = document.querySelector(".search-btn");
const clearSearchButton = document.querySelector(".clear-btn");
const countButton = document.getElementById("count-btn");
const sortToggle = document.getElementById("sort-toggle");

const submitButton = document.getElementById("submit_button");
const addForm = document.getElementById("add_form");

let parks = [];
let parkToEditId = null;



const refetchAllParks = async (shouldSort = false) => {
    try {
        const allParks = await getAllParks();
        parks = allParks;

        if (shouldSort) {
            parks.sort((a, b) => b.ticket_price - a.ticket_price);
        }

        renderItemsList(parks, onEditItem, onRemoveItem);
    } catch (error) {
        console.error("Error fetching parks:", error);
    }
};



const onEditItem = async (e) => {
    const parkId = e.currentTarget.id.replace(EDIT_BUTTON_PREFIX, "");
    
    window.location.href = `./add_park.html#edit=${parkId}`;
};

const onRemoveItem = async (e) => {
    const parkId = e.currentTarget.id.replace(REMOVE_BUTTON_PREFIX, "");

    if (confirm("Are you sure you want to delete this park?")) {
        try {
            await deletePark(parkId);
            await refetchAllParks(sortToggle ? sortToggle.checked : false);
        } catch (error) {
            alert("Error deleting park: " + (error.message || "Unknown error"));
            console.error("Error deleting park:", error);
        }
    }
};

const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
        refetchAllParks(sortToggle ? sortToggle.checked : false);
        return;
    }

    const foundParks = parks.filter(
        park =>
            park.title.toLowerCase().includes(searchTerm) ||
            park.address.toLowerCase().includes(searchTerm) ||
            park.description.toLowerCase().includes(searchTerm)
    );

    renderItemsList(foundParks, onEditItem, onRemoveItem);
};

const handleSortToggle = () => {
    if (sortToggle) {
        refetchAllParks(sortToggle.checked);
    }
};

const handleCount = () => {
    const totalCount = parks.length;
    updateTotalCount(totalCount);
};


const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitButton) return; 

    const parkData = getFormInputValues();

    try {
        if (parkToEditId) {
            await updatePark(parkToEditId, parkData);
            alert(`Park "${parkData.title}" updated successfully!`);
            window.location.href = './lab_3.html';
        } else {
            await postPark(parkData);
            alert(`Park "${parkData.title}" created successfully!`);
            window.location.href = './lab_3.html'; 
        }

        submitButton.textContent = 'Submit'; 
        
    } catch (error) {
        alert("Error submitting form: " + (error.message || "Unknown error"));
        console.error("Error submitting form:", error);
    }
};


if (submitButton && addForm) {
    submitButton.addEventListener("click", handleSubmit);

    const hash = window.location.hash;
    const match = hash.match(/#edit=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);

    if (match) {
        const editId = match[1];
        parkToEditId = editId;

        getAllParks().then(allParks => {
            const park = allParks.find(p => p._id === editId);
            if (park) {
                fillInputsForEdit(park);
                
                const pageTitle = document.querySelector('h1');
                if (pageTitle) pageTitle.textContent = "Edit park";
                submitButton.textContent = "Save changes";
            } else {
                parkToEditId = null;
            }
        }).catch(error => {
            console.error("Error loading park for editing:", error);
        });
    }
}


if (searchInput) {
    
    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            handleSearch();
        });
    }

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", (e) => {
            e.preventDefault();
            searchInput.value = "";
            handleSearch();
        });
    }
    
    if (sortToggle) {
        sortToggle.addEventListener("change", handleSortToggle);
    }
    
    if (countButton) {
        countButton.addEventListener("click", handleCount);
    }

    refetchAllParks();
}
