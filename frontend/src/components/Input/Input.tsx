import React, { useState, useEffect, useMemo } from 'react'
import { classes } from '../../helpers'
import styles from './Input.module.scss'

interface InputProps {
  name: string
  value?: string
  type?: 'text' | 'password' | 'email'
  label: string
  error?: string
  onChange: (props: { name: string; value: string }) => void
}

export function Input({
  name,
  value = '',
  type = 'text',
  label,
  error,
  onChange
}: InputProps) {
  const [text, setText] = useState('')

  const filled = useMemo(() => !!text, [text])

  useEffect(() => {
    setText(value)
  }, [value])

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
    onChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <section
      className={classes([
        styles.input,
        filled && styles.filled,
        error && styles.error
      ])}>
      <input
        id={name}
        name={name}
        defaultValue={value}
        type={type}
        onChange={onInputChange}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {error && <span>{error}</span>}
    </section>
  )
}

export default Input
