"use client";
import { useState, useEffect } from "react";

export default function Index() {
  let [movies, setMovies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/addresses");
      const data = await response.json();
      console.log(data);
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
