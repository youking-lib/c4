'use client';

import { Box, Button, Container, Flex, Heading, Section, Text } from '@radix-ui/themes';

import { Header } from './header';
import { Ominibox } from '@/components/ominibox';

export default function Home() {
  return (
    <Box width="100vw">
      <Header />

      <Container my="8" px="2">
        <Section size="1" className="flex justify-center items-center flex-col gap-10">
          <Heading size="9" className="text-center">
            Simple and fast <br /> sharing on the internet~
          </Heading>

          <Text size="3" className="text-center max-w-[500px]">
            vsh.cc is an Open-Source file sharing platform. It allows you to effortlessly share
            files over the network using a 6-digit key.
          </Text>
        </Section>

        <Section size="1" className="flex justify-center items-center flex-col gap-10">
          <Button highContrast size="4">
            Get Started for Free
          </Button>
        </Section>
      </Container>

      <Container px="2">
        <Section size="1" className="flex justify-center items-center flex-col gap-10">
          <Ominibox />
        </Section>
      </Container>
    </Box>
  );
}
