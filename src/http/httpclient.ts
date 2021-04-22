import https from 'https';
import { RequestOptions } from 'http';
import * as URL from 'url';

export function requestGet(url: string, options: RequestOptions = {}): Promise<any> {
  const parsed = URL.parse(url);

  const params: RequestOptions = {
    method: 'GET',
    host: parsed.host,
    port: parsed.port,
    path: parsed.path || '/',
    headers: {
      "User-Agent": "GitMass (f3l1x)",
    },
    ...options
  };

  return new Promise((resolve, reject) => {
    https
      .get(params, res => {
        const chunks: any = [];
        res.on("data", d => (chunks.push(d)));
        res.on("end", () => {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
        });
      })
      .on("error", e => {
        console.error(e);
        reject(e);
      });
  });
}
