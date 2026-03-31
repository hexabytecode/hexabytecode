import { useState } from 'react'
import Modal from './Modal'
import styles from './FormModal.module.css'

const ASSET_TYPES = [
  'Social Media',
  'Video',
  'Illustration',
  'Branding',
  'UI/UX',
  'Copy / Content',
  'Photography',
  'Print',
  'Other',
]

const DEFAULT = {
  name: '',
  type: 'Social Media',
  hours: '',
  priority: 'medium',
  effort: 'medium',
}

export default function AssetModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(DEFAULT)

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    if (!form.name.trim()) { alert('Please enter an asset name.'); return }
    onSave({
      name: form.name.trim(),
      type: form.type,
      hours: parseFloat(form.hours) || 1,
      priority: form.priority,
      effort: form.effort,
    })
    setForm(DEFAULT)
  }

  function handleClose() {
    setForm(DEFAULT)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Asset"
      footer={
        <>
          <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Add asset</button>
        </>
      }
    >
      <div className="form-group">
        <label>Asset name</label>
        <input
          type="text"
          placeholder="e.g. Instagram Reels (4 videos)"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label>Asset type</label>
          <select value={form.type} onChange={(e) => set('type', e.target.value)}>
            {ASSET_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Hours allocated</label>
          <input
            type="number"
            placeholder="8"
            min="0.5"
            step="0.5"
            value={form.hours}
            onChange={(e) => set('hours', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label>Priority</label>
          <select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Effort</label>
          <select value={form.effort} onChange={(e) => set('effort', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}
