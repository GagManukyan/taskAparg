import {useEffect, useState} from "react";
import "./index.css"
function ResultSearch (props) {
    const [compare,setCompare] = useState("a")
    const [compareTwo,setCompareTwo] = useState("c")
    const [data,setData] = useState([])
    const splitImg = props.splitFunc
    useEffect(() => {
        if (compare === compareTwo.align){
            setCompareTwo("c")
            setCompare("a")
            splitImg(compareTwo.src)
            }
    },[compare,compareTwo])
    function viewGroup (e) {
       let arr = props.group.filter((elem) => {
           if (elem[1] === e){
               return true
           }
       })
        setData(arr)
    }
    function dragOverHandler(e,) {
        e.preventDefault()
    }
    function dropHandler(e){
        e.preventDefault()
        viewGroup()
        setCompare(e.target.innerText)

    }
    function dragStartHandler(e) {
        setCompareTwo(e.target)
    }

    return(
                <div>
                    <div className="center">
                        {props.result.map((elem,i) =>{
                            return<div onDragStart={(e) => dragStartHandler(e)} key={i} draggable={true}  className="product"  >
                                <img className="productImg"  src={elem[0]} align={elem[1]} alt={i} />
                            </div>})}
                    </div>
                    <div>
                        <div className="baskets">
                            {props.basket.map((e,i) => {return <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) =>dropHandler(e)}
                                key={i}
                                className="basket"
                                onClick={(e) => {viewGroup(e.target.innerText)}}>{e}</div>})}
                        </div>
                    </div>
                    <div className="center">
                                {data.map((e,i) => {
                                  return  <div  key={i}  className="product"  >
                                        <img className="productImg" alt="X"  src={e[0]} />
                                             </div>
                                })}
                    </div>
                </div>

            )
    }

export default ResultSearch