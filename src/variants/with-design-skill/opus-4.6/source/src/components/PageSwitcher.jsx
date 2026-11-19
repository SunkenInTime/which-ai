import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

export default function PageSwitcher({ pages }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = pages.findIndex(p => p.path === location.pathname)

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 99999,
      fontFamily: "'Opus46 JetBrains Mono', monospace",
    }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'absolute',
              bottom: '64px',
              right: 0,
              background: 'rgba(15, 15, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              padding: '8px',
              minWidth: '200px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {pages.map((page, i) => (
              <motion.button
                key={page.path}
                onClick={() => { navigate(page.path); setIsOpen(false) }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  background: currentIndex === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: currentIndex === i ? '#fff' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  if (currentIndex !== i) e.target.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  if (currentIndex !== i) e.target.style.background = 'transparent'
                }}
              >
                <span style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '7px',
                  background: currentIndex === i
                    ? 'linear-gradient(135deg, #fff, #aaa)'
                    : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: currentIndex === i ? '#111' : 'rgba(255,255,255,0.35)',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                {page.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(15, 15, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity={isOpen ? 0.5 : 1} />
            <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity={isOpen ? 0.5 : 0.6} />
            <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity={isOpen ? 0.5 : 0.6} />
            <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" fill="currentColor" opacity={isOpen ? 0.5 : 0.3} />
          </svg>
        </motion.span>
      </motion.button>
    </div>
  )
}

