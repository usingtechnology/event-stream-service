import subProcess from 'child_process';
import { NkResult } from '../types/NkResult';

export const nk = async () => {
  return new Promise<NkResult>((resolve, reject) => {
    const nk = subProcess.spawn('nk', ['-gen', 'user', '-pubout']);
    nk.on('error', (data: unknown) => {
      reject(data);
    });
    nk.stderr.on('data', (data: unknown) => {
      reject(data);
    });
    nk.stdout.on('data', (data: AllowSharedBufferSource) => {
      const nk_out = new TextDecoder().decode(data).split('\n');
      const result: NkResult = { accountName: nk_out[1], password: nk_out[0] };
      resolve(result);
    });
  });
};

export default nk;
