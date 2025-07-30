"use client"
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'
import Button from '@/components/globals/Button/Button'

const Pagination = ({page, hasPrev, hasNext, catSlug, author, tag}) => {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <Button
        text="Voltar"
        disabled={!hasPrev}
        onClick={() => router.push(`?${catSlug ? `catSlug=${catSlug}&` : ''}page=${page - 1}`)}
      />
      <Button
        text="Avançar"
        disabled={!hasNext}
        onClick={() => router.push(`?${catSlug ? `catSlug=${catSlug}&` : ''}page=${page + 1}`)}
      />
    </div>
  )
}

export default Pagination