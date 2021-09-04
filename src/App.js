import React, { useState } from 'react';

import axios from "axios";

const App = () => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     playerName: null,
  //     playerStats: {}
  //   }
  // }
  const [playerName, setPlayerName] = useState(null)
  const [playerStats, setPlayerStats] = useState('')
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    getPlayerId()
    console.log(playerName)
  }

  const handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      setPlayerName(replace)
    } else {
      alert("Please type players name!")
    }
  }

  const getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
      .then(async res => {
        console.log(res.data.data)
        setPlayerStats(res.data.data)
        if (res.data.data[0] === undefined) {
          alert("This player is either injured or hasn't played yet!")
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!")
        } else {
          await setName(res.data.data[0].id)
          setName(res.data.data)
          console.log(res.data.data[0].id)
        }
      }).catch(err => {
        console.log(err)
      })
  }

  console.table(playerStats)

  const getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`)
      .then(async res => {
        console.log(res.data.data)

        setPlayerStats(res.data.data)
      }).catch(err => {
        console.log(err)
        getPlayerStats()
      })
  }




  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            // value={event}
            onChange={handleChange}
            placeholder="please enter players name"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      games played: {playerStats.first_name}
      <br />
      points averaged: {playerStats["pts"]}
      <br />
      rebounds averaged: {playerStats["reb"]}
      <br />
      assists averaged: {playerStats["ast"]}

    </div>
  );

}
export default App;
