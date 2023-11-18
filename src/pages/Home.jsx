// Hooks que vamos utilizar
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";
import Footer from "../components/Footer";

const Home = () => {
    // Gerenciando estados dos meus filmes
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Preenchendo nosso Array topMovies com os filmes.
        setTopMovies(dados.results);
        // console.log(dados.results)
    }

    // Essa função será executada toda vez que a página for recarregada.
    useEffect(() => {
        // URL MONTADA COM API+PARÂMETRO DA DOCUMENTAÇÃO+API KEY.
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

        // console.log(topRatedUrl);

        // Passando a URL como parâmetro da nossa função que vai fazer o fetch.
        getTopRatedMovies(topRatedUrl);

    }, [])

    
    return(
        <>
       <div className="container">
        <h2 className="title">Top Filmes 🥇</h2>
        <div className="movies-container">
            {topMovies.length === 0 && <p>Carregando</p>}
            {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
       </div>
       <Footer />
       </>
    ) 
};

export default Home;