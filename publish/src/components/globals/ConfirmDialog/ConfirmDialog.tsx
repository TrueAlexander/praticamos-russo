import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

interface ConfirmDialogProps {
  message?: string
  name?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string       
  cancelLabel?: string         
  showCancelButton?: boolean    
}

export function ConfirmDialog({
  message,
  name,
  confirmLabel = 'OK',
  cancelLabel = 'Cancelar',
  showCancelButton = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const fullMessage = name ? `${name}, ${message}` : message

  const buttons = [
    {
      label: confirmLabel,
      onClick: () => {
        onConfirm?.()
      },
    },
  ]

  if (showCancelButton) {
    buttons.push({
      label: cancelLabel,
      onClick: () => {
        onCancel?.()
      },
    })
  }

  confirmAlert({
    message: fullMessage,
    buttons,
  })

  return null
}
