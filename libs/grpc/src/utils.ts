import { GrpcTimestamp } from '@telecom/grpc';

export const parseGrpcTimestamp = (ts?: GrpcTimestamp | null): Date | null => {
  if (
    !ts ||
    ((ts.seconds === 0 || ts.seconds === '0') && ts.nanos === 0) ||
    isNaN(Number(ts.seconds))
  ) {
    return null;
  }

  const seconds = Number(ts.seconds);
  const nanos = ts.nanos || 0;

  const millis = seconds * 1000 + Math.floor(nanos / 1e6);
  return new Date(millis);
};

export const formatToGrpcTimestamp = (date?: Date | null): GrpcTimestamp | null => {
  if (!date || isNaN(date.getTime())) return null;

  const seconds = Math.floor(date.getTime() / 1000);
  const nanos = (date.getMilliseconds() % 1000) * 1e6;

  return { seconds, nanos };
};
