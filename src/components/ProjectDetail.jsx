import { totalHours, monthlyInflow, periodLabel } from '../utils/analytics'
import AssetCard from './AssetCard'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail({ project, onBack, onAddAsset }) {
  const hrs = totalHours(project)
  const inflow = monthlyInflow(project)

  return (
    <main className={styles.main}>
      <button className={styles.backBtn} onClick={onBack}>
        ← Back to dashboard
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{project.name}</div>
          <div className={styles.meta}>
            <span className={`badge badge-${project.type}`}>
              {project.type === 'onetime' ? 'One-time' : 'Retainer'}
            </span>
            <span className={`badge badge-${project.source}`}>{project.source}</span>
            <span className={styles.period}>{periodLabel(project)}</span>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{hrs}h</div>
            <div className={styles.statLabel}>Total hours / period</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statValue} ${styles.green}`}>
              ₹{inflow.toLocaleString('en-IN')}
            </div>
            <div className={styles.statLabel}>Monthly inflow</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statValue} ${styles.amber}`}>
              {(hrs / 21.7).toFixed(1)}h
            </div>
            <div className={styles.statLabel}>Avg. daily hrs</div>
          </div>
        </div>
      </div>

      {/* Assets */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>Assets</div>
        <button className="btn btn-primary" onClick={onAddAsset}>
          + Add Asset
        </button>
      </div>

      {project.assets.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🗂️</div>
          <div>No assets yet — add the deliverables for this project.</div>
        </div>
      ) : (
        <div className={styles.grid}>
          {project.assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </main>
  )
}
