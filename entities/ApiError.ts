const getErrorMessage = (statusCode: number): string => {
  switch (statusCode) {
      case 400:
          return 'Bad Request: The server cannot process the request due to client error.';
      case 401:
          return 'Unauthorized: The request lacks valid authentication credentials.';
      case 403:
          return 'Forbidden: The server refuses to authorize the request.';
      case 404:
          return 'Not Found: The server cannot find the requested resource.';
      case 500:
          return 'Internal Server Error: The server encountered an unexpected condition.';
      case 502:
          return 'Bad Gateway: The server received an invalid response from the upstream server.';
      case 503:
          return 'Service Unavailable: The server is not ready to handle the request.';
      case 504:
          return 'Gateway Timeout: The server did not receive a timely response from the upstream server.';
      default:
          return 'An unexpected error has occurred.';
  }
};

export default class ApiError extends Error {
  statusCode: number;
  text: string;
  constructor(statusCode: number, message: string) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.text = getErrorMessage(statusCode)
  }
}
