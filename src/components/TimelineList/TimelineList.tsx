import type { TimelineItem } from '../../types/portfolio'

type TimelineListProps = {
  items: TimelineItem[]
  emptyMessage?: string
}

export function TimelineList({ items, emptyMessage }: TimelineListProps) {
  if (items.length === 0) {
    return emptyMessage ? <p className="empty-state">{emptyMessage}</p> : null
  }

  return (
    <div className="timeline-list">
      {items.map((item) => (
        <article key={item.id} className="timeline-item">
          <h3>{item.title}</h3>
          {(item.organization || item.period) && (
            <p className="timeline-item__meta">
              {[item.organization, item.period].filter(Boolean).join(' · ')}
            </p>
          )}
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  )
}
