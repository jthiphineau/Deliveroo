import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Meal({
    title,
    description,
    popular,
    price,
    picture,
    selectedProducts,
    setSelectedProducts
  }) {
    return (
        <div
          className="meal-container"
          onClick={() => {
            const copy = [...selectedProducts];
            let isProductFound = false;
            for (let i = 0; i < copy.length; i++) {
              if (copy[i].title === title) {
                copy[i].quantity++;
                isProductFound = true;
              }
            }
            if (isProductFound === false) {
              copy.push({ title: title, quantity: 1, price: price });
            }
            setSelectedProducts(copy);
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{title}</p>
          <div className="meal-description">
            <p className="text-description">{description}</p>
          </div>
          <div className="meal-horizontal">
              <p>{price}€</p>
              {popular && (
                <p>
                  <FontAwesomeIcon icon="star" style={{ color: "orange"}} /> Populaire
                </p>
              )}
            </div>
          </div>
          {picture && (
            <img src={picture} alt={title} style={{ objectFit: "cover" }} />
          )}
        </div>
      );
};

export default Meal;