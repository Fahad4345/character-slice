"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function Home() {
   
  const totalPages = 207;
  const visiblePages = 6;
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [character, setCharacter] = useState([]);
      const pages = [];


  function handleNext() {
    if (startPage <= totalPages) {
       setStartPage(startPage + 1);
      setCurrentPage(startPage+1)
      console.log(startPage)
 
     
    }
  }
  function handleprev() {
    if (startPage > 1) {
         setStartPage(startPage - 1);
      setCurrentPage(startPage - 1)
    }
  }
  const handlePageClick = (page) => {
    
    if (page <= totalPages) {
        setStartPage(page);
      setCurrentPage(page);
   
  
    } 
    else {
        alert("Page Exceded")
    }
  };

  for (let i = 0; i < visiblePages; i++) {
      
    const page = startPage + i;
       if (page <= totalPages) {
         pages.push(page);
         
    }
  }
  console.log(pages[3])
 
  useEffect(() => {
    GetCharacter();
  }, [currentPage]);

  async function GetCharacter() {
    let charOnPage = 4;
    let char = [];
    let startchar = (currentPage * charOnPage) - (charOnPage-1);

    for (let i=startchar; i<=startchar + 3; i++) {
      char.push(i);
    }

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${char}`
    );
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
        <div className=" flex flex-row justify-between items-center mb-[20px]">
          {startPage !== 1 &&  <button
            disabled={startPage === 1}
            className="bg-black text-white px-6 py-3  rounded-[8px]"
            onClick={() => {
              handleprev();
             
            }}
          >
            Previous
          </button>} 
          <div className="  flex max-w-fit mx-auto gap-[20px]">
            {pages.map((page, index) => (
               
        
            <button
              key={page}
              onClick={() => {
                handlePageClick(page);
             
              }}
              className={`p-3 rounded-[8px]  hover:cursor-pointer font-medium ${ index === 3 ?  ' bg-black text-white' :'text-black   bg-gray-300  }'}`}>
              {page}
            </button>
          ))}</div>
          { startPage !== totalPages && <button
            
            className="bg-black text-white px-6 py-3  rounded-[8px]"
            onClick={() => { handleNext();  }}
          >
            Next
          </button>
        }
          </div>

        <div className=" grid  grid-cols-2 gap-[28px]">
          {character.map((char) => (
            <Link key={char.id} href={`/character/${char.id}`}>
              <div
                key={char.id}
                className=" flex gap-[20px] p-[16px] w-full rounded-[8px] cursor-pointer bg-[#F3F4F6]"
              >
                <Image
                  src={char.image}
                  alt=""
                  className="  max-w-[300px] w-full "
                  width={720}
                  height={600}
                />
                <div className="w-full">
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
