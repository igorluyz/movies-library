import { useEffect, useState } from "react";
// Permite pegar a query da URL
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MovieGrid.css"
import Footer from "../components/Footer";

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {

    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);

    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Preenchendo nosso Array topMovies com os filmes.
        setMovies(dados.results);
        // console.log(dados.results)
    }

    // Essa função será executada toda vez que a página for recarregada.
    useEffect(() => {
        // URL MONTADA COM API+PARÂMETRO DA DOCUMENTAÇÃO+API KEY.
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;

        // console.log(topRatedUrl);

        // Passando a URL como parâmetro da nossa função que vai fazer o fetch.
        getSearchedMovies(searchWithQueryURL);

    }, [query])

    return (
        <>
        <div className="container">
        <h2 className="title">Resultados para: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
            {movies.length === 0 && <p>Carregando</p>}
            {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
       </div>
       <Footer/>
       </>
    )
};

export default Search;