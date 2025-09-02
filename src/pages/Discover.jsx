import React, { useEffect, useState } from "react";
import { fetchData } from "../features/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from '../components/SearchBar'
import MoodSelector from '../components/MoodSelector'
import SongList from "../components/SongList";
import { Loader } from "lucide-react";


function Discover() {
  const { data, isloading, error } = useSelector((state) => state.data);
  const songs = data?.data
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("DATA:", data?.data);
  //   console.log("LOADING:", isloading);
  //   console.log("ERROR:", error);
  // }, [data, isloading, error]);

  const onSearch = (query) => {
    // console.log("Searching for:", query);
    dispatch(fetchData(query)); 
  };

  return (
<div className="p-5 min-h-screen w-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
  {error ?<h1 className="text-center">Error : Connect to internet </h1>: null }
<SearchBar onSearch={onSearch}/>
<MoodSelector onSelectMood={onSearch} />
{isloading? <h1 className="text-center">
  <Loader className="animate-spin duration-75 transition-all inline-block mr-2" size={20}/>
  Loading
</h1>:null}
<SongList songs={songs}/>
</div>
  );
}

export default Discover;
