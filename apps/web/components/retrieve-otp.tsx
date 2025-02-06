import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

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
