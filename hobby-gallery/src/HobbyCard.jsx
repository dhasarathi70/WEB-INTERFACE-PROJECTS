import "./HobbyCard.css";

function HobbyCard(props) {
  return (
    <div className="hobby-card">

      <img
        src={props.image}
        alt={props.hobbyName}
        className="hobby-image"
      />

      <div className="hobby-content">

        <h2>{props.hobbyName}</h2>

        <p>{props.description}</p>

      </div>

    </div>
  );
}

export default HobbyCard;