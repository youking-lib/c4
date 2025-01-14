"use client";

import * as motion from "motion/react-client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { CodeIcon, PlusIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Flex width="100vw" height="100vh" justify="center" align="center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Flex direction="column" gap="8" align="center">
          <Flex gap="4">
            <TextField.Root
              placeholder="Please enter the retrieval code"
              size="3"
            >
              <TextField.Slot>
                <CodeIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <Button size="3">Retrieve</Button>
          </Flex>

          <div>
            <Button size="3" highContrast color="gray">
              Upload File <PlusIcon height="16" width="16" />
            </Button>
          </div>
        </Flex>
      </motion.div>
    </Flex>
  );
}
