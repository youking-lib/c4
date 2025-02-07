'use client';

import { Theme } from '@radix-ui/themes';
import { useTheme, ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RadixTheme>{children}</RadixTheme>
    </ThemeProvider>
  );
}

function RadixTheme({ children }: { children: React.ReactNode }) {
  const { theme = 'light' } = useTheme();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <Theme
      appearance={theme as 'light' | 'dark'}
      data-is-root-theme="false"
      data-has-background="false"
      accentColor="gray"
      grayColor="mauve"
    >
      {children}
    </Theme>
  );
}
