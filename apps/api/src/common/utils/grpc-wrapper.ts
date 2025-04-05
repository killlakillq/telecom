export const GrpcWrapper = <Request, Response>(
  grpcMethod: (
    request: Request,
    callback: (error: Error | null, response: Response) => void,
  ) => Response,
  request: Request,
): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
    grpcMethod(request, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
