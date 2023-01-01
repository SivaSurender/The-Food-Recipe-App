import React from "react";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedItem, setSearchedItem] = useState([]);
  const params = useParams();
  const getSearchedItem = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );

    const recipes = await data.json();

    setSearchedItem(recipes.results);

    console.log(searchedItem);
  };

  useEffect(() => {
    getSearchedItem(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedItem ? (
        searchedItem.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })
      ) : (
        // <Card>
        <p>Sorry the item doesn't exist</p>
        // </Card>
      )}
      {/* {searchedItem.map((item) => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        );
      })} */}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
