document.querySelector('#darkmode').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkmode', isDarkMode);
});
//Variaveís para o banco
var total_erros = 0;
var win_game = 0;
var tempoJogo = 0;
// telas
const start_screen = document.querySelector('#start-screen');
const game_screen = document.querySelector('#game-screen');
const pause_screen = document.querySelector('#pause-screen');
const result_screen = document.querySelector('#result-screen')
//
const cells = document.querySelectorAll('.main-grid-cell');

const number_inputs = document.querySelectorAll('.number');

const player_name = document.querySelector('#player-name');
const game_level = document.querySelector('#game-level');
const game_time = document.querySelector('#game-time');

const result_time = document.querySelector('#result-time');

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];

let time = null;
let pause = false;
let seconds = 0;

let su = undefined;
let su_answer = undefined;

let selected_cell = -1;


const getGameInfo = () => JSON.parse(localStorage.getItem('game'));

//
const initGameGrid = () => {
    let index = 0;

    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;
        if (row === 2 || row === 5) {
            cells[index].style.marginBottom = '10px';
        }
        if (col === 2 || col === 5) {
            cells[index].style.marginRight = '10px';
        }
        index++;
    }
}
//

const setPlayerName = (name) => localStorage.setItem('player_name', name);


const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const clearSudoku = () => {
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        cells[i].innerHTML = '';
        cells[i].classList.remove('filled');
        cells[i].classList.remove('selected');
    }
}

const initSudoku = () => {
    // Limpando o sudoku antigo
    clearSudoku();
    resetBg();
    //Geração do puzzle do sudoku
    su = sudokuGen(level);
    su_answer = [...su.question];

    seconds = 0;
    saveGameInfo();

    // Mostrar sudoku nas divs
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;

        cells[i].setAttribute('data-value', su.question[row][col]);

        if (su.question[row][col] !== 0) {
            cells[i].classList.add('filled');
            cells[i].innerHTML = su.question[row][col];
        }
    }
}

const loadSudoku = () => {
    let game = getGameInfo();

    game_level.innerHTML = CONSTANT.LEVEL_NAME[game.level];

    su = game.su;

    su_answer = su.answer;

    seconds = game.seconds;
    game_time.innerHTML = showTime(seconds);

    level_index = game.level;

    // Mostrar Sudoku nas divs
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;

        cells[i].setAttribute('data-value', su_answer[row][col]);
        cells[i].innerHTML = su_answer[row][col] !== 0 ? su_answer[row][col] : '';
        if (su.question[row][col] !== 0) {
            cells[i].classList.add('filled');
        }
    }
}

const hoverBg = (index) => {
    let row = Math.floor(index / CONSTANT.GRID_SIZE);
    let col = index % CONSTANT.GRID_SIZE;

    let box_start_row = row - row % 3;
    let box_start_col = col - col % 3;

    for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
        for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
            let cell = cells[9 * (box_start_row + i) + (box_start_col + j)];
            cell.classList.add('hover');
        }
    }

    let step = 9;
    while (index - step >= 0) {
        cells[index - step].classList.add('hover');
        step += 9;
    }

    step = 9;
    while (index + step < 81) {
        cells[index + step].classList.add('hover');
        step += 9;
    }

    step = 1;
    while (index - step >= 9 * row) {
        cells[index - step].classList.add('hover');
        step += 1;
    }

    step = 1;
    while (index + step < 9 * row + 9) {
        cells[index + step].classList.add('hover');
        step += 1;
    }
}

const resetBg = () => {
    cells.forEach(e => e.classList.remove('hover'));
}

const checkErr = (value) => {
    const addErr = (cell) => {
        if (parseInt(cell.getAttribute('data-value')) === value) {
            cell.classList.add('err');
            cell.classList.add('cell-err');
            setTimeout(() => {
                cell.classList.remove('cell-err');
            }, 500);
        }
    }

    let index = selected_cell;
    total_erros++;
    //atualizarerros();
    console.log(total_erros);
    let row = Math.floor(index / CONSTANT.GRID_SIZE);
    let col = index % CONSTANT.GRID_SIZE;

    let box_start_row = row - row % 3;
    let box_start_col = col - col % 3;

    for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
        for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
            let cell = cells[9 * (box_start_row + i) + (box_start_col + j)];
            if (!cell.classList.contains('selected')) addErr(cell);
        }
    }

    let step = 9;
    while (index - step >= 0) {
        addErr(cells[index - step]);
        step += 9;
    }

    step = 9;
    while (index + step < 81) {
        addErr(cells[index + step]);
        step += 9;
    }

    step = 1;
    while (index - step >= 9 * row) {
        addErr(cells[index - step]);
        step += 1;
    }

    step = 1;
    while (index + step < 9 * row + 9) {
        addErr(cells[index + step]);
        step += 1;
    }
}

const removeErr = () => cells.forEach(e => e.classList.remove('err'));

