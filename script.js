

const container = document.querySelector('.container');

//placing squares
let box =[];
for(let i=0;i<=8;i++)
{
   box[i] = document.createElement('div')
   box[i].classList.add('box');
   box[i].setAttribute('id', "q"+i);
   container.appendChild(box[i]);
}

const success =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//grabbing all the boxes
const grid = () => Array.from(document.getElementsByClassName('box'));

//getting the index
const getIndex = (qe) => Number.parseInt(qe.id.replace("q",""));
const empty = () => grid().filter(q => q.innerText === "");
const allSame = (arr) => arr.every(qe1 => qe1.innerText ===  arr[0].innerText && qe1.innerText !== "")


const endgame = (W_Sequence) => {
    W_Sequence.forEach(e => e.classList.add('winner'));
    disableEvents();
    if(W_Sequence[0].innerText==="X" && W_Sequence[1].innerText==="X" && W_Sequence[2].innerText === "X")
    {
        alert("Congragulations, you won the game!!")
    }
    else if(W_Sequence[0].innerText==="O" && W_Sequence[1].innerText==="O" && W_Sequence[2].innerText === "O")
    {
        alert("Sorry, the opponent won the game!!")
    }
    else
    {
        alert("Match draw, initiate a new one..")
    }
 }

const victory = () =>{
    let victory = false;
    success.forEach((e) => {
        const _grids = grid()
        const sequence = [_grids[e[0]],_grids[e[1]],_grids[e[2]]];
        if(allSame(sequence))
        {
            victory = true;
            endgame(sequence);
        }
    })
    return victory;
}

const occupied = () => grid().forEach((q) =>{
  if(q.innerText != "")
  {
      q.classList.add('o')
      disableEvents();
  }
})

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => getIndex(empty()[Math.floor(Math.random() * empty.length)])

// filtering the boxes that are empty

const opponentTurn = () =>
{  disableEvents();
    setTimeout(()=>{
        takeTurn(opponentChoice(),"O")
        occupied()
        if(!victory())
        enableEvents();
    },3000)
}

const clickFn = function($event){
    takeTurn(getIndex($event.target),"X");
    occupied()
    
    if(!victory())
    { 
        opponentTurn();
    }

}

const enableEvents = () => grid().forEach(q => q.addEventListener('click', clickFn))
const disableEvents = () => grid().forEach(q => q.removeEventListener('click', clickFn))

enableEvents();