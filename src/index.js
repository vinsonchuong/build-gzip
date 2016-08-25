import Directory from 'directory-helpers';
import * as fs from 'fs';
import * as zlib from 'zlib';

function isDirectory(filePath) {
  return filePath.endsWith('/');
}

async function gzip(filePath) {
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(`${filePath}.gz`))
      .on('close', resolve)
      .on('error', reject);
  });
}

const dist = new Directory('dist');
export default async function() {
  for (const file of await dist.glob('**', {mark: true})) {
    if (isDirectory(file)) {
      continue;
    }
    await gzip(dist.path(file));
  }
}
