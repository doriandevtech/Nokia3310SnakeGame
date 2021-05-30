document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // The first div in our grid
    let appleIndex = 0 // The first div in our grid
    let currentSnake = [2,1,0] // The div with id=2 -> HEAD, div with id=0 -> TAIL, div with id=1 -> BODY
    let direction = 1
    let score = 0
    let speed = 0
    let intervalTime = 0
    let interval = 0


    // To start and restrart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    // Functions that deals with snake behaviour (hitting border, itself)
    function moveOutcomes() {
        // If the snake hit a border or itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
        ) {
            return clearInterval(interval) // if any of the above happen this will clean the interval
        }

        const tail = currentSnake.pop() // it removes the last item of the array and shows it
        squares[tail].classList.remove('snake') // removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

        // If the snake gets the apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    // Generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) // making sure apple
        squares[appleIndex].classList.add('apple')
    }


    // Assign the functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // We are removing the class

        if(e.keyCode === 39) {
            direction = 1 // Right arrow, snake goes right
        } else if (e.keyCode === 38) {
            direction = -width // Up arrow, snake goes up
        } else if (e.keyCode === 37) {
            direction = -1 // Left arrow, snake goes left
        } else if (e.keyCode === 40) {
            direction = +width // Down arrow, snake goes down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})

