var nunSelected = null;
var titleSelected = null;

var erros = 0;

var board = [
    "56--97-8-",
    "-975681-2",
    "18-234567",
    "9-51862-3",
    "---923-56",
    "628-57914",
    "759612348",
    "3--47962-",
    "2163-579-"
];


var solution = [
    "56-197-8-",
    "-975681-2",
    "18-234567",
    "9-51862-3",
    "---923-56",
    "628-57914",
    "759612348",
    "3--479621",
    "2163-579-"
];

    window.onload = function() {
        setGame();
    }

    function setGame() 
    {
        //Criação dos Botões de Número
        for(let i = 1; i <= 9; i++)
        {
            let number = document.createElement("div");
            number.id = i;
            number.innerText = i;
            number.addEventListener("click", selectNumber);
            number.classList.add("number");
            document.getElementById("digits").appendChild(number); 
        }    
        //Board 9x9
        for(let r = 0; r < 9; r++)
        {
            for(let c = 0; c < 9; c++)
            {
                let tile = document.createElement("div");
                tile.id = r.toString() + '-' + c.toString();  
                if (board[r][c] != '-') 
                {
                    tile.innerText = board[r][c];
                    tile.classList.add("tile-start")
                }
                if (r == 2 || r == 5) 
                {
                    tile.classList.add("horizontal-line-2-5")    
                }
                if (c == 2 || c == 5) 
                {
                    tile.classList.add("vertical-line-2-5")        
                }
                if (r == 3 || r == 6) 
                {
                    tile.classList.add("horizontal-line-3-6")    
                }
                if (c == 3 || c == 6) 
                {
                    tile.classList.add("vertical-line-3-6")        
                }
                tile.addEventListener("click", selectTile);
                tile.classList.add("tile");
                document.getElementById("boardPlay").append(tile);
            }
        }
    }

    function selectNumber() 
    {
        if (nunSelected != null) 
        {
            nunSelected.classList.remove("number-select");    
        }
        nunSelected = this;
        nunSelected.classList.add("number-select");
    }

    function selectTile() 
    {
        if (nunSelected) 
        {
            if (this.innerText != '') 
            {
                return;    
            }  
            let coords = this.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            if (solution[r][c] == nunSelected.id) 
            {
                this.innerText = nunSelected.id;     
            }
            else
            {
                erros += 1;
                document.getElementById("error").innerText = `Erros:${erros}`;
            }
        }    
    }