"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Index() {
  let [movies, setMovies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios("/api/search/search-address", {
        params: {
          address: "ت",
        },
      });
      console.log(response);
    };
    getData();
  }, []);

  return (
    <ul>
      {/* {movies.map((movie: any) => (
        <li key={movie.id}>
          {movie.name} ({movie.year})
        </li>
      ))} */}
    </ul>
  );
}
