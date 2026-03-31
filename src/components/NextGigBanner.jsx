import { nextGigInfo } from '../utils/analytics'
import styles from './NextGigBanner.module.css'

export default function NextGigBanner({ projects, onNewProject }) {
  const info = nextGigInfo(projects)

  return (
    <div
      className={styles.banner}
      style={{ borderColor: info.canTake ? 'var(--green)' : 'var(--red)' }}
    >
      <div>
        <div className={styles.label}>Next available gig slot</div>
        <div
          className={styles.value}
          style={{ color: info.canTake ? 'var(--green)' : 'var(--red)' }}
        >
          {info.label}
        </div>
        <div className={styles.sub}>{info.sub}</div>
      </div>
      <button className="btn btn-primary" onClick={onNewProject}>
        Accept a new gig
      </button>
    </div>
  )
}
