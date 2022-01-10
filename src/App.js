import './App.css';
import Navbar from './components/Navbar'
import Post from './components/Post'
import axios from 'axios';
import {useState} from  "react";


function App() {
  const [searchVal,setSearchVal] = useState("");
  const searchBar= (val)=>{
    console.log(val)
    setSearchVal(val);
  }
  return (
    <div>
        <Navbar searchBar ={searchBar}/>
        <Post searchVal={searchVal}/>
    </div>
  );
}

export default App;
