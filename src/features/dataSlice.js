import { createSlice } from "@reduxjs/toolkit";





const initialState = {
   data : [],
   isloading : false ,
   error : null
}

const dataSlice = createSlice({
    name : "data",
    initialState,
    reducers :{
        fetchDataStart : (state)=>{
          state.isloading = true ;
          state.error = "";
          
        },
        fetchDataSuccess : (state,action)=>{
          state.isloading = false ;
          state.error = null ;
          state.data = action.payload ;
        },
        fetchDataFailure : (state,action)=>{
           state.isloading = false ;
           state.error = action.payload
        }
    }
})

export const {fetchDataStart,fetchDataSuccess,fetchDataFailure} = dataSlice.actions;

export const fetchData = (query)=> async(dispatch)=>{
  dispatch(fetchDataStart());
  try {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
        query
      )}`;

    const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "b2cbd240dbmshd1e5d43c405eda5p164b15jsn319647e4a3a7",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(fetchDataSuccess(result))

  } catch (error) {
    dispatch(fetchDataFailure(error));
  }

} 

export default dataSlice.reducer