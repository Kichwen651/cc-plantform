import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch plants from local API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:5000/plants");
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []); // Run once when the component mounts

  const handleAddPlant = async (newPlant) => {
    try {
      const response = await fetch("http://localhost:5000/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });
      const addedPlant = await response.json();
      setPlants((prevPlants) => [...prevPlants, addedPlant]);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleStockClick = async (id) => {
    const plantToUpdate = plants.find((plant) => plant.id === id);
    const updatedPlant = { ...plantToUpdate, inStock: !plantToUpdate.inStock };

    try {
      await fetch(`http://localhost:5000/plants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlant),
      });

      // Update the state locally after the server update
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === id ? updatedPlant : plant
        )
      );
    } catch (error) {
      console.error("Error updating stock status:", error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Filter plants based on search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm addPlant={handleAddPlant} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} onStockClick={handleStockClick} />
    </main>
  );
}

export default PlantPage;
