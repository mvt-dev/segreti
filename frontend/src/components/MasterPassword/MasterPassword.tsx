import React, { useState, useEffect } from 'react'
// import { classes } from '@/helpers'
import { Modal, Input, Button } from '@/components'
import { useAuthStore } from '@/stores'
// import styles from './MasterPassword.module.scss'

export function MasterPassword() {
  const [isOpen, setOpen] = useState(false)
  const [pass, setPass] = useState('')
  const { password, setPassword } = useAuthStore()

  useEffect(() => {
    if (password === 'REQUIRED') {
      setOpen(true)
    }
  }, [password])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await setPassword(pass)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <form onSubmit={onSubmit}>
        <Input
          label="Password"
          name="password"
          type="password"
          value={pass}
          onChange={({ value }) => setPass(value)}
        />
        <Button label="Confirmar" type="submit" />
      </form>
    </Modal>
  )
}

export default MasterPassword
