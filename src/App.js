import React, { useState, useEffect } from 'react'
import { Stats, Selectors, Graph, StatsLabel } from './components'
import { fetchStats, fetchSeasonStats } from './api'
import styles from './App.module.css'


const App = () => {

  const defaultCareerStats = {stats: [{pts: null}], seasons: [2020], name: ''}
  const defaultSeasons = {seasons: [2020]}

  const [fetchedSeasonStats1, setFetchedSeasonStats1] = useState([])
  const [fetchedSeasonStats2, setFetchedSeasonStats2] = useState([])
  const [fetchedSeasonStats3, setFetchedSeasonStats3] = useState([])

  const [fetchedSeasonsData1, setFetchedSeasonsData1] = useState(defaultSeasons)
  const [fetchedSeasonsData2, setFetchedSeasonsData2] = useState(defaultSeasons)
  const [fetchedSeasonsData3, setFetchedSeasonsData3] = useState(defaultSeasons)

  const [fetchedCareerStats1, setFetchedCareerStats1] = useState(defaultCareerStats)
  const [fetchedCareerStats2, setFetchedCareerStats2] = useState(defaultCareerStats)
  const [fetchedCareerStats3, setFetchedCareerStats3] = useState(defaultCareerStats)

  const handlePlayerChange = async (player, slotSelect) => {
    if (!player) {
      return
    }

    let fetchedPlayerStats = await fetchStats(player)
    console.log('fetcehdPlayerStats', fetchedPlayerStats)

    if (fetchedPlayerStats.careerStats.seasons.length == 0) {

      if (slotSelect === 1) {
        setFetchedSeasonStats1(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
        setFetchedSeasonsData1(defaultSeasons)
        setFetchedCareerStats1(defaultCareerStats)
      }
      if (slotSelect === 2) {
        setFetchedSeasonsData2(defaultSeasons)
        setFetchedCareerStats2(defaultCareerStats)
      }
      if (slotSelect === 3) {
        setFetchedSeasonsData3(defaultSeasons)
        setFetchedCareerStats3(defaultCareerStats)
      }


      // have a stats unavailable message
      return
    }

    fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1].year = 2020


    if (slotSelect === 1) {

      setFetchedSeasonStats1(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData1(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats1(fetchedPlayerStats.careerStats)
    }
    if (slotSelect === 2) {

      setFetchedSeasonStats2(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData2(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats2(fetchedPlayerStats.careerStats)

    }
    if (slotSelect === 3) {

      setFetchedSeasonStats3(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData3(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats3(fetchedPlayerStats.careerStats)
    }  
  } 

  const handleSeasonChange = async (season, id, name, slotSelect) => {
    const fetchedSeasonStats = await fetchSeasonStats(season, id, name)

    if (slotSelect === 1) {
      setFetchedSeasonStats1(fetchedSeasonStats)
    }
    if (slotSelect === 2) {
      setFetchedSeasonStats2(fetchedSeasonStats)
    }
    if (slotSelect === 3) {
      setFetchedSeasonStats3(fetchedSeasonStats)
    }  
  }


    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          <StatsLabel />
          <div className={styles.player1} >
            <Stats stats={fetchedSeasonStats1} />
          </div>
          <div className={styles.player2}>          
            <Stats stats={fetchedSeasonStats2} />
          </div>
          <div className={styles.player3}>
            <Stats stats={fetchedSeasonStats3} />
          </div>
        </div>
        <div className={styles.selector}>
          <Selectors handlePlayerChange={handlePlayerChange} handleSeasonChange={handleSeasonChange} seasons={fetchedSeasonsData1} slotSelect={1} />
        </div>
        <div className={styles.selector}> 
          <Selectors handlePlayerChange={handlePlayerChange} handleSeasonChange={handleSeasonChange} seasons={fetchedSeasonsData2} slotSelect={2}/>
        </div>
        <div className={styles.selector}> 
          <Selectors handlePlayerChange={handlePlayerChange} handleSeasonChange={handleSeasonChange} seasons={fetchedSeasonsData3} slotSelect={3}/>
        </div>
          <Graph player1={fetchedCareerStats1} player2={fetchedCareerStats2} player3={fetchedCareerStats3} />
       </div>
    );
  
}

export default App;
