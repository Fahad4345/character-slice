"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const totalPages = 207;
  const visiblePages = 6;
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
 const [character, setCharacter] = useState([]);


  function handleNext() {
    if (startPage < totalPages) {
      setStartPage(startPage + 1);
      setStartchar(startcharacter + 4);
      setEndChar(endCharacter + 4);
    }
  }
  function handleprev() {
    if (startPage > 0) {
      setStartPage(startPage - 1);
      setStartchar(startcharacter - 4);
      setEndChar(endCharacter - 4);
    }
  }

  const pages = [];
  for (let i = 0; i <= totalPages && visiblePages; i++) {
    pages.push(startPage + i);
  }

  function handleNext() {
    if (startPage + visiblePages - 1 < totalPages) {
      setStartPage(startPage + 1);
      setStartchar(startcharacter + 4);
      setEndChar(endCharacter + 4);
    }
  }

  function handleprev() {
    if (startPage > 1) {
      setStartPage(startPage - 1);
      setStartchar(startcharacter - 4);
      setEndChar(endCharacter - 4);
    }
  }


  useEffect(() => {
    GetCharacter();
  }, []);

  async function GetCharacter() {
      console.log(currentPage);
    let charOnPage = 4;
    let char = [];
    let startchar = (currentPage * charOnPage) - (charOnPage - 1);
    for (let i = startchar; i <= startchar + 3; i++) {
      char.push(i);
   
    }
  
  
    
    const response = await fetch(`https://rickandmortyapi.com/api/character/${char.join(",")}`);
    const data = await response.json();
    setCharacter(data);
  
  }
  return (
    <div className=" flex justify-center  px-[96px] py-[32px]">
      <div className="max-w-[900px] w-full  ">
        <div className=" flex flex-col mb-[28px]">
          <h1 className="text-[36px] font-medium leading-[40px] mb-[8px]">
            Character
          </h1>
          <h1 className="text-[20px] text-black font-medium ">
            Ricky and Morty API Slice
          </h1>
        </div>
        <div className=" flex flex-row justify-between">
          <button
            className="bg-black text-white px-6 py-3  rounded-[8px]"
            onClick={handleprev}
          >
            Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => {
                GetCharacter();
                setCurrentPage(page);
                
              }}
              className="px-4 py-2 rounded bg-black text-white"
            >
              {page}
            </button>
          ))}

          <button
            className="bg-black text-white px-6 py-3  rounded-[8px]"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        <div className=" grid  grid-cols-2 gap-28px">
          {character.map((char) => (
            <Link key={char.id}  href={`/character/${char.id}`}>
              <div
                key={char.id}
                className=" flex gap-[20px] p-[16px] rounded-[8px] cursor-pointer"
              >
                <Image
                  src={char.image}
                  alt=""
                  className=" w-full"
                  width={720}
                  height={600}
                />
                <div>
                  <p className="font-bold text-[24px]">{char.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
