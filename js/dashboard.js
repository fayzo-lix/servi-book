// Récupérer le tbody du tableau
const tableBody = document.querySelector("#reservationsTable tbody");
const searchInput = document.getElementById("searchName");
const filterSelect = document.getElementById("filterService");

// Fonction pour afficher les réservations avec filtre et recherche
function displayReservations() {
    tableBody.innerHTML = ""; // Vide le tableau avant de remplir

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Appliquer la recherche par nom
    const searchText = searchInput.value.toLowerCase();
    reservations = reservations.filter(res => res.name.toLowerCase().includes(searchText));

    // Appliquer le filtre par service
    const filterValue = filterSelect.value;
    if (filterValue) {
        reservations = reservations.filter(res => res.service === filterValue);
    }

    // Créer une ligne pour chaque réservation
    reservations.forEach((res) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${res.name}</td>
            <td>${res.phone}</td>
            <td>${res.service}</td>
            <td>${res.date}</td>
            <td><button class="btn btn-secondary" onclick="deleteReservation(${res.id})">Supprimer</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Supprimer réservation par ID
function deleteReservation(id) {
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations = reservations.filter(res => res.id !== id);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    displayReservations();
}

// Supprimer toutes les réservations
document.getElementById("clearAll").addEventListener("click", function() {
    if(confirm("Voulez-vous vraiment supprimer toutes les réservations ?")) {
        localStorage.removeItem("reservations");
        displayReservations();
    }
});

// Écouteurs pour recherche et filtre
searchInput.addEventListener("input", displayReservations);
filterSelect.addEventListener("change", displayReservations);

// Afficher les réservations au chargement
displayReservations();

