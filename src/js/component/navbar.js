import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="ms-5"
          width="50"
          height="50"
          src="https://img.icons8.com/ios/100/star-wars.png"
          alt="star-wars"
        />
      </Link>
      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle me-5"
          type="button"
          id="favoritesDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites {store.favorites.length}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end favorites-dropdown"
          aria-labelledby="favoritesDropdown"
        >
          {store.favorites.length === 0 ? (
            <li className="dropdown-item">Empty</li>
          ) : (
            store.favorites.map((item, index) => (
              <li
                key={index}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/details/${item.type}/${item.uid}`}
                  className="text-decoration-none"
                >
                  {item.name}
                </Link>
                <button
                  className="btn ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.removeFromFavorites(item.uid, item.type);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
