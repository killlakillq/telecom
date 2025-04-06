import logger from '@telecom/logger';

export type AsyncFunction<T> = () => Promise<T>;

export async function withErrorHandling<T>(
  operation: AsyncFunction<T>,
  context: string,
  throwError: boolean = false,
  onError?: (error: Error) => void,
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    logger.error({ error }, `Error in ${context}`);

    if (onError) {
      onError(error as Error);
    }

    if (throwError) {
      throw error;
    }

    return undefined;
  }
}
