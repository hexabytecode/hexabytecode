import styles from './AssetCard.module.css'

const EFFORT_COLOR = {
  low: 'var(--green)',
  medium: 'var(--amber)',
  high: 'var(--red)',
}

export default function AssetCard({ asset }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.name}>{asset.name}</div>
          <div className={styles.type}>{asset.type}</div>
        </div>
        <div className={styles.hoursWrap}>
          <div className={styles.hours}>{asset.hours}h</div>
          <div className={styles.hoursLabel}>allocated</div>
        </div>
      </div>
      <div className={styles.meta}>
        <div className={styles.pill}>
          <span
            className={styles.dot}
            style={{ background: EFFORT_COLOR[asset.priority] }}
          />
          Priority: {asset.priority}
        </div>
        <div className={styles.pill}>
          <span
            className={styles.dot}
            style={{ background: EFFORT_COLOR[asset.effort] }}
          />
          Effort: {asset.effort}
        </div>
      </div>
    </div>
  )
}
