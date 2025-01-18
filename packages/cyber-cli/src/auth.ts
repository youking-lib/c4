import { z } from 'zod';
import { intro, log, outro, spinner, text } from '@clack/prompts';
import { createClient } from '@cyber-express/client';
import { setAuthorization } from './conf';

export async function login() {
  intro(`Login to Cyber`);

  const email = await text({
    message: 'Please enter your email',
    placeholder: 'user@example.com',
    validate(value) {
      const result = z.string().email().safeParse(value);

      if (!result.success) {
        return 'Invalid email';
      }
    }
  });

  const client = getClient();

  const loading = spinner();

  loading.start('Sending OTP code...');

  const authOtp = await client.auth.authOtpSendCodeCreate({
    email: email as string
  });

  if (authOtp.data.status !== 'success') {
    loading.stop('Failed to send OTP code');
  } else {
    loading.stop('The OTP code has been sent to your email');
  }

  const accessToken = await checkOtp(authOtp.data.data.nonce);
  setAuthorization(accessToken);

  log.success(`Hello ${email as string}!`);
  outro('Login successful ~');

  async function checkOtp(nonce: string) {
    const otp = await text({
      message: 'Please check your email and enter the OTP code',
      placeholder: '123456',
      validate(value) {
        const result = z.string().length(6).safeParse(value);

        if (!result.success) {
          return 'Invalid OTP';
        }
      }
    });

    loading.start('Verifying OTP code...');

    const authOtpVerify = await client.auth.authOtpVerifyCodeCreate({
      nonce,
      code: otp as string
    });

    if (authOtpVerify.data.status !== 'success') {
      loading.stop('Failed to verify OTP code');
      return checkOtp(nonce);
    }

    loading.stop('OTP code verified');

    return authOtpVerify.data.data.accessToken;
  }
}

export function getClient() {
  return createClient({
    baseUrl: 'http://127.0.0.1:8787',
    token:
      'eyJhbGciOiJFUzI1NiIsImtpZCI6ImVYcWRCb3pablNKSCJ9.eyJzdWIiOiI5ZTFhZDg3Zi1iM2QyLTRmODItYmY2Ny01ZDc2NDY4ZjI5ZmMiLCJpc3MiOiJodHRwczovL2FjY2Vzcy10b2tlbi5qd3Qtc2lnbmF0dXJlLnN0YWNrLWF1dGguY29tIiwiaWF0IjoxNzM3MTA2ODM4LCJhdWQiOiI0M2Q0ZjQxMS0yNWMxLTQzOGUtODMwYi1iMDJkY2FmNDI3ODQiLCJleHAiOjE3MzcxNTAwMzh9.eI4D0yNw_WA8y1WpBVAHGz6M9lnm3w660aqfch_XUyfHepQeeLNXF4SkaQsv9Z5eJbZYKDCnXi8Iou2SJvmYPg'
  });
}
