import React, { useState, useEffect } from 'react'
import { Stats, Selectors, Graph, StatsLabel, Splash } from './components'
import { fetchStats, fetchSeasonStats } from './api'
import styles from './App.module.css'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme } from "@material-ui/core/styles";
import classes from './App.module.css'
import { makeStyles } from '@material-ui/core/styles'

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    }
  }
})

const LightTheme = {
  mainColor: 'rgb(248, 247, 247)',
  secondaryColor: "#282c36",
  textColor: 'black',
  graphColor: '#dbd8ce',
  labelColor: '#82807a',
  blue: 'blue',
  red: 'red',
  green: 'green',
}

const DarkTheme = {
  mainColor: '#282c36',
  secondaryColor: "rgb(248, 247, 247)",
  textColor: 'white',
  graphColor: '#afb0b3',
  labelColor: '#edeef0',
  blue: '#50BFE6',
  red: '#FD0E35',
  green: '#66FF66',
}

const themes = {
  light: LightTheme,
  dark: DarkTheme
}

let blueStats = `${props => props.theme.blue}`
console.log(blueStats)

const Outer = styled.div`
  background-color: ${props => props.theme.mainColor};
  padding: 30px 0;
  transition: all .5s ease;
  font-family: 'Poppins', sans-serif;`

const GraphWrapper = styled.div`
  position: relative
  `
const FullPlayerStatsContainer = styled.div`
  border: solid black 3px;
  margin: 0 0 30px;
`

const PlayerStatsContainer = styled.div`
  background-color: ${props => props.theme.mainColor};
  color: ${props => props.theme.secondaryColor};
`

const Player1 = styled.div`
  border-bottom: solid ${props => props.theme.blue};
  
`
const Player2 = styled.div`
  border-bottom: solid ${props => props.theme.red};
`
const Player3 = styled.div`
  border-bottom: solid ${props => props.theme.green};
`

const App = () => {

  const defaultCareerStats = {stats: [{pts: null}], seasons: [2020], name: ''}
  const defaultSeasons = {seasons: ['']}

  const [fetchedSeasonStats1, setFetchedSeasonStats1] = useState([])
  const [fetchedSeasonStats2, setFetchedSeasonStats2] = useState([])
  const [fetchedSeasonStats3, setFetchedSeasonStats3] = useState([])

  const [fetchedSeasonsData1, setFetchedSeasonsData1] = useState(defaultSeasons)
  const [fetchedSeasonsData2, setFetchedSeasonsData2] = useState(defaultSeasons)
  const [fetchedSeasonsData3, setFetchedSeasonsData3] = useState(defaultSeasons)

  const [fetchedCareerStats1, setFetchedCareerStats1] = useState(defaultCareerStats)
  const [fetchedCareerStats2, setFetchedCareerStats2] = useState(defaultCareerStats)
  const [fetchedCareerStats3, setFetchedCareerStats3] = useState(defaultCareerStats)

  const [selectedYear1, setSelectedYear1] = useState('')
  const [selectedYear2, setSelectedYear2] = useState('')
  const [selectedYear3, setSelectedYear3] = useState('')


  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  const CircularProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${loading ? 'none' : 'block'};
  `
  let loadingColor = 'red'

  const handlePlayerChange = async (player, slotSelect) => {
    
    if (slotSelect == 1) loadingColor = theme.blue
    if (slotSelect == 2) loadingColor = theme.red
    if (slotSelect == 3) loadingColor = theme.green
    setLoading(false)


    let fetchedPlayerStats = await fetchStats(player)
    setLoading(true)

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

    fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1].year = fetchedPlayerStats.careerStats.seasons[fetchedPlayerStats.careerStats.seasons.length - 1]

    if (slotSelect === 1) {

      setFetchedSeasonStats1(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData1(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats1(fetchedPlayerStats.careerStats)
      setSelectedYear1(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1].year)
    }
    if (slotSelect === 2) {

      setFetchedSeasonStats2(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData2(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats2(fetchedPlayerStats.careerStats)
      setSelectedYear2(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1].year)

    }
    if (slotSelect === 3) {

      setFetchedSeasonStats3(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1])
      setFetchedSeasonsData3(fetchedPlayerStats.seasonsData)
      setFetchedCareerStats3(fetchedPlayerStats.careerStats)
      setSelectedYear3(fetchedPlayerStats.careerStats.stats[fetchedPlayerStats.careerStats.stats.length - 1].year)

    }  
  } 

  const handleSeasonChange = async (season, id, name, slotSelect) => {
    const fetchedSeasonStats = await fetchSeasonStats(season, id, name)

    if (slotSelect === 1) {
      setFetchedSeasonStats1(fetchedSeasonStats)
      setSelectedYear1(season)
    }
    if (slotSelect === 2) {
      setFetchedSeasonStats2(fetchedSeasonStats)
      setSelectedYear2(season)

    }
    if (slotSelect === 3) {
      setFetchedSeasonStats3(fetchedSeasonStats)
      setSelectedYear3(season)

    }  
  }

    return (
      <ThemeProvider theme={themes[theme]} muiTheme={muiTheme}>
        <Outer className={styles.container}>
          <div className={styles.darkMode}>
            <Splash theme={theme} setTheme={setTheme} />
          </div>
          <div className={styles.mainPart}>
            <FullPlayerStatsContainer >
              <StatsLabel className={styles.grid}/>
              <PlayerStatsContainer className={styles.grid}>
                <Player1 className={styles.player1} >
                  <Stats stats={fetchedSeasonStats1} />
                </Player1>
                <Player2 className={styles.player2}>          
                  <Stats stats={fetchedSeasonStats2} />
                </Player2>
                <Player3 className={styles.player3}>
                  <Stats stats={fetchedSeasonStats3} />
                </Player3>
              </PlayerStatsContainer>
              
            </FullPlayerStatsContainer>
            <div className={styles.selector}>
              <Selectors 
                handlePlayerChange={handlePlayerChange} 
                handleSeasonChange={handleSeasonChange} 
                seasons={fetchedSeasonsData1} 
                theme={themes[theme]}
                muiTheme={muiTheme}
                year={selectedYear1}
                slotSelect={1} />
            </div>
            <div className={styles.selector}> 
              <Selectors 
                handlePlayerChange={handlePlayerChange} 
                handleSeasonChange={handleSeasonChange} 
                seasons={fetchedSeasonsData2} 
                theme={themes[theme]}
                year={selectedYear2}
                slotSelect={2}/>
            </div>
            <div className={styles.selector}> 
              <Selectors 
                handlePlayerChange={handlePlayerChange} 
                handleSeasonChange={handleSeasonChange} 
                seasons={fetchedSeasonsData3} 
                theme={themes[theme]}
                year={selectedYear3}
                slotSelect={3}/>
            </div>
            <GraphWrapper>
              <CircularProgressWrapper>
                <CircularProgress />
              </CircularProgressWrapper>
              <Graph 
                  player1={fetchedCareerStats1} 
                  player2={fetchedCareerStats2} 
                  player3={fetchedCareerStats3}
                  theme={themes[theme]}
                    /> 
                
            </GraphWrapper>
              
          </div>
        </Outer>
      </ThemeProvider>
    );
  
}

export default App;
