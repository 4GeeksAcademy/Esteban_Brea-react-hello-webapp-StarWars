import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const LearnMore = () => {
  const { type, uid } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await response.json();
      data.result &&
        data.result.properties &&
        setDetails(data.result.properties);
    };
    fetchDetails();
  }, [type, uid]);
  const imageType = type === "people" ? "characters" : type;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${uid}.jpg`;
  const excludedKeys = ["url", "homeworld", "edited", "created"];
  return (
    <div className="container d-flex align-items-start p-4 gap-3">
      <img
        src={imageUrl}
        alt={details?.name}
        style={{
          width: "300px",
          height: "400px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
        onError={(e) =>
          (e.target.src =
            "https://starwars-visualguide.com/assets/img/placeholder.jpg")
        }
      />
      <div className="flex-grow-1">
        <h1 className="border-bottom pb-2">{details?.name}</h1>
        <div className="text-secondary mb-2">
          {details &&
            Object.entries(details)
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, " ")}:</strong> {value}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
