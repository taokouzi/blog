const http = require('http');  
  
const server = http.createServer((req, res) => {  
  const url = req.url;  
  const query = url.split('?')[1];  
  const options = {  
    hostname: 'unsplash.com',  
    port: 80,  
    path: `/napi/topics/wallpapers/photos${url.replace('/napi/topics/wallpapers/photos', '')}`,  
    method: req.method,  
    headers: req.headers  
  };  
  
  const clientRequest = http.request(options, (clientRes) => {  
    res.writeHead(clientRes.statusCode, clientRes.headers);  
    clientRes.on('data', (chunk) => {  
      res.write(chunk);  
    });  
    clientRes.on('end', () => {  
      res.end();  
    });  
  });  
  
  clientRequest.on('error', (error) => {  
    console.error(error);  
  });  
  
  if (query) {  
    clientRequest.write(query);  
  }  
  clientRequest.end();  
});  
  
// 启动服务器并监听端口  
server.listen(8080, () => {  
  console.log('服务器已启动，监听端口8080');  
});