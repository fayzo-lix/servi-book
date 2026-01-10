// Récupérer le formulaire par son ID
const bookingForm = document.getElementById("bookingForm");

// Ajouter un écouteur d'événement sur l'envoi du formulaire
bookingForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    // Vérification simple : tous les champs remplis
    if (name === "" || phone === "" || service === "" || date === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Créer un objet réservation
    const reservation = {
        id: Date.now(), // ID unique
        name,
        phone,
        service,
        date
    };

    // Récupérer les réservations existantes depuis localStorage
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Ajouter la nouvelle réservation
    reservations.push(reservation);

    // Sauvegarder à nouveau dans localStorage
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Message de confirmation
    alert("Réservation effectuée avec succès !");

    // Réinitialiser le formulaire
    bookingForm.reset();
});
