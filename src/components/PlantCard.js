import React, { useState } from "react";

function PlantCard({ plant, onStockClick }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleClick = () => {
    setIsInStock(!isInStock);           
    if (onStockClick) {
      onStockClick(plant.id);            
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button
        onClick={handleClick}
        className={isInStock ? "primary" : ""}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
