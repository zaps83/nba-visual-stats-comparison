import React, { useState, useEffect } from 'react'
import styles from './Selectors.module.css'
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchTeams, fetchPlayers } from '../../api'

const Selectors = (props) => {

  const [fetchedTeams, setFetchedTeams] = useState([])
  const [fetchedPlayers, setFetchedPlayers] = useState([])

  useEffect(() => {
      const fetchAPI = async () => {
        setFetchedTeams(await fetchTeams())
      }

      fetchAPI();
  }, [])

  const handleTeamChange = async (team) => {
    if (!team) {
      return
    }

    const fetchedRoster = await fetchPlayers(team)
    setFetchedPlayers(fetchedRoster)
  }

    return (
        <div className={styles.container}>
         <FormControl className={`${styles.formControl} ${styles.teamSelect}`}>
            <NativeSelect defaultValue='' placeholder='Teams' onChange={(event) => handleTeamChange(event.target.value)}>
              <option>--Select a Team--</option>
               {fetchedTeams.map((team, i) => <option key={i} value={team.teamId}>{team.fullName}</option>)}
            </NativeSelect>
        </FormControl>

          <FormControl className={`${styles.formControl} ${styles.playerSelect}`}>
            <NativeSelect defaultValue='' placeholder='Players' onChange={(event) => props.handlePlayerChange(event.target.value, props.slotSelect)}>
                <option value=''>--Select a Player--</option>
                {fetchedPlayers.map((player, i) => <option key={i} value={player.firstName + '0' + player.lastName}>{player.firstName} {player.lastName}</option>)}
            </NativeSelect>
        </FormControl> 
        <FormControl className={`${styles.formControl} ${styles.seasonSelect}`}>
            <NativeSelect defaultValue='2020' onChange={(event) => props.handleSeasonChange(event.target.value, props.seasons.id, props.seasons.name, props.slotSelect)}>
                {props.seasons.seasons.map((season, i) => <option key={i} value={season}>{season}</option>).reverse()}
            </NativeSelect>
        </FormControl> 

        </div>
    )
}

export default Selectors