import React, { useState } from "react";

function NewPlantForm({ addPlant }) {
  const [plantForm, setPlantForm] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission

    const newPlant = {
      id: Date.now(), 
      name: plantForm.name,
      image: plantForm.image,
      price: parseFloat(plantForm.price), // Ensure price is a number
    };

    // Pass the new plant object to the parent component
    addPlant(newPlant);

    // Reset the form after submitting
    setPlantForm({
      name: "",
      image: "",
      price: "",
    });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={plantForm.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={plantForm.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={plantForm.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
