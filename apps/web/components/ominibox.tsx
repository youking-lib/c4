import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { CloudUploadIcon } from 'lucide-react';
import { Card, Flex, Heading, Inset, Text } from '@radix-ui/themes';

import { Input } from '@/components/ui/input';

import { Filelist } from './filelist';
import { RetrieveOTP } from './retrieve-otp';

export function Ominibox() {
  return (
    <Card className="w-full min-h-[600px] flex justify-between">
      <Flex className="w-1/2" py="6">
        <Retrieve />
      </Flex>
      <Inset className="w-1/2" clip="padding-box" side="right">
        <Upload />
      </Inset>
    </Card>
  );
}

function Retrieve() {
  const [state, setState] = useImmer({
    code: ''
  });

  return (
    <Flex gap="4" align="center" justify="center" direction="column" className="w-full">
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
    </Flex>
  );
}

function Upload() {
  const [state, setState] = useImmer({
    code: '',
    files: [] as File[]
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-full h-full flex justify-center items-center flex-col gap-2 cursor-pointer"
      onClick={() => inputRef.current?.click()}
      style={{
        backgroundColor: 'var(--gray-2)',
        color: 'var(--gray-11)'
      }}
    >
      <CloudUploadIcon className="size-12" strokeWidth={0.5} />

      <div className="">Upload files</div>

      <Input
        ref={inputRef}
        id="picture"
        className="hidden"
        type="file"
        multiple
        onChange={e => {
          setState(draft => {
            draft.files = Array.from(e.target.files ?? []);
          });
        }}
      />

      {state.files.length > 0 && <Filelist files={state.files} />}
    </div>
  );
}
