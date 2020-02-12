import React from "react";
import Meal from "./Meal";

function Category(props) {
    return (
      <>
    <h3>{props.name}</h3>
    <div className="meals-container">
      {props.meals.map((meal, index) => {
        return (
          <Meal
            {...meal}
            setSelectedProducts={props.setSelectedProducts}
            selectedProducts={props.selectedProducts}
          />
        );
      })}
    </div>
  </>
);
};

export default Category;
