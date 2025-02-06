import { Container, Section, Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoonIcon } from 'lucide-react';

export function Header() {
  return (
    <Container>
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
            <Button variant="ghost" size="icon">
              <MoonIcon width={16} height={16} />
            </Button>
          </Flex>
        </Flex>
      </Section>
    </Container>
  );
}
