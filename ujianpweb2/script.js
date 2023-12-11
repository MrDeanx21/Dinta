document.addEventListener("DOMContentLoaded", function () {
    displayCities();
});

function addOrUpdateCity() {
    var cityName = document.getElementById("cityName").value;
    var cityIndex = document.getElementById("cityIndex").value;

    if (cityName.trim() !== "") {
        var cities = getCities();

        if (cityIndex === "") {
            // Tambah Kota Baru
            cities.push(cityName);
        } else {
            // Update Kota
            cities[cityIndex] = cityName;
        }

        saveCities(cities);
        displayCities();
        document.getElementById("cityName").value = "";
        document.getElementById("cityIndex").value = "";
    }
}

function getCities() {
    var cities = localStorage.getItem("cities");
    return cities ? JSON.parse(cities) : [];
}

function saveCities(cities) {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function displayCities() {
    var cities = getCities();
    var tableBody = document.querySelector("#cityTable tbody");

    tableBody.innerHTML = "";

    cities.forEach(function (city, index) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.textContent = index + 1;
        cell2.textContent = city;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editCity(index);
        };
        cell3.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = function () {
            deleteCity(index);
        };
        cell3.appendChild(deleteButton);
    });
}

function editCity(index) {
    var cities = getCities();
    var cityName = cities[index];

    document.getElementById("cityName").value = cityName;
    document.getElementById("cityIndex").value = index;
}

function deleteCity(index) {
    var cities = getCities();
    cities.splice(index, 1);
    saveCities(cities);
    displayCities();
}