"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Main() {
  return (
    <div className=" flex items-center  w-full mx-auto flex-col ">
      <h1>Ricky and Morty Character</h1>
      <Link href={`${1}`}>
        <p>Click to go to Character page</p>
      </Link>
    </div>
  );
}
