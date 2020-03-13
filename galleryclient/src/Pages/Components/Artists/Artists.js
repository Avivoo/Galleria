import React, { useState, useEffect } from "react";
import { apiHost } from "../../Common/config";

const Artists = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArt = async () => {
      setLoading(true);
      fetch(`${apiHost}getArtists`).then(response =>
        response.json().then(response => {
          if (response) {
            setArtists(response);
            setLoading(false);
          } else {
            alert("whoops");
          }
        })
      );
    };
    fetchArt().catch(console.error);
  }, []);


 let whatiwant = artists.pop();

  if (loading) {
    return <h2>Loading</h2>;
  }

  return <div className="wrapper">{whatiwant}</div>;
};

export default Artists;
