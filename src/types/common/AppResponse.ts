export default interface AppResponse<T> {
  data: T;
  errors: {
    message: string;
    status: number;
    errorCode: string;
    service: string;
  };
}
