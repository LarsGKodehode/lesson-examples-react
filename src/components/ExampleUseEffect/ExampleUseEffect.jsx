import { useEffect, useState } from "react"

import styles from './styles.module.css'

// There are multiple places you can store your API url
// We are storing it here for convenience
const API_URL = "https://pokeapi.co/api/v2/pokemon"


/**
 * This is a generic wrapper around the Fetch API
 */
async function fetchData(url, callback) {
  // First fetch the data
  const response = await fetch(url)

  // Check if fetch suceeded
  if (!response.ok) {
    // Do some error handling here
    console.error("No response from server")
  }

  // Then proceed to parse the JSON to a JavaScript object
  const data = await response.json()

  // Finally call the callback with the data we have
  callback(data)
}

function ExampleUseEffect() {
  // We need somewhere to store our data and ensure React
  // updates the DOM when it changes
  const [data, setData] = useState(null)

  // useEffect takes a callback that will be run whenever
  // the elements in the dependencies array changes
  // There are a couple of caveats so take a look at the documentation
  // when you are working with this one
  // https://beta.reactjs.org/reference/react/useEffect
  useEffect(
    () => {fetchData(API_URL, setData)},
    []
  )

  return (
    <div>
      {/* Just some generic info */}
      <h2>Example useEffect</h2>
      <a href="https://beta.reactjs.org/reference/react/useEffect">React Docs</a>

      {/* Displaying the fetched data when we have it */}
      <div className={styles.list}>
        {
          data &&
          data.results.map(
            (pokemon) => <PokemonCard key={pokemon.name} {...pokemon}/>
          )
        }
      </div>

    </div>
  )
}

/**
 * Due to how this API is structured we have to do another set of fetch request
 * to get all the details
 */
function PokemonCard(props) {
  const {name, url} = props

  const [details, setDetails] = useState(null)

  useEffect(
    () => {fetchData(url, setDetails)},
    []
  )

  return (
    <div className={styles.card}>
      <h4 style={{textTransform: "capitalize"}}>{name}</h4>
      {
        details &&
        <>
          <img src={details.sprites?.front_default} alt={name} />
        </>
      }
    </div>
  )
}

export default ExampleUseEffect