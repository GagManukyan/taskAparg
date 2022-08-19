import {useState} from "react";
import ResultSearch from "./ResultSearch";
import "./index.css"
function Search () {
    const [basket,setBasket] = useState([])
    const [result,setResult] = useState("")
    const [finallyResult,setFinallyResult] = useState([])
    const [group,setGroup] = useState([])
    let link = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=${result}
    &api_key=bc8b3586ed22b3ac7896449c77cf0be6&per_page=6"`
    let splitRes = result.split(" ")
    function splitImg (a) {
     let arr = finallyResult.filter((elem) => {
         if (elem[0] !== a){
             return true
         }else {
             setGroup((prev) => [...prev,...[elem]])
         }
     })
       setFinallyResult(arr)
        if (arr.length === 0){
            alert("Victory")
        }
        console.log(group)
    }
    function getRandomNumber () {
        let arr = []
        for (let i = 0 ; i < splitRes.length;i++){
            let c = Math.floor(Math.random() * (6))
            arr.push(c)
        }
        let sum = arr.reduce((previousValue, currentValue) => previousValue + currentValue)

        if (sum === 6 && arr.includes(0) !== true){
            return arr
        }else {
            return   getRandomNumber()
        }
    }
    function moreThanOneWord () {
        if (splitRes.length <7){
            let arr = []
            let num = getRandomNumber()
            console.log(num)
            splitRes.forEach((e,i) => {
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=${splitRes[i]}
                &api_key=bc8b3586ed22b3ac7896449c77cf0be6&per_page=${num[i]}"`)
                .then(response => response.json())
                .then((data) =>{
                    data.photos.photo.forEach((elem) => {
                        arr = [...arr,[`https://live.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}_q.jpg`,splitRes[i]]]
                    })
                    setFinallyResult(arr)
                })
                setBasket(splitRes)
            })}else{
            alert("too many words limit 6 :(")
        }
    }
    function searchImg () {
        if (result.length > 0 && splitRes.length < 2){
            fetch(link)
                .then(response => response.json())
                .then(data => {
                    let img = data.photos.photo.map((elem) => {
                        return [`https://live.staticflickr.com/${elem.server}/${elem.id}_${elem.secret}_q.jpg`,result]
                    })
                    setFinallyResult(img)
                    setBasket(splitRes)
                } )
        }
        else if(splitRes.length > 1){
            moreThanOneWord()
        }
        else{
            alert(`Please Type Text In Input :)`)
        }
    }
    return(
        <div className="globalDivSerach">
            <div className="formul">
                <input type="text" className="input-1" onChange={(e) => {setResult(e.target.value)}}/>
                <button  type="submit" onClick={searchImg} className="button-1">Search</button>
            </div>
            <ResultSearch result={finallyResult}  basket={basket} splitFunc={splitImg} group={group}/>
        </div>
    )
}


export default Search
