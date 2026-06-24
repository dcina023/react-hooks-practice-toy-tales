import React from "react";

function ToyCard({ name, image, likes, onDeleteToy, onLike }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={""} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={onLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={onDeleteToy}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
