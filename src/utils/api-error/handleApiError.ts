export type AsyncFn = (...args: any[]) => Promise<any>;

export default function handleApiError<T extends AsyncFn>(
  fc: T,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
  return async (...args: Parameters<T>) => {
    try {
      return await fc(...args);
    } catch (err: any) {
      console.log("Error: ", JSON.stringify(err));

      throw err;
    }
  };
}
