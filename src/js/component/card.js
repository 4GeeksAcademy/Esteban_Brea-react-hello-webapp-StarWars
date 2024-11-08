import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Card = ({ data, type }) => {
  const { store, actions } = useContext(Context);
  const imageType =
    type === "people" /* swapi = "people" */
      ? "characters" /* visualguide = "characters" */
      : type;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${data.uid}.jpg`;
  const navigate = useNavigate();

  const handleFavorite = () => {
    const isFavorite = store.favorites.some(
      (fav) => fav.uid === data.uid && fav.type === type
    );
    isFavorite
      ? actions.removeFromFavorites(data.uid, type)
      : actions.addToFavorites({ uid: data.uid, name: data.name, type });
  };

  return (
    <div className="card m-2 rounded-3 overflow-hidden">
      <img
        src={imageUrl}
        alt={data.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) =>
          (e.target.src =
            "https://starwars-visualguide.com/assets/img/placeholder.jpg")
        }
      />
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <h5 className="card-title">{data.name}</h5>
        <div className="mt-4">
          <button
            onClick={() => navigate(`/details/${type}/${data.uid}`)}
            className="btn btn-outline-primary btn-sm mb-2"
            style={{ width: "100%" }}
          >
            Learn more!
          </button>
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleFavorite}
            style={{ width: "100%", marginTop: "5px" }}
          >
            <FontAwesomeIcon
              icon={
                store.favorites.some(
                  (fav) => fav.uid === data.uid && fav.type === type
                )
                  ? solidHeart
                  : regularHeart
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
