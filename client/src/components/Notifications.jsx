import React, { createContext, useState, useContext } from 'react'
import './Notifications.css'

// Create notification context
const NotificationContext = createContext()

// Custom hook to use notifications
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const showNotification = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const notifySuccess = (message, duration) => showNotification(message, 'success', duration)
  const notifyError = (message, duration) => showNotification(message, 'error', duration)
  const notifyWarning = (message, duration) => showNotification(message, 'warning', duration)
  const notifyInfo = (message, duration) => showNotification(message, 'info', duration)

  return (
    <NotificationContext.Provider value={{
      notifications,
      showNotification,
      removeNotification,
      notifySuccess,
      notifyError,
      notifyWarning,
      notifyInfo
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

// Individual Notification Component
const NotificationItem = ({ notification, onRemove }) => {
  const { id, message, type } = notification

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✕'
      case 'warning': return '⚠'
      case 'info': return 'ℹ'
      default: return 'ℹ'
    }
  }

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <span className="notification-icon">{getIcon()}</span>
        <span className="notification-message">{message}</span>
        <button 
          className="notification-close"
          onClick={() => onRemove(id)}
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Main Notifications Container Component
const Notifications = () => {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}

export default Notifications
