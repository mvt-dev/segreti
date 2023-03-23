import React from 'react'
import { classes } from '@/helpers'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function Modal({
  isOpen,
  onClose,
  children
}: React.PropsWithChildren<ModalProps>) {
  function onCloseModal(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    onClose()
  }

  return (
    <section
      className={classes([styles.modal, isOpen && styles.open])}
      onClick={onCloseModal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </section>
  )
}

export default Modal
