import { React, useState } from "react";

function App() {
   const [display, setDisplay] = useState("0");
   const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
   const operators = ["+", "-", "*", "/"];

   const handleNumber = (event) => {
      const number = event.target.textContent;
      if (display === "0") return setDisplay(number);
      return setDisplay((prev) => prev + number);
   };

   const handleOperation = (event) => {
      //handle dual operators
      //handle - after * and /
      const operation = event.target.textContent;
      setDisplay((prev) => prev + " " + operation + " ");
   };

   const handleEquals = () => {
      setDisplay(eval);
   };

   const handleAC = () => {
      setDisplay("0");
   };

   const handleDecimal = () => {
      const lastSymbol = display.split(" ").pop();
      if (lastSymbol.includes(".") || !operators.includes(lastSymbol)) return;
      setDisplay((prev) => prev + ".");
   };
   return (
      <div className="App d-flex justify-content-center align-items-center ">
         <div className="mainDiv w-50 container bg-secondary">
            <h1>{display}</h1>
            <div className="col-3">
               {numbers.map((num) => (
                  <button className="col-4" id={num} key={num} onClick={handleNumber}>
                     {num}
                  </button>
               ))}
               {operators.map((op) => (
                  <button className="col-4" key={op} onClick={handleOperation}>
                     {op}
                  </button>
               ))}
               <button id="." className="col-4" onClick={handleDecimal}>
                  .
               </button>
               <button className="col-4" id="equals" onClick={handleEquals}>
                  =
               </button>
               <button className="col-8" id="clear" onClick={handleAC}>
                  AC
               </button>
            </div>
         </div>
      </div>
   );
}

export default App;
