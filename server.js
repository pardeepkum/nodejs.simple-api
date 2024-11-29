import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path'

//const PORT = process.env.PORT || 8000;
const PORT = 8000;


// Get current path

const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

console.log(_filename, _dirname);


const server = http.createServer (async (req, res)=> {
 // res.setHeader('Content-Type', 'text/html');

 //res.writeHead(200, {'Content-Type': 'application/json'})


 try{
 // check if get request

if(req.method == 'GET'){
let filePath;
 if(req.url === '/'){
 filePath = path.join(_dirname, 'public', 'index.html');

//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<h1>HomePage</h1>');
 }
 else if(req.url === '/about'){
 filePath = path.join(_dirname, 'public', 'about.html');
// res.writeHead(200, {'Content-Type': 'text/html'});
//    res.end('<h1>About</h1>');
 }
 else{
// res.writeHead(404, {'Content-Type': 'text/html'});
//     res.end('<h1>Not Found</h1>');
throw new error('Not Found')
 }

 const data = await fs.readFile(filePath);
 res.setHeader('Content-Type', 'text/html');
 res.write(data);
 res.end();
}else{
 throw new error('Method not Allowed');
}

}catch (error){
   res.writeHead(500, {'Content-Type': 'text/plain'});
     res.end('Server Error');
 }


});
//
 server.listen(PORT, ()=>{
 console.log(`server running on port ${PORT}`);
})


// console.log(req.url);
// console.log(req.method);
//
// res.writeHead(200, {'Content-Type': 'text/html'})
// // res.end('<h1>Hello World!</h1>');
// // res.end(JSON.stringify({ message: 'Server Error'}));
// res.end('<h1>Hello World</h1>');




// when running the server the used the command

//node server

