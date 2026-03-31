import { useState } from 'react'
import Modal from './Modal'
import styles from './FormModal.module.css'

const DEFAULT = {
  name: '',
  type: 'retainer',
  source: 'personal',
  period: 'monthly',
  deadline: '',
  rate: '',
  workingDays: '5',
}

export default function ProjectModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(DEFAULT)

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    if (!form.name.trim()) { alert('Please enter a project name.'); return }
    onSave({
      name: form.name.trim(),
      type: form.type,
      source: form.source,
      period: form.type === 'retainer' ? form.period : null,
      deadline: form.type === 'onetime' ? form.deadline : null,
      rate: parseFloat(form.rate) || 0,
      workingDays: parseInt(form.workingDays) || 5,
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
      title="New Project"
      footer={
        <>
          <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save project</button>
        </>
      }
    >
      <div className="form-group">
        <label>Project name</label>
        <input
          type="text"
          placeholder="e.g. Acme Brand Identity"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label>Type</label>
          <select value={form.type} onChange={(e) => set('type', e.target.value)}>
            <option value="retainer">Retainer</option>
            <option value="onetime">One-time</option>
          </select>
        </div>
        <div className="form-group">
          <label>Source</label>
          <select value={form.source} onChange={(e) => set('source', e.target.value)}>
            <option value="personal">Personal gig</option>
            <option value="agency">Agency</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        {form.type === 'retainer' ? (
          <div className="form-group">
            <label>Billing period</label>
            <select value={form.period} onChange={(e) => set('period', e.target.value)}>
              <option value="monthly">Monthly</option>
              <option value="bimonthly">Bi-monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        ) : (
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => set('deadline', e.target.value)}
            />
          </div>
        )}
        <div /> {/* spacer — matches original half-width field */}
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label>Monthly / project rate (₹)</label>
          <input
            type="number"
            placeholder="50000"
            min="0"
            value={form.rate}
            onChange={(e) => set('rate', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Working days / week</label>
          <input
            type="number"
            placeholder="5"
            min="1"
            max="7"
            value={form.workingDays}
            onChange={(e) => set('workingDays', e.target.value)}
          />
        </div>
      </div>
    </Modal>
  )
}
