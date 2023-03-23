import React from 'react'
import { Link } from 'react-router-dom'
import { classes } from '../../helpers'
import styles from './Button.module.scss'

interface ButtonProps {
  label: string
  type: 'submit' | 'outlined' | 'text'
  to?: string
  onClick?: () => void
}

export function Button({ label, type, to, onClick }: ButtonProps) {
  return to ? (
    <Link to={to} className={classes([styles.button, styles[type]])}>
      {label}
    </Link>
  ) : (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={classes([styles.button, styles[type]])}
      onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
