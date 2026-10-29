
const grid = document.getElementsByClassName('grid')[0];

let limit = 20;

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let i = 1;

const divModal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

const h2ModalName = document.getElementById('modal-name');
const pModalStatus = document.getElementById('modal-status');
const pModalSpecies = document.getElementById('modal-species');
const pModalLocation = document.getElementById('modal-location');

const modalImg = document.getElementById('modal-img');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

let characterSearch = searchInput.value;

const getCharacters = async function () {

    const response = await fetch('hxh.json');

    if (response.ok) {

        const dataCharacters = await response.json();

        if (dataCharacters.info.prev === null) {
            btnPrev.style.display = "none";
        } else {
            btnPrev.style.display = "inline-block";
        }

        if (dataCharacters.info.next === null) {
            btnNext.style.display = "none";
        } else {
            btnNext.style.display = "inline-block";
        }

        grid.innerHTML = '';

        dataCharacters.results.map((character, index) => {

            if (index >= (i - 1) * limit && index < i * limit) {

                const div = document.createElement('div');
                div.classList.add('card');

                const img = document.createElement('img');
                img.src = character.image;

                img.style.opacity = "0";

                img.onload = function () {
                    img.style.opacity = "1";
                    img.style.transition = "opacity 0.3s ease";
                };

                const h2 = document.createElement('h2');
                h2.innerText = character.name;

                const p = document.createElement('p');
                p.innerText = character.species;

                grid.appendChild(div);

                div.appendChild(img);
                div.appendChild(h2);
                div.appendChild(p);

                div.addEventListener('click', function () {

                    divModal.classList.add('show-modal');

                    modalImg.src = character.image;

                    h2ModalName.innerText = character.name;
                    pModalStatus.innerText = character.status;
                    pModalSpecies.innerText = character.species;
                    pModalLocation.innerText = character.location.name;

                });

            }

        });

        if (characterSearch !== '') {

            grid.innerHTML = '';

            dataCharacters.results.map((character) => {

                if (character.name.toLowerCase() === characterSearch.toLowerCase()) {

                    const div = document.createElement('div');
                    div.classList.add('card');

                    const img = document.createElement('img');
                    img.src = character.image;

                    const h2 = document.createElement('h2');
                    h2.innerText = character.name;

                    const p = document.createElement('p');
                    p.innerText = character.species;

                    grid.appendChild(div);

                    div.appendChild(img);
                    div.appendChild(h2);
                    div.appendChild(p);

                    div.addEventListener('click', function () {

                        divModal.classList.add('show-modal');

                        modalImg.src = character.image;

                        h2ModalName.innerText = character.name;
                        pModalStatus.innerText = character.status;
                        pModalSpecies.innerText = character.species;
                        pModalLocation.innerText = character.location.name;

                    });

                }

            });

            if (grid.innerHTML === '') {
                alert('Character not found');
            }

        }

    } else {

        alert('Character not found');
        grid.innerHTML = "";

    }

};

searchBtn.addEventListener('click', function () {

    characterSearch = searchInput.value;

    i = 1;

    getCharacters();

});

btnPrev.addEventListener('click', function () {

    i--;

    getCharacters();

});

btnNext.addEventListener('click', function () {

    i++;

    getCharacters();

});

closeModal.addEventListener('click', function () {

    divModal.classList.remove('show-modal');

});

getCharacters();
