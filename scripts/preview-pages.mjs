import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const portFlag = process.argv.indexOf('--port');
const port = portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 4173;
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json', '.webmanifest':'application/manifest+json', '.xml':'application/xml', '.txt':'text/plain' };
const server = http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end(); return; }
  let target = path.resolve(dist, '.' + pathname);
  if (target !== dist && !target.startsWith(dist + path.sep)) { response.writeHead(403); response.end(); return; }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  let status = 200;
  if (!fs.existsSync(target) || !fs.statSync(target).isFile() || path.basename(target).startsWith('_')) { target = path.join(dist, '404.html'); status = 404; }
  response.writeHead(status, { 'content-type': mime[path.extname(target)] || 'application/octet-stream', 'cache-control': 'no-cache' });
  if (request.method === 'HEAD') { response.end(); return; }
  fs.createReadStream(target).pipe(response);
});
server.listen(port, '127.0.0.1', () => console.log(`Preview http://127.0.0.1:${server.address().port}`));
