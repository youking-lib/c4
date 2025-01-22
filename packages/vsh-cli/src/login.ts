import { z } from 'zod';
import { intro, isCancel, log, outro, spinner, text } from '@clack/prompts';

import { getClient } from './libs/client';
import { setAuthorization } from './libs/conf';

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

  if (isCancel(email)) {
    log.error('Login cancelled');
    return;
  }

  const client = getClient();
  const loading = spinner();

  loading.start('Sending OTP code...');

  const authOtp = await client.auth.authOtpSendCodeCreate({
    email
  });

  if (authOtp.error) {
    loading.stop('Failed to send OTP code');
    return;
  }

  loading.stop('The OTP code has been sent to your email');

  const accessToken = await checkOtp(authOtp.data.data.nonce);

  if (isCancel(accessToken)) {
    log.error('Login cancelled');
    return;
  }

  setAuthorization(accessToken);

  client.setOptions({
    token: accessToken
  });

  const user = await client.auth.authMeList();

  if (user.error) {
    log.error(user.error.message!);
    return;
  }

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

    if (isCancel(otp)) {
      return otp;
    }

    loading.start('Verifying OTP code...');

    const authOtpVerify = await client.auth.authOtpVerifyCodeCreate({
      nonce,
      code: otp as string
    });

    if (authOtpVerify.error) {
      loading.stop('Failed to verify OTP code');

      return checkOtp(nonce);
    }

    loading.stop('OTP code verified');

    return authOtpVerify.data.data.accessToken;
  }
}
