import OSS from 'ali-oss';
import path from 'path';
import fs from 'fs';
const resolve = (...paths: string[]) => path.resolve(process.cwd(), ...paths);

import {
  OSS_REGION,
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET,
  OSS_BUCKET,
} from './env';
import collect from './collect';

const PREFIX = 'figma/';

export const client = new OSS({
  region: OSS_REGION,
  accessKeyId: OSS_ACCESS_KEY_ID,
  accessKeySecret: OSS_ACCESS_KEY_SECRET,
  bucket: OSS_BUCKET,
});

function fetch() {
  try {
    fs.rmSync(resolve('public/figma'), { recursive: true, force: true });
  } catch (e) {
    // pass
  }
  try {
    fs.mkdirSync(resolve('public/figma'));
  } catch (e) {
    // pass
  }
  return collect().then((icons) => {
    return Promise.all(
      icons.map((icon) => {
        return client.get(
          `${PREFIX}${icon}.svg`,
          path.resolve(process.cwd(), `public/${PREFIX}${icon}.svg`)
        );
      })
    );
  });
}
fetch();
