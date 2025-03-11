import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo.png";
import { FaStar } from "react-icons/fa";
import Header from "./components/Header";
import Baseline from "./components/Baseline";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  // const [quantity, setQuantity] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-back--fc7nwyvb2r4r.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
    // console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="container">
      <header>
        <img src={logo} alt="" />
      </header>

      {/*  */}
      <main>
        <Baseline data={data} />
        {/*  */}
        <div className="container">
          <div className="left-body">
            {data.categories.map((category, index) => {
              return (
                <>
                  <div>
                    {category.meals.length > 0 && (
                      <div key={index} className="category-tab">
                        <div>
                          <h2>{category.name}</h2>
                        </div>
                        <div key={index} className="meal-list">
                          {category.meals.map((meal, index) => {
                            return (
                              <>
                                <div
                                  className="repas"
                                  key={index}
                                  onClick={() => {
                                    const newBasket = [...basket];
                                    const existingItemIndex =
                                      newBasket.findIndex(
                                        (item) => item.id === meal.id
                                      );
                                    existingItemIndex !== -1
                                      ? (newBasket[
                                          existingItemIndex
                                        ].quantity += 1)
                                      : newBasket.push({
                                          ...meal,
                                          quantity: 1,
                                        });

                                    setBasket(newBasket);
                                    // console.log(basket);
                                  }}
                                >
                                  <div className="repas-text">
                                    <h3>{meal.title}</h3>
                                    <p>{meal.description.slice(0, 59)}</p>
                                    <div className="price-and-popular">
                                      <p>{meal.price}€</p>
                                      <span>
                                        {meal.popular && (
                                          <p>
                                            <FaStar />
                                            Populaire
                                          </p>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  {meal.picture ? (
                                    <img
                                      src={meal.picture}
                                      alt="photo des plats"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div className="right-body">
            <button className={basket.length > 0 ? "activated" : "off"}>
              Valider mon panier
            </button>
            {basket.length > 0 ? (
              <div className="basket-container">
                <div className="basket-items">
                  {basket.map((article, index) => {
                    return (
                      <>
                        <div className="basket-line">
                          <div>
                            {/* gerer les boutons */}
                            <button>-</button>
                            {basket[index].quantity}
                            <button>+</button>
                          </div>
                          <span>{article.title}</span>
                          <span>
                            {article.price * basket[index].quantity} €
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="basket-result">
                  {/* sous-total, frais */}
                  <div>
                    <p>Sous-total</p>

                    {/* <p>{article.price}</p> */}
                  </div>
                  <div>
                    <p>Frais de livraison </p>
                    <p>{2.5}€</p>
                  </div>
                </div>
                <div className="basket-total">{/* total */}</div>
              </div>
            ) : (
              <p className="empty-basket">Votre panier est vide</p>
            )}
            {/* ici, mapper le panier. Le contenu du panier doit apparaitre, 
            en mettant des onclick sur les plats, stocket les plats clickés dans le state Basket, 
            et mapper ce state  */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
