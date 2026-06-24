import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function ToysPage() {
  const [isToys, setIsToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((toys) => setIsToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((savedToy) => {
        setIsToys((currentToys) => [...currentToys, savedToy]);
      });
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setIsToys((currentToys) =>
            currentToys.filter((toy) => toy.id !== id),
          );
        }
      })
      .catch((error) => console.error("Delete Failed:", error));
  }

  return (
    <>
      {showForm ?
        <ToyForm onAddToy={handleAddToy} />
      : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={isToys} onDeleteToy={handleDeleteToy} />
    </>
  );
}

export default ToysPage;
