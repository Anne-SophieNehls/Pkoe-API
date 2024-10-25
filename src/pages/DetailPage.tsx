import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../lib/api";
import PlaySound from "../components/PlaySound";
import { Pokemon } from "../lib/Interfaces";

export default function DetailPage() {
  const { id } = useParams();

  const pokemonQuery = useQuery<Pokemon>({
    queryKey: ["pokemon", id],

    queryFn: () => getPokemonDetails(id!),
  });

  if (pokemonQuery.isError) {
    return "Sorry, kaputt";
  }

  if (pokemonQuery.isPending) {
    return "Loading...";
  }

  const pokemonData = pokemonQuery.data;
  return (
    <div className="rainbow-border">
      <img
        src={pokemonData.sprites.other?.home.front_default}
        alt={pokemonData.name}
      />
      <h1>
        #{pokemonData.id?.toString().padStart(4, "0")} {pokemonData.name}
      </h1>
      <div className="type-buttons">
        {pokemonData.types.map((type) => (
          <button className={`poke-button ${type.type.name}`}>
            {type.type.name.toUpperCase()}
          </button>
        ))}
      </div>
      <h3>ATTACKS AND MOVEMENTS</h3>
      <div className="moves">
        {pokemonData.moves.map((move) => (
          <button>{move.move.name}</button>
        ))}
      </div>

      <PlaySound audioURL={pokemonData.cries.latest} />
    </div>
  );
}
