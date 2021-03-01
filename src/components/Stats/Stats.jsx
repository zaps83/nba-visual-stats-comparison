import React from 'react'
import styles from './Stats.module.css'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'

const Stats = (props) => {
if (!props.stats) {
    return 'Data Unavailable'
}

let seasonStats = JSON.parse(JSON.stringify(props.stats))

return (
        <div className={styles.container}>
            <div className={`${styles.stat} ${styles.name}`}>{seasonStats.name}</div>
            <div className={styles.stat}>{seasonStats.year}</div>
            <div className={styles.stat}>{seasonStats.games_played}</div>
            <div className={styles.stat}>{seasonStats.min}</div>
            <div className={styles.stat}>{seasonStats.fgm}</div>
            <div className={styles.stat}>{seasonStats.fga}</div>
            <div className={styles.stat}>{seasonStats.fg_pct}</div>
            <div className={styles.stat}>{seasonStats.fg3m}</div>
            <div className={styles.stat}>{seasonStats.fg3a}</div>
            <div className={styles.stat}>{seasonStats.fg3_pct}</div>
            <div className={styles.stat}>{seasonStats.ftm}</div>
            <div className={styles.stat}>{seasonStats.fta}</div>
            <div className={styles.stat}>{seasonStats.ft_pct}</div>
            <div className={styles.stat}>{seasonStats.oreb}</div>
            <div className={styles.stat}>{seasonStats.dreb}</div>
            <div className={styles.stat}>{seasonStats.reb}</div>
            <div className={styles.stat}>{seasonStats.ast}</div>
            <div className={styles.stat}>{seasonStats.stl}</div>
            <div className={styles.stat}>{seasonStats.blk}</div>
            <div className={styles.stat}>{seasonStats.turnover}</div>
            <div className={styles.stat}>{seasonStats.pf}</div>
            <div className={`${styles.stat} ${styles.pts}`}>{seasonStats.pts}</div>
        </div>
    )

}

export default Stats