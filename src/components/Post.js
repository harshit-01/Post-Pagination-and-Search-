import Navbar from './Navbar'
import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Cards from './Cards'
import './Post.css'

export default function Post({searchVal}) {
  const [info,setInfo] = useState([]);
  const [visible,setVisible] = useState(3);
  const [currentPage,setCurrentPage] = useState(1);
  const [itemsPerRow,setPagePerRow] = useState(3);
  const [show,setShow] = useState(false);
  const [pgShow,setPgShow] = useState(false);
  const [pageNumLimit,setPageNumLimit] = useState(3);
  const [maxPageNumLimit,setMaxPageNumLimit] = useState(3);
  const [minPageNumLimit,setMinPageNumLimit] = useState(1);
  const [filterArray,setFilterArray] = useState([])
  useEffect(()=>{
      const fetchData = async()=>{
      const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setInfo(data);
      setFilterArray(data);
      setPgShow(true)
      }
      fetchData();
  },[])
  // console.log(searchVal)
  useEffect(()=>{
    // debugger;
    if(searchVal){
      console.log(info.data)
      const temp = info && info.data && info.data.filter((val)=>{
        let value = val.title.toLowerCase();
        console.log(value)
        if(value.search(searchVal) != -1){
            return val;
        }
      });
      if(temp && temp.length>0){
        const arr = [];
        arr.data = temp;
        setInfo(arr);
      }
    }
    else{
      setInfo(filterArray);
    }
  },[searchVal])
  const currentIndex = useRef();
  console.log(info)
  const changeSize = ()=>{
     if(info && info.data && (info.data.length >= visible +3)){
        setVisible(visible+3);
     }
     else{
       alert("No more cards present in the list");
     }
  }
  const lastIndexItem = currentPage*itemsPerRow;
  const firstItem = lastIndexItem-itemsPerRow;
  const currentItems = info && info.data? info.data.slice(firstItem,lastIndexItem):null;
  const totalPost = info && info.data? info.data.length:0;
  const paginate = [];
  for(let i=1;i<Math.ceil(totalPost/itemsPerRow);i++){
      paginate.push(i);
  }
  const handleClick = (e)=>{
     e.preventDefault();
     console.log(e.target.id)
     setCurrentPage(Number(e.target.id?e.target.id:1));
  }
  const handleNext = ()=>{
    setCurrentPage(currentPage+1);
    if(currentPage+1 >maxPageNumLimit){
      if(maxPageNumLimit + pageNumLimit > info.data.length){
        setMaxPageNumLimit(100);
        setMinPageNumLimit(97);
      }
      else{
      setMaxPageNumLimit(maxPageNumLimit+pageNumLimit);
      setMinPageNumLimit(minPageNumLimit+pageNumLimit);
      }
    }
 }
  const handlePrev = ()=>{
    if(currentPage-1 >=1){
      setCurrentPage(currentPage-1);
    }
    if(currentPage-1 < minPageNumLimit){
      if(minPageNumLimit - pageNumLimit <= 0 ){
        setMaxPageNumLimit(3);
        setMinPageNumLimit(1);
      }
      else{
      setMaxPageNumLimit(maxPageNumLimit-pageNumLimit);
      setMinPageNumLimit(minPageNumLimit-pageNumLimit);
      }
    }
  }
  return (
    <div className="container">
        <div className="row">
            {show && info && info.data?
            info.data.slice(0,visible).map((val)=>{
              console.log(val);
              return(
              <div className="col-12 col-md-4 p-2 mt-1">
                <Cards pgShow={false} val={val} posts={currentItems}/>
              </div>
              )
            })
            :null}
        </div>
        <div className="row">
          <div className="fw-bold mt-2">Total Posts Found: {info && info.data ? info.data.length : 0}</div>
            {pgShow && info && info.data?
            currentItems.map((val)=>{
              return(
              <div className="col-12 col-md-4 p-2 mt-1">
                <Cards pgShow={true} val={""} posts={val} />
              </div>
              )
            })
            :null}
        </div>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"
        className="d-flex justify-content-center">
          <div className="border border-primary" className="btn-group me-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-outline-primary" onClick={handlePrev}>Prev</button>
          {paginate.map((i,ind)=>{
              if(i>=minPageNumLimit && i<=maxPageNumLimit){
                return (
                  <>
                    <button key={ind} id={i} ref={currentIndex} type="button" className={`btn btn-outline-primary ${(currentPage===i)?'curButton':''}`} onClick={handleClick}>{i}</button>
                  </>
                )
              }
              else{
                return null;
              }
              })}
            <button type="button" class="btn btn-outline-primary"
            onClick={handleNext}>Next</button>
          </div>
        </div>
        <div className="d-flex justify-content-center fw-bold">Or</div>
        <div className="d-flex justify-content-center">
        <Button variant="outlined" color="info" onClick = {()=>{
          changeSize();
          setShow(true);
          setPgShow(false);
        }} className="mb-3 mt-2">Load More</Button>
        </div>
    </div>
  );
}

