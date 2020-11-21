import { Duplex, Writable, Readable, Stream } from 'stream';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import * as readLine from 'readline'

export function bufferToStream(buffer: Buffer) {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export function removeLines(stream: any, num: number) {
  const outputStream = new Duplex({ read: size => true });

  const rl = readLine.createInterface({ input: stream, crlfDelay: Infinity });
  let count = 0;
  rl.on('line', line => {
    if (count > 2) {
      outputStream.push(line + '\n');
    }
    count += 1;
  });

  rl.on('close', () => {
    outputStream.push(null);
    outputStream.end();
  });

  return outputStream;
}
