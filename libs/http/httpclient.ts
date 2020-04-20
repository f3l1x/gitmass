import https from 'https';
import { RequestOptions } from 'http';

export function get(path: string, options: RequestOptions = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const defaults: RequestOptions = {
      hostname: `api.github.com`,
      path: path,
      headers: { "User-Agent": "Contributte" },
    };

    if (process.env.GITHUB_TOKEN_GITMASS) {
      defaults.headers = {
        ...defaults.headers,
        'Authorization': `token ${process.env.GITHUB_TOKEN_GITMASS}`,
      }
    }

    https
      .get({
        ...defaults,
        ...options
      }, res => {
        const chunks: any = [];
        res.on("data", d => (chunks.push(d)));
        res.on("end", () => {
          resolve(JSON.parse(Buffer.concat(chunks).toString('UTF-8')));
        });
      })
      .on("error", e => {
        console.error(e);
        reject(e);
      });
  });
}
