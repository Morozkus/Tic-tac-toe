'use strict'

const table = document.querySelector('#field');
const cells = document.querySelectorAll('#field td');
const krest = document.querySelector('.krest');
let scoreKrest = 0;
const zero = document.querySelector('.zero');
let scoreZero = 0;
const varietive = ['X', '0']
let step = 0;

function game(ev) {
    const target = ev.target.closest('td')
    if (!target) return;
    if (target.classList.contains('active')) return

    target.textContent = varietive[step % 2]
    step++

    target.classList.add('active')

    if (isVictory()) {
        step % 2 ? krest.textContent = ++scoreKrest : zero.textContent = ++scoreZero
        clear()
    }
    else if (step === 9) {
        console.log('Ничья');
        clear()
    };

}

function isVictory() {
    const combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

    for (const comb of combs) {
        if (
			cells[comb[0]].textContent == cells[comb[1]].textContent &&
			cells[comb[1]].textContent == cells[comb[2]].textContent &&
			cells[comb[0]].textContent != ''
		) {
			return true;
		}
    }
    return false;
}

function clear () {
    cells.forEach(el => {
        if (el.classList.contains('active')) el.classList.remove('active')
        el.textContent = ''
    })
    step = 0;
}

table.addEventListener('click', game)