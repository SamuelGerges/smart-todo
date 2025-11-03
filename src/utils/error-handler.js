export class ErrorHandlerClass {
  constructor(statusCode, message, stack, name, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack;
    this.name = name;
    this.data = data;
  }
}
