import { totalHours, periodLabel, monthlyInflow } from '../utils/analytics'
import styles from './ProjectsTable.module.css'

export default function ProjectsTable({ projects, onOpenProject }) {
  if (!projects.length) {
    return (
      <div className={styles.tableWrap}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <div>No projects yet — add one above.</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Type</th>
            <th>Source</th>
            <th>Deadline / Period</th>
            <th>Assets</th>
            <th>Total Hrs</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const hrs = totalHours(p)
            const inflow = monthlyInflow(p)
            const pct = Math.min((hrs / 40) * 100, 100)
            const highCount = p.assets.filter((a) => a.priority === 'high').length

            return (
              <tr key={p.id} onClick={() => onOpenProject(p.id)}>
                <td>
                  <div className={styles.projectName}>
                    {p.name}
                    <small>
                      {p.assets.length} asset{p.assets.length !== 1 ? 's' : ''}
                      {highCount ? ` · ${highCount} high priority` : ''}
                    </small>
                  </div>
                </td>
                <td>
                  <span className={`badge badge-${p.type}`}>
                    {p.type === 'onetime' ? 'One-time' : 'Retainer'}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${p.source}`}>{p.source}</span>
                </td>
                <td className={styles.muted}>{periodLabel(p)}</td>
                <td className={styles.bold}>{p.assets.length}</td>
                <td>
                  <div className={styles.hrsCell}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={styles.muted}>{hrs}h</span>
                  </div>
                </td>
                <td className={styles.inflow}>₹{inflow.toLocaleString('en-IN')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
