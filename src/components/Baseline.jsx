const Baseline = ({ data }) => {
  return (
    <div className="baseline">
      <div>
        <h1>{data.restaurant.name}</h1>
        <p>{data.restaurant.description}</p>
      </div>
      <div>
        {" "}
        <img src={data.restaurant.picture} alt="baseline-img" />
      </div>
    </div>
  );
};
export default Baseline;
