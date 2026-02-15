// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Logout failed.');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    ...(user ? [
      { label: 'My Posts', href: '/my-posts' },
      { label: 'Profile', href: '/profile' },
      { label: 'Inbox', href: '/messages' },
      { label: 'Logout', href: '#', action: handleLogout }
    ] : [
      { label: 'Login', href: '/auth/login' }
    ])
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          paddingY: { xs: 0.5, md: 1 },
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: { xs: 56, md: 64 } }}>
          <Link href="/" passHref>
            <Button
              sx={{
                textTransform: 'none',
                p: 0,
                '&:hover': { backgroundColor: 'transparent' },
              }}
              onClick={closeMobileMenu}
            >
              <Image
                src="/logo.png"
                alt="Sharespace Logo"
                width={isMobile ? 60 : 80}
                height={isMobile ? 60 : 80}
                style={{ borderRadius: '8px' }}
                priority
              />
            </Button>
          </Link>

          {isMobile ? (
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ color: '#2563eb' }}
              edge="end"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {navigationItems.map((item) => (
                item.action ? (
                  <Button
                    key={item.label}
                    onClick={item.action}
                    sx={{
                      color: item.label === 'Logout' ? '#ef4444' : '#2563eb',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': { backgroundColor: item.label === 'Logout' ? '#fee2e2' : '#e0f2fe' },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Link key={item.label} href={item.href} passHref>
                    <Button
                      sx={{
                        color: '#2563eb',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': { backgroundColor: '#e0f2fe' },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#ffffff',
            paddingTop: 2,
          },
        }}
      >
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    closeMobileMenu();
                    window.location.href = item.href;
                  }
                }}
                sx={{
                  py: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: item.label === 'Logout' ? '#fee2e2' : '#e0f2fe',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      color: item.label === 'Logout' ? '#ef4444' : '#2563eb',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
