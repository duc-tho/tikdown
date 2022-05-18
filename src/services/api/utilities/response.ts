// Middleware to handle response parsing, error handling, logging, etc...

interface Response {
     results?: string;
     data?: string | object;
}

interface Error {
     data?: string | object;
}

export function handleResponse(response: Response) {
     if (response.results) {
          return response.results;
     }

     if (response.data) {
          return response.data;
     }

     return response;
}

export function handleError(error: Error) {
     if (error.data) {
          return error.data;
     }

     return error;
}
