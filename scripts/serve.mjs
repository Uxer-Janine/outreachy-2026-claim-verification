import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const prefix = '/outreachy-2026-claim-verification/';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.txt':'text/plain'};
const server = http.createServer(async(req,res)=>{
  try{
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith(prefix)) pathname = pathname.slice(prefix.length);
    let filename = path.resolve(root, '.' + '/' + pathname.replace(/^\/+/, ''));
    if (filename !== path.resolve(root) && !filename.startsWith(path.resolve(root)+path.sep)) {res.writeHead(403);res.end('Forbidden');return;}
    if((await stat(filename)).isDirectory()) filename=path.join(filename,'index.html');
    const data = await readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:4173${prefix}`));
