import { useImmer } from 'use-immer';
import { CloudUploadIcon } from 'lucide-react';
import { Box, Card, Flex, Heading, Inset, Text } from '@radix-ui/themes';

import { RetrieveOTP } from './retrieve-otp';

export function Ominibox() {
  return (
    <Card className="min-w-[1200px] min-h-[600px] flex justify-between">
      <Flex className="w-1/2" py="6" align="center" justify="center" direction="column" gap="4">
        <Retrieve />
      </Flex>
      <Inset
        className="w-1/2 bg-zinc-100 flex justify-center items-center flex-col gap-2 cursor-pointer"
        clip="padding-box"
        side="right"
      >
        <Upload />
      </Inset>
    </Card>
  );
}

function Retrieve() {
  const [state, setState] = useImmer({
    code: '',
    files: [] as File[]
  });

  return (
    <>
      <Heading>Retrieve your files</Heading>
      <Text mb="8">Enter your file code</Text>

      <RetrieveOTP
        value={state.code}
        onComplete={() => {
          console.log('complete', state.code);
        }}
        onChange={value => {
          setState(draft => {
            draft.code = value;
          });
        }}
      />
    </>
  );
}

function Upload() {
  return (
    <>
      <CloudUploadIcon className="text-neutral-400 size-12" strokeWidth={0.5} />

      <div className="text-neutral-400">Upload files</div>
    </>
  );
}
