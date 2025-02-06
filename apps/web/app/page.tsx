'use client';

import { useRef } from 'react';
import { useImmer } from 'use-immer';
import * as motion from 'motion/react-client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';

import { Input } from '@/components/ui/input';
import { RetrieveOTP } from '@/components/retrieve-otp';

import { Filelist } from './filelist';
import { Header } from './header';
import { Ominibox } from '@/components/ominibox';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useImmer({
    code: '',
    files: [] as File[]
  });

  return (
    <Box width="100vw">
      <Header />

      <Flex height="calc(100vh - 84px)" align="center" justify="center">
        <Ominibox />
      </Flex>

      <Flex height="100vh">123</Flex>
    </Box>
  );
}

// <motion.div
// initial={{ opacity: 0, y: -20 }}
// animate={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.5, delay: 0.2 }}
// >
// <Flex direction="column" gap="8" align="center">
//   {/* <div className="text-2xl font-bold">赛博取件码，畅享极致的文件传输体验！</div> */}

//   <div className="flex items-center gap-2">
//     取件码：
//     <RetrieveOTP
//       value={state.code}
//       onComplete={() => {
//         console.log('complete', state.code);
//       }}
//       onChange={value => {
//         setState(draft => {
//           draft.code = value;
//         });
//       }}
//     />
//   </div>

//   <div>
//     <Button size="3" highContrast color="gray" onClick={() => inputRef.current?.click()}>
//       Upload File <PlusIcon height="16" width="16" />
//     </Button>

//     <Input
//       ref={inputRef}
//       id="picture"
//       className="hidden"
//       type="file"
//       multiple
//       onChange={e => {
//         setState(draft => {
//           draft.files = Array.from(e.target.files ?? []);
//         });
//       }}
//     />
//   </div>

//   <Filelist files={state.files} />
// </Flex>
// </motion.div>
