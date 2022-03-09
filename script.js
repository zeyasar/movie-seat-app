const container = document.querySelector('.container');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const selectedMovie = document.getElementById('movie');
const film = document.querySelector('#film');
const seats = document.querySelectorAll('.seat:not(.occupied)');

movie();
getFromLocalStorage();
calculate();


container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        calculate();
        
    }
});

selectedMovie.addEventListener('change', function(e) {
    calculate();
    movie();
})

function calculate() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const seatCount = selectedSeats.length;
    count.textContent = seatCount;
    let price = selectedMovie.value;
    total.textContent = seatCount * price;

    
    let selectedSeatsArr = [...selectedSeats];
    let seatsArr = [...seats];
    let selectedSeatIndex = selectedSeatsArr.map((seat) =>{
        return seatsArr.indexOf(seat);
    });
   
    saveToLocalStorage(selectedSeatIndex);
}

function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', selectedMovie.selectedIndex);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat,index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    };

    if(selectedMovieIndex != null){
        selectedMovie.selectedIndex = selectedMovieIndex;

    };
}

function movie() {
    if (selectedMovie.value == 10) {
        film.innerText = `Avengers: Endgame`;
    }else if (selectedMovie.value == 12){
        film.innerText = `Joker`;
    }else if(selectedMovie.value == 8){
        film.innerText = `Toy Story 4`;
    }else if(selectedMovie.value == 9){
        film.innerText = `The Lion King`;
    }
};

