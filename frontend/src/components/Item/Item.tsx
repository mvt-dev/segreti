import React from 'react'
import styles from './Item.module.scss'
import { ReactComponent as IconEdit } from '../../assets/icons/edit.svg'
import { ReactComponent as IconCopy } from '../../assets/icons/copy.svg'

interface ItemProps {
  name?: string
  username: string
  onEdit: () => void
  onCopy?: () => void
}

export function Item(props: ItemProps) {
  const { name, username, onEdit, onCopy } = props

  return (
    <section className={styles.item}>
      <div className={styles.info}>
        <h1>{name || '-'}</h1>
        <h2>{username}</h2>
      </div>
      <div className={styles.action} onClick={onCopy}>
        <IconCopy />
      </div>
      <div className={styles.action} onClick={onEdit}>
        <IconEdit />
      </div>
    </section>
  )
}

export default Item
