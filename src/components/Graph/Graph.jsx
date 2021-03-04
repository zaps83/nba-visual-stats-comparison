import React, { useState } from 'react'
import styles from './Graph.module.css'
import { Line, Bar } from 'react-chartjs-2'
import { FormControl, Select, MenuItem, InputLabel  } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styled from 'styled-components'



const Graph = (props) => {

    const [newStat, setNewStat] = useState('pts')

    let careerStats1 = JSON.parse(JSON.stringify(props.player1))
    let careerStats2 = JSON.parse(JSON.stringify(props.player2))
    let careerStats3 = JSON.parse(JSON.stringify(props.player3))

    const handleStatChange = (newStat) => {
        setNewStat(newStat)
      }

    let LineChart = chart()

    function chart() {
        if (careerStats1.stats.length > 1 || careerStats2.stats.length > 1 || careerStats3.stats.length > 1) {
            function fillIn(careerStats, stat) {
                let n = 2020 - careerStats.seasons[0]
                for (let i = 0; i < n; i++) {
                  if (careerStats.seasons[i] + 1 != careerStats.seasons[i + 1]) {
                    careerStats.seasons.splice(i + 1, 0, careerStats.seasons[i] + 1)
                    careerStats.stats.splice(i + 1, 0, {[stat]: null})
                }
              }
              return careerStats
            }
            
            careerStats1 = fillIn(careerStats1, newStat)
            careerStats2 = fillIn(careerStats2, newStat)
            careerStats3 = fillIn(careerStats3, newStat)            
            
            let max = Math.max(careerStats1.stats.length, careerStats2.stats.length, careerStats3.stats.length)
            
            function extend(careerStats, stat) {
              careerStats.seasons.reverse()
              careerStats.stats.reverse()
              for (let i = 0; i < max; i++) {
                if (careerStats.seasons[i] == undefined) {
                  careerStats.seasons[i] = careerStats.seasons[i - 1] - 1
                  careerStats.stats[i] = {[stat]: null}
                }
              }
              careerStats.seasons.reverse()
              careerStats.stats.reverse()
              careerStats.data = careerStats.stats.map(seasonStats => seasonStats[stat])
              if (stat == 'min') {
                  careerStats.data = careerStats.data.map(time => {
                      if (time == null) {
                          return null
                      }
                      time = time.split(':')
                      return (Number(time[0]) + Number(time[1] / 60)).toFixed(2)
                  })
              }
              return careerStats
            }
            
            careerStats1 = extend(careerStats1, newStat)
            careerStats2 = extend(careerStats2, newStat)
            careerStats3 = extend(careerStats3, newStat)

            return ((<Line className={styles.lineChart} 
                data={{
                    labels: careerStats1.seasons,
                    datasets: [{
                        data: careerStats1.data,
                        label: careerStats1.name,
                        borderColor: `${props.theme.blue}`,
                        fill: true,
                    }, {
                        data: careerStats2.data,
                        label: careerStats2.name,
                        borderColor: `${props.theme.red}`,
                        fill: true,
                    }, {
                        data: careerStats3.data,
                        label: careerStats3.name,
                        borderColor: `${props.theme.green}`,
                        fill: true,
                    }],
                }}
                options={{
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: `${props.theme.graphColor}`
                            },
                            ticks: {
                                fontColor: `${props.theme.labelColor}`
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Season',
                                fontColor: `${props.theme.secondaryColor}`
                            }
                        }], 
                        yAxes: [{
                            gridLines: {
                                color: `${props.theme.graphColor}`
                            },
                            ticks: {
                                fontColor: `${props.theme.labelColor}`
                            },
                            scaleLabel: {
                                display: true,
                                labelString: `${newStat}`,
                                fontColor: `${props.theme.secondaryColor}`
                            }
                        }], 
                    },
                    legend: {
                        labels: {
                            fontColor: `${props.theme.textColor}`
                        }
                    }
                }}
            />)
            )
        } else if (careerStats1.name != '' || careerStats2.name != '' || careerStats3.name != '') {
            return ((<Bar
                data={{
                    labels: [careerStats1.name, careerStats2.name, careerStats3.name],
                    datasets: [{
                        label: '2020',
                        backgroundColor: [`${props.theme.blue}`, `${props.theme.red}`, `${props.theme.green}`],
                        data: [careerStats1.stats[0][newStat], careerStats2.stats[0][newStat], careerStats3.stats[0][newStat]]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `2020 Rookie Year Stats`},
                }}

            />))
        } else {
            return ((<Line
                data={{
                    labels: careerStats1.seasons,
                    datasets: [{
                        data: careerStats1.stats,
                        label: careerStats1.name,
                        borderColor: `${props.theme.blue}`,
                        fill: true,
                    }, {
                        data: careerStats2.stats,
                        label: careerStats2.name,
                        borderColor: `${props.theme.red}`,
                        fill: true,
                    }, {
                        data: careerStats3.stats,
                        label: careerStats3.name,
                        borderColor: `${props.theme.green}`,
                        fill: true,
                    }]
                }
                
            }
            />)
            )
        }
    }

    const selectorsTheme = createMuiTheme({
        palette: {
          primary: {
            main: `${props.theme.textColor}`
          }
        }
      })

      const useStyles = makeStyles((styles) => ({
        InputLabel:  {
          color: `${props.theme.textColor}`, 
        },
        Select: {
          color: `${props.theme.textColor}`
        }
      }))
    
      const classes = useStyles()

      const StatText = styled.div`
        color: ${props.theme.textColor};
        font-family: 'Poppins'
      `
        
    return (
        <div className={styles.graph}>
            <div className={styles.statPick}>
                <StatText className={styles.statText} >GRAPH BY </StatText>
                <ThemeProvider theme={selectorsTheme}>
                    <FormControl className={styles.formControl}>
                        <InputLabel className={classes.InputLabel} id='stat-select-label'></InputLabel>
                        <Select 
                            color='primary' 
                            defaultValue='pts' 
                            onChange={(event) => handleStatChange(event.target.value)}
                            className={classes.Select}>
                            <MenuItem labelId='stat-select-label' value={'games_played'}>GP</MenuItem>
                            <MenuItem value={'min'}>MP</MenuItem>
                            <MenuItem value={'fgm'}>FG</MenuItem>
                            <MenuItem value={'fga'}>FGA</MenuItem>
                            <MenuItem value={'fg_pct'}>FG%</MenuItem>
                            <MenuItem value={'fg3m'}>3P</MenuItem>
                            <MenuItem value={'fg3a'}>3PA</MenuItem>
                            <MenuItem value={'fg3_pct'}>3P%</MenuItem>
                            <MenuItem value={'ftm'}>FT</MenuItem>
                            <MenuItem value={'fta'}>FTA</MenuItem>
                            <MenuItem value={'ft_pct'}>FT%</MenuItem>
                            <MenuItem value={'oreb'}>ORB</MenuItem>
                            <MenuItem value={'dreb'}>DRB</MenuItem>
                            <MenuItem value={'reb'}>TRB</MenuItem>
                            <MenuItem value={'ast'}>AST</MenuItem>
                            <MenuItem value={'stl'}>STL</MenuItem>
                            <MenuItem value={'blk'}>BLK</MenuItem>
                            <MenuItem value={'turnover'}>TOV</MenuItem>
                            <MenuItem value={'pf'}>PF</MenuItem>
                            <MenuItem value={'pts'}>PTS</MenuItem>
                        </Select>
                    </FormControl> 
                </ThemeProvider>
            </div>
            {LineChart}
        </div>
    )
}

export default Graph