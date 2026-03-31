import { useState } from 'react'
import { seedProjects } from './data/seed'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import ProjectDetail from './components/ProjectDetail'
import ProjectModal from './components/ProjectModal'
import AssetModal from './components/AssetModal'

let _nextId = seedProjects.length + 1

export default function App() {
  const [projects, setProjects] = useState(seedProjects)
  const [page, setPage] = useState('dashboard') // 'dashboard' | 'detail'
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [assetModalOpen, setAssetModalOpen] = useState(false)

  const currentProject = projects.find((p) => p.id === currentProjectId) ?? null

  function openProject(id) {
    setCurrentProjectId(id)
    setPage('detail')
  }

  function addProject(data) {
    setProjects((prev) => [...prev, { ...data, id: _nextId++, assets: [] }])
    setProjectModalOpen(false)
  }

  function addAsset(projectId, assetData) {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p
        const nextAssetId = p.assets.length ? Math.max(...p.assets.map((a) => a.id)) + 1 : 1
        return { ...p, assets: [...p.assets, { ...assetData, id: nextAssetId }] }
      })
    )
    setAssetModalOpen(false)
  }

  return (
    <>
      <Nav
        onNewProject={() => setProjectModalOpen(true)}
        onGoHome={() => setPage('dashboard')}
      />

      {page === 'dashboard' && (
        <Dashboard
          projects={projects}
          onOpenProject={openProject}
          onNewProject={() => setProjectModalOpen(true)}
        />
      )}

      {page === 'detail' && currentProject && (
        <ProjectDetail
          project={currentProject}
          projects={projects}
          onBack={() => setPage('dashboard')}
          onAddAsset={() => setAssetModalOpen(true)}
        />
      )}

      <ProjectModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={addProject}
      />

      <AssetModal
        open={assetModalOpen}
        onClose={() => setAssetModalOpen(false)}
        onSave={(data) => addAsset(currentProjectId, data)}
      />
    </>
  )
}
