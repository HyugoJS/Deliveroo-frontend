import { FaStar } from "react-icons/fa";

const Meal = ({ meal, basket, setBasket }) => {
  return (
    <div
      className="repas"
      key={index}
      onClick={() => {
        const newBasket = [...basket];
        const existingItemIndex = newBasket.findIndex(
          (item) => item.id === meal.id
        );
        existingItemIndex !== -1
          ? (newBasket[existingItemIndex].quantity += 1)
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
      {meal.picture ? <img src={meal.picture} alt="photo des plats" /> : ""}
    </div>
  );
};
export default Meal;
