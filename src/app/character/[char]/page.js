"use client";
import { useParams } from "next/navigation";
import React, {useState,useEffect } from "react";
import Image from "next/image";

export default function CharacterInfo() {
  let {char} = useParams();
  console.log(char);
    const [character, setCharacter] = useState("");

  useEffect(() => {
    async function GetCharacter() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${char}`
    );
    const data = await response.json();
    setCharacter(data);
    console.log(data);
  }
    GetCharacter()
  },[]);
  return (
    <div>
      <h1 className=" mb-[24px] text-[40px]">Character Detail</h1>
      {character && ( <div className="flex flex-row gap-[20px] justify-center">
        <Image
          src={character.image}
          alt=""
          className="max-w-[300px]"
          width={720}
          height={600}
        />
        <div className="flex flex-col gap-[5px]">
          <p className=" text-[24px]"> Name: {character.name}</p>
          <p className=" text-[24px]"> Gender: {character.gender}</p>
          <p className="text-[24px]"> Species: {character.species}</p>
          <p className="text-[24px]"> Status: {character.status}</p>
          <p className="text-[24px]"> Location: {character.location.name}</p>
        </div>
      </div>
      )}
        
      
          </div>
  );
}
