const Basket = ({ basket, setBasket }) => {
  return (
    <>
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
                          copy[index].quantity--;
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
                    <span>{article.price * basket[index].quantity} €</span>
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
    </>
  );
};
export default Basket;
