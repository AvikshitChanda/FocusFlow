import ClockLoader from "react-spinners/ClockLoader";
import './App.css';
import { useEffect, useState } from "react";
import MyTimer from "./Timer";

function App() {
  const [Loading,setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2500)
  },[])

  return (
    <div className="App">
      {Loading?(
         <ClockLoader
         color={' #fff'}
         loading={Loading}
         size={110}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
      ):
              
        <MyTimer/>
      

      }
    </div>
        
  );
}

export default App;
