import { useState } from 'react'
import type { NotificationItemViewModel } from './notificationViewModels'
import type { NotificationCenterViewModel } from './notificationViewModels'

function formatNotificationTime(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
  })
}

function sourceLabel(source: NotificationItemViewModel['source']): string {
  switch (source) {
    case 'daily':
      return 'Daily'
    case 'history':
      return 'History'
    case 'live':
      return 'Live'
    case 'lobby':
      return 'Lobby'
    case 'multiplayer':
      return 'Multiplayer'
    default:
      return 'brrrdle'
  }
}

function priorityLabel(priority: NotificationItemViewModel['priority']): string {
  switch (priority) {
    case 'high':
      return 'High priority'
    case 'medium':
      return 'Medium priority'
    case 'low':
      return 'Low priority'
    default:
      return 'Notification'
  }
}

export interface NotificationCenterProps {
  readonly defaultOpen?: boolean
  readonly onActivate: (item: NotificationItemViewModel) => void
  readonly onDismiss: (item: NotificationItemViewModel) => void
  readonly onMarkRead: (item: NotificationItemViewModel) => void
  readonly viewModel: NotificationCenterViewModel
}

export function NotificationCenter({
  defaultOpen = false,
  onActivate,
  onDismiss,
  onMarkRead,
  viewModel,
}: NotificationCenterProps) {
  const [open, setOpen] = useState(defaultOpen)
  const { items, readCount, unreadCount } = viewModel
  const panelId = 'brrrdle-notification-center-panel'
  const summaryText =
    unreadCount === 1 ? '1 unread notification' : `${unreadCount} unread notifications`

  return (
    <div className="brrrdle-notification-center">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={`Open in-app notifications. ${summaryText}.`}
        className="brrrdle-notification-summary"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>Notifications</span>
        <span className="brrrdle-notification-count">{unreadCount}</span>
      </button>

      {open ? (
        <section
          aria-label="In-app notifications"
          className="brrrdle-notification-panel"
          id={panelId}
        >
          <div className="brrrdle-notification-header">
            <div>
              <h2>Notifications</h2>
              <p>
                {unreadCount} unread · {readCount} read
              </p>
            </div>
          </div>

          {items.length > 0 ? (
            <ul className="brrrdle-notification-list">
              {items.map((item) => (
                <li className="brrrdle-notification-item" key={item.id}>
                  <div className="brrrdle-notification-item-header">
                    <span>{sourceLabel(item.source)}</span>
                    <span>{priorityLabel(item.priority)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <p className="brrrdle-notification-time">
                    Updated {formatNotificationTime(item.updatedAt)}
                  </p>
                  <div className="brrrdle-notification-actions">
                    <button onClick={() => onActivate(item)} type="button">
                      Open
                    </button>
                    {!item.read ? (
                      <button onClick={() => onMarkRead(item)} type="button">
                        Mark read
                      </button>
                    ) : null}
                    <button onClick={() => onDismiss(item)} type="button">
                      Dismiss
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="brrrdle-notification-empty">
              <h3>No in-app notifications</h3>
              <p>Read or dismissed items stay hidden until their source changes.</p>
            </div>
          )}
        </section>
      ) : null}
    </div>
  )
}
