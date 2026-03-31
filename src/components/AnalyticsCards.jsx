import {
  totalMonthlyInflow,
  totalDailyHours,
  availableHoursPerDay,
} from '../utils/analytics'
import styles from './AnalyticsCards.module.css'

export default function AnalyticsCards({ projects }) {
  const inflow = totalMonthlyInflow(projects)
  const daily = totalDailyHours(projects)
  const avail = availableHoursPerDay(projects)

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>Monthly Inflow</div>
        <div className={`${styles.value} ${styles.green}`}>
          ₹{inflow.toLocaleString('en-IN')}
        </div>
        <div className={styles.sub}>
          across {projects.length} project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.label}>Avg. Daily Hours</div>
        <div className={`${styles.value} ${styles.amber}`}>{daily}h</div>
        <div className={styles.sub}>based on current load</div>
      </div>

      <div className={styles.card}>
        <div className={styles.label}>Free Capacity</div>
        <div className={`${styles.value} ${styles.accent}`}>{avail}h</div>
        <div className={styles.sub}>available daily (of 8h)</div>
      </div>

      <div className={styles.card}>
        <div className={styles.label}>Active Projects</div>
        <div className={styles.value}>{projects.length}</div>
        <div className={styles.sub}>
          {projects.filter((p) => p.type === 'retainer').length} retainer ·{' '}
          {projects.filter((p) => p.type === 'onetime').length} one-time
        </div>
      </div>
    </div>
  )
}
