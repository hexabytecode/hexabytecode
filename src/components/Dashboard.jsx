import AnalyticsCards from './AnalyticsCards'
import NextGigBanner from './NextGigBanner'
import WeeklyTimeline from './WeeklyTimeline'
import ProjectsTable from './ProjectsTable'
import styles from './Dashboard.module.css'

export default function Dashboard({ projects, onOpenProject, onNewProject }) {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Your Dashboard</h2>
      <p className={styles.subtitle}>All your active projects & analytics at a glance.</p>

      <AnalyticsCards projects={projects} />
      <NextGigBanner projects={projects} onNewProject={onNewProject} />
      <WeeklyTimeline projects={projects} />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Projects</div>
        </div>
        <ProjectsTable projects={projects} onOpenProject={onOpenProject} />
      </div>
    </main>
  )
}
