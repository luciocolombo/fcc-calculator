import { React, useState } from "react";

function App() {
   const [display, setDisplay] = useState("0");
   const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
   const operators = ["+", "-", "*", "/"];

   const handleNumber = (event) => {
      const number = event.target.textContent;
      if (display === "0") return setDisplay(number);
      const displayArray = display.trim().split(" ");
      const lastSymbol = displayArray.pop();
      const isLastSymbolZero = lastSymbol === "0";
      if (isLastSymbolZero) return setDisplay((prev) => prev.trim().slice(0, -1) + number);
      return setDisplay((prev) => prev + number);
   };

   const handleOperation = (event) => {
      const operation = event.target.textContent;
      const displayArray = display.trim().split(" ");
      const lastSymbol = displayArray.pop();
      const isLastSymbolOperation = operators.includes(lastSymbol);
      const secondLastSymbol = displayArray[displayArray.length - 2];
      const isSecondLastSymbolOperation = operators.includes(secondLastSymbol);
      if (isLastSymbolOperation) {
         if (operation !== "-" && !isSecondLastSymbolOperation) {
            return setDisplay((prev) => prev.trim().slice(0, -2) + " " + operation + " ");
         }
         if (lastSymbol === "-") {
            if (operation === "-") return;
            if (isSecondLastSymbolOperation) {
               console.log({ secondLastSymbol, isSecondLastSymbolOperation });
               return setDisplay((prev) => prev.trim().slice(0, -5) + " " + operation + " ");
            }
         }
      }
      setDisplay((prev) => prev + " " + operation + " ");
   };

   const handleEquals = () => {
      const displayArray = display.trim().split(" ");
      const lastSymbol = displayArray.pop();
      if (operators.includes(lastSymbol) || lastSymbol === ".") return;
      setDisplay((prev) => {
         const prevArray = prev
            .split(" ")
            .map((symbol) => parseFloat(symbol, 10) || symbol)
            .join("");
         return String(eval(prevArray));
      });
   };

   const handleAC = () => {
      setDisplay("0");
   };

   const handleDecimal = () => {
      const lastSymbol = display.trim().split(" ").pop();
      if (lastSymbol.includes(".") || operators.includes(lastSymbol)) return;
      setDisplay((prev) => prev + ".");
   };

   const toText = (num) => {
      return {
         0: "zero",
         1: "one",
         2: "two",
         3: "three",
         4: "four",
         5: "five",
         6: "six",
         7: "seven",
         8: "eight",
         9: "nine",
         "+": "add",
         "-": "subtract",
         "*": "multiply",
         "/": "divide",
      }[num];
   };
   return (
      <div className="App d-flex justify-content-center align-items-center ">
         <div className="mainDiv w-50 container bg-secondary">
            <h1 id="display">{display}</h1>
            <div className="col-3">
               {numbers.map((num) => (
                  <button className="col-4" id={toText(num)} key={num} onClick={handleNumber}>
                     {num}
                  </button>
               ))}
               {operators.map((op) => (
                  <button className="col-4" id={toText(op)} key={op} onClick={handleOperation}>
                     {op}
                  </button>
               ))}
               <button id="decimal" className="col-4" onClick={handleDecimal}>
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
