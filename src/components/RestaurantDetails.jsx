export const RestaurantDetails = ({
  image: url,
  name: title,
  cuisine,
  cost,
  rating,
  reviews,
  votes,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        marginBottom: "10px",
        marginTop: "5px",
        // border: "1px solid black",
        width: "420px",
  
      }}
    >
      <div style={{ marginRight: "15px" }}>
        <img width="70px" src={url} alt="" />
      </div>
      <div style={{ marginRight: "15px" }}>
        <div>{title}</div>
        <div>{cuisine}</div>
        <div>Cost ₹{cost} for one</div>
      </div>
      <div>
        <div>{rating}</div>
        <div>{votes} votes</div>
        <div>{reviews} reviews</div>
      </div>
    </div>
  );
};
