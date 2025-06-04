
//Variaveís para o banco
var total_erros = 0;
var win_game = '';
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

const checkConflict = (board, row, col, value) => {
    // Verifica a linha
    for (let c = 0; c < CONSTANT.GRID_SIZE; c++) {
        if (c !== col && board[row][c] === value) {
            return true; // Conflito na linha
        }
    }

    // Verifica a coluna
    for (let r = 0; r < CONSTANT.GRID_SIZE; r++) {
        if (r !== row && board[r][col] === value) {
            return true; // Conflito na coluna
        }
    }

    // Verifica o bloco 3x3
    let box_start_row = row - (row % CONSTANT.BOX_SIZE);
    let box_start_col = col - (col % CONSTANT.BOX_SIZE);

    for (let r = 0; r < CONSTANT.BOX_SIZE; r++) {
        for (let c = 0; c < CONSTANT.BOX_SIZE; c++) {
            const current_row = box_start_row + r;
            const current_col = box_start_col + c;
            // Não compara a célula com ela mesma
            if (current_row !== row || current_col !== col) { 
                if (board[current_row][current_col] === value) {
                    return true; // Conflito no bloco
                }
            }
        }
    }
    return false; // Nenhum conflito encontrado
};

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
                let newValue = index + 1; 
                let row = Math.floor(selected_cell / CONSTANT.GRID_SIZE);
                let col = selected_cell % CONSTANT.GRID_SIZE;

                const temp_su_answer = JSON.parse(JSON.stringify(su_answer)); 
                temp_su_answer[row][col] = newValue; 

                let isCurrentMoveAnError = false;
                if (checkConflict(temp_su_answer, row, col, newValue)) {
                    isCurrentMoveAnError = true; 
                    total_erros++; 
                    atualizarerros();
                }
                cells[selected_cell].innerHTML = newValue;
                cells[selected_cell].setAttribute('data-value', newValue);
                su_answer[row][col] = newValue; 

                saveGameInfo(); 

                removeErr(); 
                checkErr(newValue); 

                if (isCurrentMoveAnError) {
                    cells[selected_cell].classList.add('err');
                    cells[selected_cell].classList.add('cell-err'); 
                    setTimeout(() => {
                        cells[selected_cell].classList.remove('cell-err');
                    }, 500);
                }
                cells[selected_cell].classList.add('zoom-in');
                setTimeout(() => {
                    cells[selected_cell].classList.remove('zoom-in');
                }, 500);
                if (isGameWin()) {
                    win_game = '1';
                    atualizartempo();
                    atualizarwin();
                    removeGameInfo();
                    title_page.innerHTML = `Sudoku - Jogo Finalizado`;
                    showResult();
                }
            }
        });
    });
};

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
    // document.querySelector('#btn-continue').style.display = 'none';
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
    win_game = '';
    total_erros = 0;
    tempoJogo = 0;
    title_page.innerHTML = `Sudoku - Jogo em Andamento`;
    comecarjogoinsert();
    initSudoku();
    startGame();
    var loadidjogo = setInterval(() => {
        buscaridjogo();
    }, 500);
    setTimeout(() => {
        clearInterval(loadidjogo);
    }, 1000);
});

// document.querySelector('#btn-continue').addEventListener('click', () => {
//     loadSudoku();
//     startGame();

// });

document.querySelector('#btn-pause').addEventListener('click', () => {
    title_page.innerHTML = `Sudoku - Jogo Pausado`;
    pause_screen.classList.add('active');
    pause = true;
});
document.querySelector('#btn-resume').addEventListener('click', () => {
    title_page.innerHTML = `Sudoku - Jogo em Andamento`;
    pause_screen.classList.remove('active');
    pause = false;
});
document.querySelector('#btn-new-game').addEventListener('click', () => {
    title_page.innerHTML = `Sudoku - Escolha a dificuldade`;
    returnStartScreen();
});
document.querySelector('#btn-new-game-2').addEventListener('click', () => {
    title_page.innerHTML = `Sudoku - Escolha a dificuldade`;
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
    const game = getGameInfo();
    // document.querySelector('#btn-continue').style.display = game ? 'grid' : 'none';

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
            } else {
                throw "Não foi possível mandar os dados para o banco";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            alert("Erro no catch");
        });
}
function atualizarwin() {
    var idjogo = sessionStorage.ID_JOGO;

    fetch("/usuarios/updatewin", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id_usuario,
            win: win_game,
            idplayer: idjogo
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao atualizar");
            }
            return res.json();
        })
        .then(data => {
            console.log("Atualizando com sucesso:", data);
        })
        .catch(err => {
            console.log("Erro:", err);
        })
}
function atualizartempo() {
    var idjogo = sessionStorage.ID_JOGO;

    fetch("/usuarios/updatetempo", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id_usuario,
            tempo: tempoJogo,
            idplayer: idjogo
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao atualizar");
            }
            return res.json();
        })
        .then(data => {
            console.log("Atualizando com sucesso:", data);
        })
        .catch(err => {
            console.log("Erro:", err);
        })
}
function atualizarerros() {
    var idjogo = sessionStorage.ID_JOGO;
    fetch("/usuarios/errosup", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id_usuario,
            erros: total_erros,
            idplayer: idjogo
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao atualizar");
            }
            return res.json();
        })
        .then(data => {
            console.log("Atualizando com sucesso:", data);
        })
        .catch(err => {
            console.log("Erro:", err);
        })
}
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