import { useEffect } from 'react'
import { IconButton } from '../IconButton/IconButton'
import './ModalWindow.css'

interface ModalWindowProps {
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const ModalWindow = ({ onClose, children, className = '' }: ModalWindowProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={`modalWindow ${className}`} onClick={handleBackdropClick}>
      <div className="modalWindow-wrapper">
        <div className="modalWindow-block">
          <IconButton
            className="modalWindow-close"
            iconUrl="../images/cross.png"
            onClick={onClose}
            aria-label="Закрыть"
          />
          {children}
        </div>
      </div>
    </div>
  )
}