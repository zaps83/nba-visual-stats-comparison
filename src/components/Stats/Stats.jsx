import React from 'react'
import styles from './Stats.module.css'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'




const Stats = (props) => {
if (!props.stats) {
    return 'Data Unavailable'
}

let color
if (props.slotSelect == 1) color = props.theme.blue
if (props.slotSelect == 2) color = props.theme.red
if (props.slotSelect == 3) color = props.theme.green

const StatsContainer = styled.div`
    background-color: ${props.stats.pts ? props.theme.statsBackground : color}
`

const Stat = styled.div`
    border-right: ${props.stats.pts ? 'solid' : ''} black 1px;
`

let seasonStats = JSON.parse(JSON.stringify(props.stats))

return (
        <StatsContainer className={`${styles.container} ${styles.flashit}`}>
            <Stat className={`${styles.stat} ${styles.name}`}>{seasonStats.name}</Stat>
            <Stat className={styles.stat}>{seasonStats.year}</Stat>
            <Stat className={styles.stat}>{seasonStats.games_played}</Stat>
            <Stat className={styles.stat}>{seasonStats.min}</Stat>
            <Stat className={styles.stat}>{seasonStats.fgm}</Stat>
            <Stat className={styles.stat}>{seasonStats.fga}</Stat>
            <Stat className={styles.stat}>{seasonStats.fg_pct}</Stat>
            <Stat className={styles.stat}>{seasonStats.fg3m}</Stat>
            <Stat className={styles.stat}>{seasonStats.fg3a}</Stat>
            <Stat className={styles.stat}>{seasonStats.fg3_pct}</Stat>
            <Stat className={styles.stat}>{seasonStats.ftm}</Stat>
            <Stat className={styles.stat}>{seasonStats.fta}</Stat>
            <Stat className={styles.stat}>{seasonStats.ft_pct}</Stat>
            <Stat className={styles.stat}>{seasonStats.oreb}</Stat>
            <Stat className={styles.stat}>{seasonStats.dreb}</Stat>
            <Stat className={styles.stat}>{seasonStats.reb}</Stat>
            <Stat className={styles.stat}>{seasonStats.ast}</Stat>
            <Stat className={styles.stat}>{seasonStats.stl}</Stat>
            <Stat className={styles.stat}>{seasonStats.blk}</Stat>
            <Stat className={styles.stat}>{seasonStats.turnover}</Stat>
            <Stat className={styles.stat}>{seasonStats.pf}</Stat>
            <div className={`${styles.stat} ${styles.pts} ${styles.finalStat}`}>{seasonStats.pts}</div>
        </StatsContainer>
    )

}

export default Stats