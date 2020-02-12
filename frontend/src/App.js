import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/deliveroo.svg";
import Category from "./components/Category";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faHome } from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faHome);


function App() {
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState([0]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-jt.herokuapp.com/"
      );
      setData(response.data);
      setCategories(response.data.categories);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      {isLoading ? (
        <p>En cour de chargement...</p>
      ) : (
        <div>
          <div className="header">
            <div className="wrapper">
              <img className="logo" src={logo} alt="logo-Deliveroo" />
            </div>
          </div>

          <div className="wrapper">
            <div className="restaurant-info">
              <div>
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt={data.restaurant.name} />
            </div>
          </div>

          <div className="grey-back">
            <div className="wrapper">
              <div className="restaurant-details">
                <div className="meals">
                  {categories.map((category, index) => {
                    if (category.meals.length === 0) {
                      return null;
                    }
                    return (
                      <Category
                        setSelectedProducts={setSelectedProducts}
                        selectedProducts={selectedProducts}
                        name={category.name}
                        meals={category.meals}
                      />
                    );
                  })}
                </div>
                  <div className="basket">
                    <button className="valider">Valider mon panier</button>
                  {selectedProducts.map(selectedProduct => {
                    return (
                      <div>
                        <p>{selectedProduct.title}</p>
                        <button className="button"
              onClick={() => {
                const newQuantity = [...quantity];
                newQuantity[quantity]--;

                newQuantity[quantity] = newQuantity[quantity] -1;
                setQuantity(newQuantity);
              }}
            >
            -
            </button>
                        <p>{selectedProduct.quantity}</p>
                        <button className="button"
              onClick={() => {
                const newQuantity = [...quantity];
                newQuantity[selectedProduct.quantity]++;

                newQuantity[selectedProduct.quantity] = newQuantity[selectedProduct.quantity] +1;
                setQuantity(newQuantity);
              }}
            >
            +
            </button>
                        <p>{selectedProduct.price}€</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
