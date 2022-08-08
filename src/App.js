import { useState } from "react";
import blackPawn from "./assets/icons/bpawn.svg";
import blackRook from "./assets/icons/brook.svg";
import blackKnight from "./assets/icons/bknight.svg";
import blackBishop from "./assets/icons/bbishop.svg";
import blackKing from "./assets/icons/bking.svg";
import blackQueen from "./assets/icons/bqueen.svg";
import whitePawn from "./assets/icons/wpawn.svg";
import whiteRook from "./assets/icons/wrook.svg";
import whiteKnight from "./assets/icons/wknight.svg";
import whiteBishop from "./assets/icons/wbishop.svg";
import whiteKing from "./assets/icons/wking.svg";
import whiteQueen from "./assets/icons/wqueen.svg";

const initialData = [
  [
    {
      icon: blackRook
    },
    {
      icon: blackKnight
    },
    {
      icon: blackBishop
    },
    {
      icon: blackQueen
    },
    {
      icon: blackKing
    },
    {
      icon: blackBishop
    },
    {
      icon: blackKnight
    },
    {
      icon: blackRook
    },
  ],
  [...Array(8)].map(()=>({
    icon: blackPawn
  })),
  ...[...Array(4)].map(()=>
  [...Array(8)].map(()=>({
    icon: null
  }))
  ),
  [...Array(8)].map(()=>({
    icon: whitePawn
  })),
  [
    {
      icon: whiteRook
    },
    {
      icon: whiteKnight
    },
    {
      icon: whiteBishop
    },
    {
      icon: whiteKing
    },
    {
      icon: whiteQueen
    },
    {
      icon: whiteBishop
    },
    {
      icon: whiteKnight
    },
    {
      icon: whiteRook
    },
  ]   
]



const App = () => {

  const [data,setData] = useState(initialData);

  const [activeColumn,setActiveColumn] = useState({
    i: null,
    j:null,
  });

  const move = (i,j)=>{
    setData(prev=>{
      let newData = [...prev];

      let newRowMov = [...newData[i]];
      newRowMov[j] = {icon: prev[activeColumn.i][activeColumn.j].icon};
      newData[i] = newRowMov;

      let newRow = [...newData[activeColumn.i]];
      newRow[activeColumn.j] = {icon: null};
      newData[activeColumn.i] = newRow;
      setActiveColumn({
        i:null,
        j:null
      })
      return [...newData];
    })
  }


  return (
    <div className="App">
      <div className="container">
        {data.map((c,i)=>
          c.map(({icon},j)=>
          <div
            key={i+""+j}
            className="pieces"
            style={{
              backgroundColor: (i + j) % 2 ? "brown" : "white",
              border:( i === activeColumn.i && j === activeColumn.j )? "solid 2px #ff0" : "none"
            }}
            onClick={()=>{
              if(activeColumn.i){
                move(i,j);
                return;
              }
              if(icon) setActiveColumn({i,j})}}
            >
              {icon && <img src={icon} alt="" />}
          </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
