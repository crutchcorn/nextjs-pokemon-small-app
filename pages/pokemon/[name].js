import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from '../../styles/pokemon-entry.module.css';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  const title = `Pokedex: ${pokemon.name}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back"></button>
      <img className={styles.pokeImage} src={pokemon.image} alt={`${pokemon.name} picture`} />
      <div className={styles.infoContainer}>
        <h1 className={styles.header}>No. {pokemon.id}: {pokemon.name}</h1>
        <table className={styles.pokeInfo}>
          <tbody>
            <tr>
              <th>Types</th>
              <td>{pokemon.types}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{pokemon.height}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{pokemon.weight}</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.flavor}>{pokemon.flavorText}</p>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  const resJson = await res.json();
  const pokemons = resJson.results;

  return {
    paths: pokemons.map(({ name }) => ({
      params: { name },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { name } = context.params
  const [pokemon, species] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(res => res.json())
  ])

  return {
    props: {
      pokemon: {
        id: pokemon.id,
        image: pokemon.sprites.front_default,
        name: capitalize(pokemon.name),
        height: pokemon.height,
        weight: pokemon.weight,
        flavorText: species.flavor_text_entries[0].flavor_text,
        types: pokemon.types.map(({ type }) => type.name).join(', ')
      },
    },
  }
}