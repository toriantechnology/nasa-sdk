// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
} from './util';

export default function apod(): Object {
  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('date') && !validateDate(options.date)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          'api.nasa.gov',
          '/planetary/apod',
          options,
          resolve,
          reject,
          handleResult
        );
      }),

  };
}
