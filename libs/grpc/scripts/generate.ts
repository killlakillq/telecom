// generate-proto-types.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROTO_DIR = path.resolve(__dirname, '../src/protos');
const OUT_DIR = path.resolve(__dirname, '../src/generated');

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(PROTO_DIR).filter((file) => file.endsWith('.proto'));

files.forEach((file) => {
  const filePath = path.join(PROTO_DIR, file);
  const cmd = [
    'protoc',
    `--ts_proto_out=${OUT_DIR}`,
    `--ts_proto_opt=esModuleInterop=true,forceLong=string`,
    `--proto_path=${PROTO_DIR}`,
    filePath,
  ].join(' ');

  console.log(`Generating TypeScript from ${file}...`);
  execSync(cmd, { stdio: 'inherit' });
});

console.log('✅ TypeScript types generated!');
