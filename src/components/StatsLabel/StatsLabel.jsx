import React from 'react'
import styles from './StatsLabel.module.css'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'

const Stats = () => {




return (
        <div className={styles.container}>
            <div className={`${styles.stat} ${styles.name}`}>NAME</div>
            <div className={styles.stat}>YEAR</div>
            <div className={styles.stat}>GP</div>
            <div className={styles.stat}>MP</div>
            <div className={styles.stat}>FG</div>
            <div className={styles.stat}>FGA</div>
            <div className={styles.stat}>FG%</div>
            <div className={styles.stat}>3P</div>
            <div className={styles.stat}>3PA</div>
            <div className={styles.stat}>3P%</div>
            <div className={styles.stat}>FT</div>
            <div className={styles.stat}>FTA</div>
            <div className={styles.stat}>FT%</div>
            <div className={styles.stat}>ORB</div>
            <div className={styles.stat}>DRB</div>
            <div className={styles.stat}>TRB</div>
            <div className={styles.stat}>AST</div>
            <div className={styles.stat}>STL</div>
            <div className={styles.stat}>BLK</div>
            <div className={styles.stat}>TOV</div>
            <div className={styles.stat}>PF</div>
            <div className={`${styles.stat} ${styles.pts}`}>PTS</div>
        </div>
    )

}

export default Stats