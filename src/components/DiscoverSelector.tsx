'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const discoverOptions = [
  { label: 'Rooms Available', value: '/discover/rooms' },
  { label: 'People Looking for Roommates', value: '/discover/roommates' }
]

export default function DiscoverSelector({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: any) => {
    const value = e.target.value
    if (value !== '') router.push(value)
  }

  // Prevent SSR mismatch on first render
  if (!mounted) return null

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        color: '#1e293b',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 }
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold', 
          color: '#4f46e5',
          fontSize: { xs: '1.75rem', sm: '2.125rem' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        Discover
      </Typography>

      <Select
        value={pathname && pathname.startsWith('/discover') ? pathname : ''}
        onChange={handleChange}
        variant="outlined"
        displayEmpty
        fullWidth
        sx={{
          mb: 4,
          backgroundColor: '#ffffff',
          color: '#1e293b',
          borderRadius: 2,
          maxWidth: { xs: '100%', sm: 400 },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
          '& .MuiSvgIcon-root': { color: '#4f46e5' },
        }}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: '#94a3b8' }}>Select...</span>
          }
          const selectedOption = discoverOptions.find(opt => opt.value === selected)
          return selectedOption?.label || 'Select...'
        }}
      >
        {/* Empty option so "Select..." shows up initially */}
        <MenuItem value="">
          <em style={{ color: '#94a3b8' }}>Select...</em>
        </MenuItem>

        {discoverOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ color: '#334155' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      {children}
    </Box>
  )
}
