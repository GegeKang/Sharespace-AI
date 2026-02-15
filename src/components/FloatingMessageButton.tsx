'use client'

import { useRouter } from 'next/navigation'
import { Button, Box } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'

export default function FloatingMessageButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/messages')
  }

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={<ChatIcon sx={{ fontSize: { xs: '18px', md: '20px' } }} />}
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 9999,
        backgroundColor: '#1976d2',
        color: 'white',
        borderRadius: '30px',
        paddingX: { xs: 2, md: 3 },
        paddingY: { xs: 1, md: 1.5 },
        fontWeight: 'bold',
        fontSize: { xs: '14px', md: '16px' },
        minWidth: { xs: 'auto', md: 'auto' },
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
          >
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Messages</Box>
      </Button>
  )
}
