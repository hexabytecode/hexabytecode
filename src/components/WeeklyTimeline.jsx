import { DAYS, TODAY_IDX, weeklyHoursPerDay } from '../utils/analytics'
import styles from './WeeklyTimeline.module.css'

const TARGET = 8

export default function WeeklyTimeline({ projects }) {
  const hrs = weeklyHoursPerDay(projects)

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Weekly workload (hrs / day)</div>
      <div className={styles.grid}>
        {DAYS.map((day, i) => {
          const h = hrs[i]
          const pct = Math.min(h / TARGET, 1) * 100
          const color =
            h > TARGET
              ? 'var(--red)'
              : h > TARGET * 0.75
              ? 'var(--amber)'
              : 'var(--accent)'
          const isToday = i === TODAY_IDX

          return (
            <div key={day} className={`${styles.col} ${isToday ? styles.today : ''}`}>
              <div className={styles.dayLabel}>{day}</div>
              <div className={styles.barWrap}>
                <div
                  className={styles.bar}
                  style={{ height: `${pct}%`, background: color }}
                />
              </div>
              <div className={styles.hours}>{h}h</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
