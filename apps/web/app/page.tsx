"use client";

import * as motion from "motion/react-client";
import { Container, Section } from "@radix-ui/themes";

export default function Home() {
  return (
    <Container>
      <Section>
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          文件分享系统
        </motion.h1>
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">上传文件</TabsTrigger>
            <TabsTrigger value="retrieve">提取文件</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <FileUpload />
          </TabsContent>
          <TabsContent value="retrieve">
            <FileRetrieve />
          </TabsContent>
        </Tabs> */}
        </motion.div>
      </Section>
    </Container>
  );
}
