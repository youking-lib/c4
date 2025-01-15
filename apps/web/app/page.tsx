'use client';

import { useRef } from 'react';
import * as motion from 'motion/react-client';
import { Button, Flex } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useImmer } from 'use-immer';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

import { Input } from '@/components/ui/input';
import { Filelist } from './filelist';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useImmer({
    code: '',
    files: [] as File[]
  });

  return (
    <Flex width="100vw" height="100vh" justify="center" align="center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Flex direction="column" gap="8" align="center">
          <div className="text-2xl font-bold">赛博取件码，畅享极致的文件传输体验！</div>

          <div className="flex items-center gap-2">
            取件码：
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
          </div>

          <div>
            <Button size="3" highContrast color="gray" onClick={() => inputRef.current?.click()}>
              Upload File <PlusIcon height="16" width="16" />
            </Button>

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
          </div>

          <Filelist files={state.files} />
        </Flex>
      </motion.div>
    </Flex>
  );
}

export function RetrieveOTP({
  value,
  onChange,
  onComplete
}: {
  value: string;
  onChange: (otp: string) => void;
  onComplete: (otp: string) => void;
}) {
  return (
    <InputOTP
      value={value}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      onChange={onChange}
      onComplete={onComplete}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