const initNumberInputEvent = () => {
    number_inputs.forEach((e, index) => {
        e.addEventListener('click', () => {
            if (!cells[selected_cell].classList.contains('filled')) {
                cells[selected_cell].innerHTML = index + 1;
                cells[selected_cell].setAttribute('data-value', index + 1);
                // add to answer
                let row = Math.floor(selected_cell / CONSTANT.GRID_SIZE);
                let col = selected_cell % CONSTANT.GRID_SIZE;
                su_answer[row][col] = index + 1;
                // save game
                saveGameInfo();
                // ------------
                removeErr();
                checkErr(index + 1);
                cells[selected_cell].classList.add('zoom-in');
                setTimeout(() => {
                    cells[selected_cell].classList.remove('zoom-in');
                }, 500);

                //Checar se o jogo está ganho
                if (isGameWin()) {
                    win_game++;
                    console.log(win_game);
                    console.log(tempoJogo);
                    removeGameInfo();
                    showResult();
                }
            }
        })
    })
}

const saveGameInfo = () => {
    let game = {
        level: level_index,
        seconds: seconds,
        su: {
            original: su.original,
            question: su.question,
            answer: su_answer
        }
    }
    localStorage.setItem('game', JSON.stringify(game));
}

const removeGameInfo = () => {
    localStorage.removeItem('game');
    document.querySelector('#btn-continue').style.display = 'none';
}

const showResult = () => {
    clearInterval(time);
    result_screen.classList.add('active');
    result_time.innerHTML = showTime(seconds);

}

const isGameWin = () => sudokuCheck(su_answer);

const initCellsEvent = () => {
    cells.forEach((e, index) => {
        e.addEventListener('click', () => {
            if (!e.classList.contains('filled')) {
                cells.forEach(e => e.classList.remove('selected'));

                selected_cell = index;
                e.classList.remove('err');
                e.classList.add('selected');
                resetBg();
                hoverBg(index);
            }
        })
    })
}

const startGame = () => {
    start_screen.classList.remove('active');
    game_screen.classList.add('active');

    player_name.innerHTML = sessionStorage.username;

    game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];

    showTime(seconds);

    time = setInterval(() => {
        if (!pause) {
            seconds = seconds + 1;
            tempoJogo++;
            game_time.innerHTML = showTime(seconds);
        }
    }, 1000);
}

const returnStartScreen = () => {
    clearInterval(time);
    pause = false;
    seconds = 0;
    start_screen.classList.add('active');
    game_screen.classList.remove('active');
    pause_screen.classList.remove('active');
    result_screen.classList.remove('active');
}

// Adicionando evento ao botão level
document.querySelector('#btn-level').addEventListener('click', (e) => {
    level_index = level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
    level = CONSTANT.LEVEL[level_index];
    e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
})

document.querySelector('#btn-play').addEventListener('click', () => {
    win_game = 0;
    total_erros = 0;
    tempoJogo = 0;
    comecarjogoinsert();
    buscaridjogo();
    initSudoku();
    startGame();
});

document.querySelector('#btn-continue').addEventListener('click', () => {
    loadSudoku();
    startGame();

});

document.querySelector('#btn-pause').addEventListener('click', () => {
    pause_screen.classList.add('active');
    pause = true;
});
document.querySelector('#btn-resume').addEventListener('click', () => {
    pause_screen.classList.remove('active');
    pause = false;
});
document.querySelector('#btn-new-game').addEventListener('click', () => {
    returnStartScreen();
});
document.querySelector('#btn-new-game-2').addEventListener('click', () => {
    returnStartScreen();
});

document.querySelector('#btn-delete').addEventListener('click', () => {
    cells[selected_cell].innerHTML = '';
    cells[selected_cell].setAttribute('data-value', 0);

    let row = Math.floor(selected_cell / CONSTANT.GRID_SIZE);
    let col = selected_cell % CONSTANT.GRID_SIZE;

    su_answer[row][col] = 0;

    removeErr();
})
//

const init = () => {
    const darkmode = JSON.parse(localStorage.getItem('darkmode'));
    document.body.classList.add(darkmode ? 'dark' : 'light');

    const game = getGameInfo();
    document.querySelector('#btn-continue').style.display = game ? 'grid' : 'none';

    initGameGrid();
    initCellsEvent();
    initNumberInputEvent();
}

init();
var id_usuario = sessionStorage.ID_USUARIO;
function comecarjogoinsert() {
    var dificuldade = CONSTANT.LEVEL_NAME[level_index];
    fetch("/usuarios/comecarjogo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            id: id_usuario,
            dificuldade: dificuldade
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Jogo inserido");
            } else {
                throw "Não foi possível mandar os dados para o banco";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            alert("Erro no catch");
        });
}
// function atualizarerros() 
// {
//     fetch("/usuarios/errosup", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             id: id_usuario,
//             erros: total_erros
//         })
//     })    
//     .then(res => {
//         if(!res.ok)
//         {
//             throw new Error("Erro ao atualizar");
//         }
//         return res.json();
//     })
//     .then(data => {
//         console.log("Atualizando com sucesso:", data);
//     })
//     .catch(err => {
//         console.log("Erro:", err);
//     })
// }
var id_jogo = 0;
var idplayer = sessionStorage.ID_USUARIO;
function buscaridjogo() {
    idplayer = sessionStorage.ID_USUARIO;
    fetch(`/usuarios/obteridjogo/${idplayer}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(data => {
            return data.json();
        })
        .then(data => {
            console.log("Dado puxado com sucesso:", data);
            sessionStorage.setItem('ID_JOGO', data[0].jogo_atual);
        })
        .catch(error => {
            console.log("Erro no catch:", error);
        })
}