export class wsError extends Error {
  constructor(
    public message: string,
    public closeSocket: boolean = false,
    public errorCode?: number,
    public details?: object
  ) {
    super(message);
  }
}
