"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [dogData, setDogData] = useState([]);
  const api = "https://dog.ceo/api/breeds/list/all";

  useEffect(() => {
    axios.get(api).then((response) => {
      const breed = response.data.message;
      setDogData(breed);
    });
  }, []);

  return (
    <main className="container mx-auto py-8">
      <h2 className="text-2xl text-red-900 uppercase font-bold mb-4 font-sans flex justify-center ">Dog Breeds </h2>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(dogData).map((breed, index) => {
          return (
            <div key={index} className="flex items-center space-x-4">
              <DogImage breed={breed} />
              <h2 className="text-xl font-bold uppercase">{breed}</h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const DogImage = ({ breed }) => {
  const [pic, setPic] = useState("");

  function getDogImage(breedName, subBread = null) {
    axios
      .get(`https://dog.ceo/api/breed/${breedName.toLowerCase()}/images/random`)
      .then((response) => setPic(response.data.message));
  }

  useEffect(() => {
    getDogImage(breed);
  }, [breed]);

  return <img src={pic} className="w-32 h-32 object-cover rounded-lg" alt={`${breed} dog`} />;
};
