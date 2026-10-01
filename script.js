let animeList = [
    {
        title: "One Piece",
        episode: 915,
        status: "Watching"
    },
    {
        title: "Naruto",
        episode: 500,
        status: "Completed"
    }
];

const savedAnime = localStorage.getItem("novaAnimeList");

if (savedAnime) {
    try {
        animeList = JSON.parse(savedAnime);
    } catch (error) {
        animeList = [
            {
                title: "One Piece",
                episode: 915,
                status: "Watching"
            },
            {
                title: "Naruto",
                episode: 500,
                status: "Completed"
            }
        ];
    }
}

const animeContainer = document.getElementById("anime-list");
const searchInput = document.getElementById("search-input");
const clearSearchButton = document.getElementById("clear-search");

const animeNameInput = document.getElementById("anime-name");
const animeEpisodeInput = document.getElementById("anime-episode");
const animeStatusInput = document.getElementById("anime-status");
const addButton = document.getElementById("add-button");


function saveAnime() {
    localStorage.setItem("novaAnimeList", JSON.stringify(animeList));
}


function displayAnime(animeArray) {
    animeContainer.innerHTML = "";

    if (animeArray.length === 0) {
        animeContainer.innerHTML =
            "<p class='empty-message'>No anime found.</p>";
        return;
    }

    animeArray.forEach(function(anime) {
        const card = document.createElement("div");

        card.className = "anime-card";

        let statusClass = "status-dropped";

        if (anime.status === "Watching") {
            statusClass = "status-watching";
        } else if (anime.status === "Completed") {
            statusClass = "status-completed";
        } else if (anime.status === "Plan to Watch") {
            statusClass = "status-plan";
        }

        card.innerHTML = `
            <h2>${anime.title}</h2>
            <p>Episode ${anime.episode}</p>
            <p class="${statusClass}">${anime.status}</p>

            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        animeContainer.appendChild(card);

        const editButton = card.querySelector(".edit-button");

        editButton.addEventListener("click", function() {
            const newEpisode = prompt(
                "Enter the new episode:",
                anime.episode
            );

            const newStatus = prompt(
                "Enter the new status: Watching, Completed, Plan to Watch, or Dropped",
                anime.status
            );

            if (newEpisode === null || newStatus === null) {
                return;
            }

            const episodeNumber = Number(newEpisode);

            if (episodeNumber < 1 || newStatus.trim() === "") {
                alert("Please enter valid information.");
                return;
            }

            anime.episode = episodeNumber;
            anime.status = newStatus.trim();

            saveAnime();
            displayAnime(animeList);
        });

        const deleteButton = card.querySelector(".delete-button");

        deleteButton.addEventListener("click", function() {
            animeList = animeList.filter(function(item) {
                return item !== anime;
            });

            saveAnime();
            displayAnime(animeList);
        });
    });
}


displayAnime(animeList);


searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredAnime = animeList.filter(function(anime) {
        return anime.title.toLowerCase().includes(searchText);
    });

    displayAnime(filteredAnime);
});


clearSearchButton.addEventListener("click", function() {
    searchInput.value = "";
    displayAnime(animeList);
});


addButton.addEventListener("click", function() {
    const name = animeNameInput.value.trim();
    const episode = Number(animeEpisodeInput.value);
    const status = animeStatusInput.value;

    if (name === "" || episode < 1) {
        alert("Please enter an anime name and episode.");
        return;
    }

    animeList.push({
        title: name,
        episode: episode,
        status: status
    });

    saveAnime();

    animeNameInput.value = "";
    animeEpisodeInput.value = "";
    animeStatusInput.value = "Watching";

    displayAnime(animeList);
});
