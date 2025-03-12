import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Header from "./components/Header";
import Baseline from "./components/Baseline";
import Meal from "./components/Meal";
import Basket from "./components/Basket";
import "./App.css";

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
  // la fonction doit parcourir tout les éléments du tableau, et additioner toute les clés article.price
  const sumBasketItems = () => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      // console.log(basket[i].price);
      total += Number(basket[i].price * basket[i].quantity);
    }
    return total;
  };

  // sumBasketItems();
  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="container">
      <Header />

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
                                {/* <Meal
                                  meal={meal}
                                  basket={basket}
                                  setBasket={setBasket}
                                /> */}
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
                            <button
                              onClick={() => {
                                const copy = [...basket];
                                if (copy[index].quantity !== 1) {
                                  copy[index].quantity--;
                                } else {
                                  copy.splice(index, 1);
                                }

                                setBasket(copy);
                              }}
                            >
                              -
                            </button>
                            {basket[index].quantity}
                            <button
                              onClick={() => {
                                const copy = [...basket];
                                copy[index].quantity++;
                                setBasket(copy);
                              }}
                            >
                              +
                            </button>
                            {console.log(basket[index].quantity)}
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
                    <p>{sumBasketItems().toFixed(2)}€</p>

                    {/* <p>{article.price}</p> */}
                  </div>
                  <div>
                    <p>Frais de livraison </p>
                    <p>{2.5}€</p>
                  </div>
                </div>
                <div className="basket-total">
                  {/* total */}
                  <p>Total</p>
                  <p>{sumBasketItems() + 2.5}€</p>
                </div>
              </div>
            ) : (
              <p className="empty-basket">Votre panier est vide</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
