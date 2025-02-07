'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Container, Section, Flex } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';

export function Header() {
  const { theme = 'light', setTheme } = useTheme();

  return (
    <Container className="border-b border-gray-200">
      <Section size="1">
        <Flex align="center" justify="between">
          <Link
            href="/"
            className="font-bold font-mono px-2"
            style={{
              fontFamily: 'var(--font-geist-mono)'
            }}
          >
            vsh.cc
          </Link>

          <Flex gap="2" align="center">
            <Button variant="link">Pricing</Button>
            <Button variant="link">Docs</Button>
            <Button variant="link">Github</Button>
          </Flex>

          <Flex gap="2" align="center">
            <Button variant="link">Login</Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Flex>
        </Flex>
      </Section>
    </Container>
  );
}
