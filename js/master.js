const cards = document.querySelectorAll('.flip')

const images = ['img/acorn-256.png', 'img/apple-256.png', 'img/butterfly-256.png', 'img/carrot-256.png',
    'img/crab-256.png', 'img/frog-256.png', 'img/ladybug-256.png', 'img/owl-256.png']

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]

    }
    return array
}

function prepareCards() {
    const double = [...images, ...images]

    const shuffleImage = shuffleArray(double)

    cards.forEach((card, index) => {
        const imageName = shuffleImage[index]
        const backSide = card.querySelector('.back')

        backSide.style.backgroundImage = `url('${imageName}')`
        backSide.style.backgroundSize = 'contain'
        backSide.style.backgroundPosition = 'center'
        backSide.style.backgroundRepeat = 'no-repeat'

        card.dataset.image = imageName
    })
}

let flippedCards = []
let canFlip = true
let matchedpairs = 0

function handleCard(event) {
    const card = event.currentTarget

    if (!canFlip || card.classList.contains('flipped') ||
        card.classList.contains('matched')) {
        return
    }

    card.classList.add('flipped')
    flippedCards.push(card)

    if (flippedCards.length == 2) {
        canFlip = false
        chekForMatch()
    }

}

function chekForMatch() {
    const [card1, card2] = flippedCards

    if (card1.dataset.image == card2.dataset.image) {

        setTimeout(() => {
            card1.classList.add('matched')
            card2.classList.add('matched')
        }, 1000);
        matchedpairs++

        updateScore()

        flippedCards = []
        canFlip = true

        if (matchedpairs == images.length) {
            setTimeout(() => {
                alert('Well done, you win')
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped')
            card2.classList.remove('flipped')

            flippedCards = []
            canFlip = true
        }, 1000);
    }
}

function updateScore() {
    const scorElement = document.querySelector('#score')
    const pairsElement = document.querySelector('#pairs')

    if (scorElement && pairsElement) {
        const newScore = matchedpairs * 10
        scorElement.textContent = newScore
        pairsElement.textContent = `${matchedpairs}`
    }
}

document.addEventListener('DOMContentLoaded', () => {
    prepareCards()

    cards.forEach(val => {
        val.addEventListener('click', handleCard)
    })

    const restartBtn = document.createElement('button')
    restartBtn.textContent = 'Play again'
    restartBtn.className = 'restart-btn'
    document.body.appendChild(restartBtn)

    restartBtn.addEventListener('click', () => {
        cards.forEach((card) => {
            card.classList.remove('flipped', 'matched')
        })

        flippedCards = []
        matchedpairs = 0
        canFlip = true

        setTimeout(prepareCards, 3000);
        updateScore()
    })
    updateScore()


})