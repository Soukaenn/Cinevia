
const movies = [
    { 
        id: 1, 
        title: "Mad Max", 
        category: "Action", 
        img: "img/1.jpg", 
        desc: "Dans un monde désertique où l'essence et l'eau sont rares, Max s'associe à l'impératrice Furiosa pour échapper à un tyran impitoyable." 
    },
    { 
        id: 2, 
        title: "John Wick", 
        category: "Action", 
        img: "img/2.jpg", 
        desc: "Un ancien tueur à gages sort de sa retraite pour traquer les gangsters qui ont brisé sa vie, déclenchant une traque sanglante et stylisée." 
    },
    { 
        id: 3, 
        title: "The Dark Knight", 
        category: "Action", 
        img: "img/3.webp", 
        desc: "Batman doit affronter son plus grand défi psychologique face au Joker, un criminel anarchiste qui veut plonger la ville dans un chaos total." 
    },
    { 
        id: 10, 
        title: "Inception", 
        category: "Action", 
        img: "img/reception.jpg",
        desc: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction : il dérobe des secrets précieux enfouis dans le subconscient." 
    },
    { 
        id: 4, 
        title: "Parasite", 
        category: "Drame", 
        img: "img/per.jpg", 
        desc: "Toute la famille de Ki-taek est au chômage. Elle s'intéresse de près au train de vie de la richissime famille Park jusqu'à l'irréparable." 
    },
    { 
        id: 5, 
        title: "La Ligne Verte", 
        category: "Drame", 
        img: "img/5.jpg", 
        desc: "Le gardien d'un pénitencier découvre qu'un de ses prisonniers possède des pouvoirs de guérison miraculeux et une âme pure." 
    },
    { 
        id: 6, 
        title: "Whiplash", 
        category: "Drame", 
        img: "img/6.jpg", 
        desc: "Un jeune batteur de jazz ambitieux intègre un conservatoire de prestige où il subit les méthodes extrêmes d'un professeur impitoyable." 
    },
    { 
        id: 11, 
        title: "Le Parrain", 
        category: "Drame", 
        img: "img/per.jpg", 
        desc: "L'histoire épique de la famille Corleone, une dynastie de la mafia à New York, entre loyauté familiale et trahisons sanglantes." 
    },
    { 
        id: 7, 
        title: "Intouchables", 
        category: "comédie", 
        img: "img/7.jpg", 
        desc: "À la suite d'un accident, un riche aristocrate engage comme aide à domicile un jeune de banlieue. Deux mondes vont se percuter." 
    },
    { 
        id: 8, 
        title: "Grand Budapest Hotel", 
        category: "comédie", 
        img: "img/8.jpg", 
        desc: "Les aventures de Gustave H, concierge de légende, et de son protégé Zero Moustafa, au cœur d'une affaire de vol de tableau." 
    },
    { 
        id: 9, 
        title: "SuperGrave", 
        category: "comédie", 
        img: "img/9.jpg", 
        desc: "Deux lycéens impopulaires cherchent à acheter de l'alcool pour une fête, ce qui les entraîne dans une série d'aventures absurdes." 
    },
    { 
        id: 12, 
        title: "Deadpool", 
        category: "comédie", 
        img: "img/dea.jpg", 
        desc: "Un ancien mercenaire devenu invincible après une expérience ratée décide de traquer l'homme qui a failli détruire sa vie avec humour." 
    }
];


let favorites = JSON.parse(localStorage.getItem('cinevia_favs')) || [];
const movieGrid = document.getElementById('movieGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const modal = document.getElementById("movieModal");
const searchInput = document.getElementById('searchInput');

function displayMovies(list) {
    movieGrid.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${movie.img}">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <button class="details-btn" onclick="openModal(${movie.id})">
                    Voir détails
                </button>
            </div>`;
        movieGrid.appendChild(card);
    });
}

function openModal(id) {
    const movie = movies.find(m => m.id === id);
    document.getElementById("modalTitle").innerText = movie.title;
    document.getElementById("modalImg").src = movie.img;
    document.getElementById("modalGenre").innerText = movie.category;
    document.getElementById("modalDesc").innerText = movie.desc;
    
    const footer = document.getElementById("modalFooter");
    const isFav = favorites.some(f => f.id === id);
    
    footer.innerHTML = `
        <button class="details-btn" onclick="${isFav ? `removeFromFavorites(${id})` : `addToFavorites(${id})`}">
            ${isFav ? "Supprimer ❌" : "Ajouter ❤️"}
        </button>`;
    modal.style.display = "block";
}

function closeModal() { modal.style.display = "none"; }


function addToFavorites(id) {
    const movie = movies.find(m => m.id === id);
    if (!favorites.some(f => f.id === id)) {
        favorites.push(movie);
        saveAndRefresh();
        closeModal();
    }
}

function removeFromFavorites(id) {
    favorites = favorites.filter(f => f.id !== id);
    saveAndRefresh();
    if (modal.style.display === "block") closeModal();
}

function saveAndRefresh() {
    localStorage.setItem('cinevia_favs', JSON.stringify(favorites));
    displayFavorites();
}

function displayFavorites() {
    favoritesGrid.innerHTML = "";
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = "<p style='grid-column:1/-1; text-align:center; color:#666;'>Aucun favori.</p>";
        return;
    }
    favorites.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${movie.img}">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <button class="details-btn" style="background:#333" onclick="removeFromFavorites(${movie.id})">
                    Supprimer ❌
                </button>
            </div>`;
        favoritesGrid.appendChild(card);
    });
}


if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = movies.filter(m => m.title.toLowerCase().includes(term));
        displayMovies(filtered);
    });
}


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.getAttribute('data-filter');
        const filtered = (cat === 'all') ? movies : movies.filter(m => m.category === cat);
        displayMovies(filtered);
    });
});


displayMovies(movies);
displayFavorites();