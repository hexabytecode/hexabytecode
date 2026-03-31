export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const TODAY_IDX = (new Date().getDay() + 6) % 7 // 0 = Mon

export const totalHours = (project) =>
  project.assets.reduce((sum, a) => sum + a.hours, 0)

export const periodLabel = (project) => {
  if (project.type === 'retainer') {
    return { monthly: 'Monthly', bimonthly: 'Bi-monthly', weekly: 'Weekly' }[project.period]
  }
  return formatDate(project.deadline)
}

export const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

export const monthlyInflow = (project) => {
  if (project.type === 'retainer') {
    if (project.period === 'weekly') return project.rate * 4
    if (project.period === 'bimonthly') return project.rate / 2
    return project.rate
  }
  const months = Math.max(
    1,
    Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24 * 30))
  )
  return Math.round(project.rate / months)
}

export const totalMonthlyInflow = (projects) =>
  projects.reduce((sum, p) => sum + monthlyInflow(p), 0)

export const totalDailyHours = (projects) => {
  const hrs = projects.reduce((sum, p) => {
    const mHrs =
      p.type === 'retainer'
        ? totalHours(p) * (p.period === 'weekly' ? 4 : p.period === 'bimonthly' ? 0.5 : 1)
        : totalHours(p)
    return sum + mHrs
  }, 0)
  return (hrs / 21.7).toFixed(1)
}

export const weeklyHoursPerDay = (projects) => {
  const arr = [0, 0, 0, 0, 0, 0, 0]
  projects.forEach((p) => {
    const mHrs =
      p.type === 'retainer'
        ? totalHours(p) * (p.period === 'weekly' ? 4 : p.period === 'bimonthly' ? 0.5 : 1)
        : totalHours(p)
    const daily = mHrs / 21.7
    const days = Math.min(p.workingDays, 7)
    for (let i = 0; i < days; i++) arr[i] += daily
  })
  return arr.map((v) => Math.round(v * 10) / 10)
}

export const availableHoursPerDay = (projects, target = 8) => {
  const daily = parseFloat(totalDailyHours(projects))
  return Math.max(0, target - daily).toFixed(1)
}

export const nextGigInfo = (projects) => {
  const avail = parseFloat(availableHoursPerDay(projects))
  if (avail <= 0) return { label: 'Fully booked', sub: 'Clear a project to free up time', canTake: false }
  if (avail >= 4) return { label: 'Available now', sub: `~${avail}h free daily`, canTake: true }
  return { label: `${avail}h / day free`, sub: 'Small gig or revision work possible', canTake: true }
}
