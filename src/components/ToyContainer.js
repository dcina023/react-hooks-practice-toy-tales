import React, { useState, useEffect } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy }) {
  const [toyList, setToyList] = useState(toys);

  useEffect(() => {
    setToyList(toys);
  }, [toys]);

  function handleUpdateToy(id) {
    const toyToUpdate = toyList.find((toy) => toy.id === id);

    if (!toyToUpdate) {
      console.error(`Toy with ID ${id} not found`);
      return;
    }
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likes: toyToUpdate.likes + 1,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update Failed!");
        return res.json();
      })
      .then((updatedToy) => {
        setToyList((currentToys) =>
          currentToys.map((toy) =>
            toy.id === updatedToy.id ? updatedToy : toy,
          ),
        );
      });
  }
  return (
    <div id="toy-collection">
      {toyList.map((toy) => (
        <ToyCard
          key={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          onLike={() => handleUpdateToy(toy.id)}
          onDeleteToy={() => onDeleteToy(toy.id)}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
