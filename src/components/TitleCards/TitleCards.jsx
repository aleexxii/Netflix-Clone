import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";




function TitleCards({title, category}) {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTBjM2Y3MjdmNjZiZWJlYWYwOTIwNGYzMGJmNjEyNiIsIm5iZiI6MTczNDUwMjU3Ny4yOTQwMDAxLCJzdWIiOiI2NzYyNjhiMTE2MWFiN2RlYzVmZmRiY2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zmYkQSRw4qY5QDocfp3EB5wtr_4pDuFuHrhch0chEsA'
    }
  };
  
 

const handleWheel = (e) => {
  e.preventDefault()
  cardsRef.current.scrollLeft += e.deltaY
}

useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

cardsRef.current.addEventListener('wheel', handleWheel)
},[])

  return (
    <div className="title-cards">
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
