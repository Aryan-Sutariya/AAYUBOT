
let changenav = function (ele) {
    ele.classList.toggle("ri-close-large-line");
}

let toggleNav = function (ele) {
    // Toggle the icon between menu and close
    ele.classList.toggle("ri-close-large-line");

    // Toggle the visibility of the menu (ul)
    const navMenu = document.querySelector('header nav ul');
    if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "flex";
    }
};

let medicineData = [];

// Load the JSON file with the medicine data
fetch('Medicine_Data.json')
    .then(response => response.json())
    .then(data => {
        medicineData = data;
    })
    .catch(error => {
        console.error("Error loading medicine data:", error);
    });

function searchMedicines() {
    const partialName = document.getElementById('searchBar').value.toUpperCase();
    const medicineList = document.getElementById('medicine-list');
    const resultText = document.getElementById('result-text');
    const imageLabel = document.getElementById('medicine-image');

    // Clear the previous results and image
    medicineList.innerHTML = '';
    imageLabel.src = '';
    resultText.innerHTML = '';

    // If the search bar is empty, don't show the list or any results
    if (partialName.trim() === '') {
        return;
    }

    // Filter matching medicines
    const matches = medicineData.filter(medicine => medicine["Medicine Name"].toUpperCase().includes(partialName));

    if (matches.length === 0) {
        resultText.innerHTML = "No matching medicines found.";
        return;
    }

    // Display the filtered medicines in the list
    matches.forEach((medicine) => {
        const li = document.createElement('li');
        li.textContent = medicine["Medicine Name"];
        // Store the full medicine object in the onclick handler
        li.onclick = function () {
            showMedicineInfo(medicine); // Pass the actual medicine data
        };
        medicineList.appendChild(li);
    });
}

function showMedicineInfo(medicine) {
    const resultText = document.getElementById('result-text');
    const imageLabel = document.getElementById('medicine-image');
    const name = medicine["Medicine Name"];
    const composition = medicine["Composition"];
    const uses = medicine["Uses"];
    const sideEffects = medicine["Side_effects"];
    const imageUrl = medicine["Image URL"];
    const manufacturer = medicine["Manufacturer"];
    const excellentReview = medicine["Excellent Review %"];
    const averageReview = medicine["Average Review %"];
    const poorReview = medicine["Poor Review %"];

    resultText.innerHTML = `
    <strong>Manufacturer:</strong> ${manufacturer}<br><br>
    <strong>Composition:</strong> ${composition}<br><br>
    <strong>Uses:</strong> ${uses}<br><br>
    <strong>Side Effects:</strong> ${sideEffects}<br><br>
    <strong>Reviews:</strong> Excellent: ${excellentReview}% | Average: ${averageReview}% | Poor: ${poorReview}%
    `;

    imageLabel.src = imageUrl;
}

