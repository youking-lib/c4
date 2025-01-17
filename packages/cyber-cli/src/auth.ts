import { z } from 'zod';
import { intro, outro, text } from '@clack/prompts';
import { createClient } from '@cyber-express/client';

login();

export async function login() {
  intro(`Login to Cyber`);

  const email = await text({
    message: 'Please enter your email',
    placeholder: 'user@example.com',
    validate(value) {
      const result = z.string().email().safeParse(value);

      console.log(result);

      if (!result.success) {
        return 'Invalid email';
      }

      return result.data;
    }
  });

  outro(`You're all set! ${email as string}`);

  // const client = getClient();
}

// export function getClient() {
//   return createClient({
//     baseUrl: 'http://127.0.0.1:8787',
//     token:
//       'eyJhbGciOiJFUzI1NiIsImtpZCI6ImVYcWRCb3pablNKSCJ9.eyJzdWIiOiI5ZTFhZDg3Zi1iM2QyLTRmODItYmY2Ny01ZDc2NDY4ZjI5ZmMiLCJpc3MiOiJodHRwczovL2FjY2Vzcy10b2tlbi5qd3Qtc2lnbmF0dXJlLnN0YWNrLWF1dGguY29tIiwiaWF0IjoxNzM3MTA2ODM4LCJhdWQiOiI0M2Q0ZjQxMS0yNWMxLTQzOGUtODMwYi1iMDJkY2FmNDI3ODQiLCJleHAiOjE3MzcxNTAwMzh9.eI4D0yNw_WA8y1WpBVAHGz6M9lnm3w660aqfch_XUyfHepQeeLNXF4SkaQsv9Z5eJbZYKDCnXi8Iou2SJvmYPg'
//   });
// }
