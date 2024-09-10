const API_URL = 'https://crudcrud.com/api/d10764e63eae435f8e2def82eb9c72b8/letter';

const cardContainer = document.getElementById('card-container');
const cardForm = document.getElementById('card-form');
const createCardBtn = document.getElementById('create-card-btn');

async function fetchGreetingCards() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error('Error fetching greeting cards:', error);
    }
}

async function createGreetingCard(cardData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        });

        const createdCard = await response.json();
        renderCard(createdCard);
        cardForm.style.display = 'none';
        createCardBtn.style.display = 'block';
    } catch (error) {
        console.error('Error creating greeting card:', error);
    }
}

async function updateGreetingCard(cardId, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        const updatedCard = await response.json();
        renderCard(updatedCard);
    } catch (error) {
        console.error('Error updating greeting card:', error);
    }
}

async function deleteGreetingCard(cardId) {
    try {
        const response = await fetch(`${API_URL}/${cardId}`, {
            method: 'DELETE'
        });

        console.log('Card deleted successfully');
        fetchGreetingCards();
    } catch (error) {
        console.error('Error deleting greeting card:', error);
    }
}

function renderCards(cards) {
    cardContainer.innerHTML = '';
    cards.forEach(card => renderCard(card));
}

function renderCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const toElement = document.createElement('h2');
    toElement.textContent = `To: ${card.to}`;

    const firstMessageElement = document.createElement('p');
    firstMessageElement.textContent = card.firstMessage;

    const greetElement = document.createElement('h1');
    greetElement.textContent = card.greet;

    const secondMessageElement = document.createElement('p');
    secondMessageElement.textContent = card.secondMsg;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        cardForm.style.display = 'block';
        createCardBtn.style.display = 'none';

        document.getElementById('to').value = card.to;
        document.getElementById('firstMessage').value = card.firstMessage;
        document.getElementById('greet').value = card.greet;
        document.getElementById('secondMessage').value = card.secondMsg;
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteGreetingCard(card._id));

    cardElement.appendChild(toElement);
    cardElement.appendChild(firstMessageElement);
    cardElement.appendChild(greetElement);
    cardElement.appendChild(secondMessageElement);
    cardElement.appendChild(editBtn);
    cardElement.appendChild(deleteBtn);

    cardContainer.appendChild(cardElement);
}

fetchGreetingCards();

cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardData = {
        to: document.getElementById('to').value,
        firstMessage: document.getElementById('firstMessage').value,
        greet: document.getElementById('greet').value,
        secondMessage: document.getElementById('secondMessage').value
    };

    createGreetingCard(cardData);
});

createCardBtn.addEventListener('click', () => {
    cardForm.style.display = 'block';
    createCardBtn.style.display = 'none';
});