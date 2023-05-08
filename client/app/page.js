"use client";
import Image from 'next/image'
import {useEffect, useState} from "react";
import axios from "axios";
export default function Home() {
  const [Data,setData]=useState({})
  useEffect(()=>{
    axios.get("/api/").then((data)=>{
      setData((data));
      console.log(data)
    })

  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {Data.data}
    </main>
  )
}
