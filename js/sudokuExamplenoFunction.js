var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

window.onload = function() {
    setGame();
}
function setGame() 
{ 
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
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}