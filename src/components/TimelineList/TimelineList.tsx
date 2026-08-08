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
          <div className="timeline-item__heading">
            <h3>{item.title}</h3>
            {(item.organization || item.period) && (
              <p className="timeline-item__meta">
                {[item.organization, item.period].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          <div className="timeline-item__content">
            <p>{item.description}</p>
            {item.details?.map((detail) => (
              <div key={detail.title} className="timeline-item__detail">
                <h4>{detail.title}</h4>
                <ul>
                  {detail.items.map((detailItem) => <li key={detailItem}>{detailItem}</li>)}
                </ul>
              </div>
            ))}
            {item.learning && <p className="timeline-item__learning">{item.learning}</p>}
          </div>
        </article>
      ))}
    </div>
  )
}
