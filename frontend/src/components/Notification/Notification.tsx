import React, { useEffect, useState } from 'react'
import { classes } from '../../libs'
import { ReactComponent as IconClose } from '../../assets/icons/close.svg'
import { ReactComponent as IconSuccess } from '../../assets/icons/success.svg'
import { ReactComponent as IconWarning } from '../../assets/icons/warning.svg'
import { ReactComponent as IconError } from '../../assets/icons/error.svg'
import styles from './Notification.module.scss'

interface NotificationProps {
  show: boolean
  type: 'success' | 'warning' | 'error'
  message: string
}

export function Notification({ show, type, message }: NotificationProps) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  const typeToIcon = {
    success: IconSuccess,
    warning: IconWarning,
    error: IconError
  }

  const TypeIcon = typeToIcon[type]

  return (
    <div
      className={classes([
        styles.notification,
        styles[type],
        visible && styles.visible
      ])}
      onClick={() => setVisible(false)}>
      <TypeIcon />
      <span>{message}</span>
      <IconClose />
    </div>
  )
}

export default Notification
