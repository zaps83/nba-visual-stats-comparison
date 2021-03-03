import React, { useState } from 'react'
import styles from './Graph.module.css'
import { Line, Bar } from 'react-chartjs-2'
import { NativeSelect, FormControl } from '@material-ui/core';

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

            return ((<Line
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
                    }]
                }}
                options={{
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: `${props.theme.graphColor}`
                            },
                            ticks: {
                                fontColor: `${props.theme.labelColor}`
                            }
                        }], 
                        yAxes: [{
                            gridLines: {
                                color: `${props.theme.graphColor}`
                            },
                            ticks: {
                                fontColor: `${props.theme.labelColor}`
                            }
                        }], 
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
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: careerStats2.stats,
                        label: careerStats2.name,
                        borderColor: 'red',
                        fill: true,
                    }, {
                        data: careerStats3.stats,
                        label: careerStats3.name,
                        borderColor: 'green',
                        fill: true,
                    }]
                }
                
            }
            />)
            )
        }
    }
        
    return (
        <div className={styles.graph}>
             <FormControl className={styles.formControl}>
                <NativeSelect defaultValue='pts' onChange={(event) => handleStatChange(event.target.value)}>
                    <option value={'games_played'}>GP</option>
                    <option value={'min'}>MP</option>
                    <option value={'fgm'}>FG</option>
                    <option value={'fga'}>FGA</option>
                    <option value={'fg_pct'}>FG%</option>
                    <option value={'fg3m'}>3P</option>
                    <option value={'fg3a'}>3PA</option>
                    <option value={'fg3_pct'}>3P%</option>
                    <option value={'ftm'}>FT</option>
                    <option value={'fta'}>FTA</option>
                    <option value={'ft_pct'}>FT%</option>
                    <option value={'oreb'}>ORB</option>
                    <option value={'dreb'}>DRB</option>
                    <option value={'reb'}>TRB</option>
                    <option value={'ast'}>AST</option>
                    <option value={'stl'}>STL</option>
                    <option value={'blk'}>BLK</option>
                    <option value={'turnover'}>TOV</option>
                    <option value={'pf'}>PF</option>
                    <option value={'pts'}>PTS</option>
                </NativeSelect>
            </FormControl> 

            {LineChart}
        </div>
    )
}

export default Graph