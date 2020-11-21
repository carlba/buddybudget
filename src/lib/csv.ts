import * as papa from 'papaparse';

export const parseCsv = (input: string | NodeJS.ReadableStream, config?: papa.ParseConfig): Promise<papa.ParseResult<any>> => {
  return new Promise((resolve, reject) => {
    papa.parse(input, {
      error: error => reject(error),
      complete: result => resolve(result),
      header: true,
      ...config
    });
  });
};
