import React, {useEffect, useState} from 'react';
import './App.css';
import useMousePosition from "./stuff/UseMousePosition";
import usePrefersReducedMotion from "./stuff/UsePrefersReducedMotion";

function App() {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = usePrefersReducedMotion();
  const MaxX = window.innerWidth - (25 / 100) * window.innerWidth;
  const transformCup = prefersReducedMotion ? undefined : `translate(${mousePosition.x! < MaxX ? mousePosition.x : MaxX}px)`;

  const fallingItemMaxX = window.innerWidth - (10 / 100) * window.innerWidth;

  const [coffeeBeanPozX, setCoffeeBeanPozX] = useState(Math.floor(Math.random() * (window.innerWidth - 10 + 1)) + 5);
  const [coffeeBeanPozY, setCoffeeBeanPozY] = useState(Math.floor(Math.random() * (0 - (-49) + 1)) + (-49));
  const transformCoffeeBean = `translate(${coffeeBeanPozX < fallingItemMaxX ? coffeeBeanPozX : fallingItemMaxX}px, ${coffeeBeanPozY}px)`

  const [milkPozX, setMilkPozX] = useState(Math.floor(Math.random() * (window.innerWidth - 10 + 1)) + 5);
  const [milkPozY, setMilkPozY] = useState(Math.floor(Math.random() * (0 - (-49) + 1)) + (-49));
  const transformMilk = `translate(${milkPozX}px, ${milkPozY}px)`

  useEffect(() => {
    const interval = setInterval(() => {
      if(coffeeBeanPozY > window.innerHeight) {
        setCoffeeBeanPozY(Math.floor(Math.random() * (0 - (-49) + 1)) + (-49));
        setCoffeeBeanPozX(Math.floor(Math.random() * (window.innerWidth - 10 + 1)) + 5);
      } else {
        setCoffeeBeanPozY(coffeeBeanPozY + 50);
      }

      if(milkPozY > window.innerHeight) {
        setMilkPozY(Math.floor(Math.random() * (0 - (-49) + 1)) + (-49));
        setMilkPozX(Math.floor(Math.random() * (window.innerWidth - 10 + 1)) + 5);
      } else {
        setMilkPozY(milkPozY + 50);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [coffeeBeanPozY, milkPozY]);

  return (<div>

    <div className="falling-item coffee-bean" style={{transform: transformCoffeeBean}}></div>
    <div className="falling-item milk" style={{transform: transformMilk}}></div>
    <div className="cup" style={{transform: transformCup}}></div>
  </div>);
}

export default App;
