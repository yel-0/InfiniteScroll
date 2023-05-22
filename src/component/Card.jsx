import React from "react";

const Card = ({ image, name, gender, status }) => {
  return (
    <div className="card  w-96 mb-5 bg-white">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl  " />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{gender}</p>
        <div className="card-actions">
          <button className="btn btn-primary">{status}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
