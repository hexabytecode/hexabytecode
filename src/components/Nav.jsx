import styles from './Nav.module.css'

export default function Nav({ onNewProject, onGoHome }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={onGoHome}>
        work<span>board</span>
      </div>
      <div className={styles.actions}>
        <button className="btn btn-ghost" onClick={onGoHome}>Dashboard</button>
        <button className="btn btn-primary" onClick={onNewProject}>+ New Project</button>
      </div>
    </nav>
  )
}
