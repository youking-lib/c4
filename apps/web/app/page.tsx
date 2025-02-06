'use client';

import { Box, Container, Flex, Section } from '@radix-ui/themes';

import { Header } from './header';
import { Ominibox } from '@/components/ominibox';

export default function Home() {
  return (
    <Box width="100vw">
      <Header />

      <Container>
        <Section
          size="1"
          height="calc(100vh - 84px)"
          className="flex justify-center items-center"
          px="2"
        >
          <Ominibox />
        </Section>
      </Container>

      <Flex height="100vh">123</Flex>
    </Box>
  );
}
