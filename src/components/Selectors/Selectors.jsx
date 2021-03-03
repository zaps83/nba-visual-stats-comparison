import React, { useState, useEffect } from 'react'
import styles from './Selectors.module.css'
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { fetchTeams, fetchPlayers } from '../../api'
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'



const Selectors = (props) => {
  console.log('props', props)


  const [fetchedTeams, setFetchedTeams] = useState([])
  const [fetchedPlayers, setFetchedPlayers] = useState([])
  const [teamOpen, setTeamOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const useStyles = makeStyles((styles) => ({
    FormControl: {
      color: 'pink'
    },
    InputLabel:  {
      color: `${teamOpen ? 'transparent' : props.theme.textColor }`, 
    },
    Select: {
      color: `${props.theme.textColor}`
    }
  }))

  const classes = useStyles()

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

  const handleTeamClose = () => {
    setTeamOpen(false)
  }

  const handleTeamOpen = () => {
    setTeamOpen(true)
  }

  const handlePlayerClose = () => {
    setPlayerOpen(false)
  }

  const handlePlayerOpen = () => {
    setPlayerOpen(true)
  }

  const handleYearClose = () => {
    setYearOpen(false)
  }

  const handleYearOpen = () => {
    setYearOpen(true)
  }

    return (
        <div className={styles.container}>
          <FormControl color='primary' className={`${styles.formControl} ${styles.teamSelect} ${classes.FormControl}`}>
              <InputLabel 
                className={classes.InputLabel} 
                id='team-select-label' 
                variant='standard'>Select a Team</InputLabel>
              <Select 
                labelId='open-select-label'
                id='open-select'
                open={teamOpen} 
                
                onClose={handleTeamClose} 
                onOpen={handleTeamOpen} 
                className={`${styles.myNativeSelect} ${classes.Select}`}  
                onChange={(event) => 
                handleTeamChange(event.target.value)}>
                {fetchedTeams
                  .map((team, i) => <MenuItem key={i} value={team.teamId}>{team.fullName}</MenuItem>)}
              </Select>
          </FormControl>

          <FormControl className={`${styles.formControl} ${styles.playerSelect}`}>
            <InputLabel className={classes.InputLabel} id='player-select-label'>Select a Player</InputLabel>
            <Select 
              labelId='player-select-label' 
              open={playerOpen} 
              onClose={handlePlayerClose} 
              onOpen={handlePlayerOpen} 
              onChange={(event) => props.handlePlayerChange(event.target.value, props.slotSelect)}>
                {fetchedPlayers
                  .map((player, i) => <MenuItem key={i} value={player.firstName + '0' + player.lastName}>{player.firstName} {player.lastName}</MenuItem>)}
            </Select>
        </FormControl> 
        <FormControl className={`${styles.formControl} ${styles.seasonSelect}`}>
            <InputLabel className={classes.InputLabel} id='year-select-label'>Select Year</InputLabel>
            <Select 
                labelId='year-select-label' 
                value={props.year}
                open={yearOpen} 
                onClose={handleYearClose} 
                onOpen={handleYearOpen} 
                onChange={(event) => props.handleSeasonChange(event.target.value, props.seasons.id, props.seasons.name, props.slotSelect)}>
                {props.seasons.seasons
                  .map((season, i) => <MenuItem key={i} value={season}>{season}</MenuItem>).reverse()}
            </Select>
        </FormControl> 

        </div>
    )
}

export default Selectors