const http = require('http')
const path = require('path');
const  fs = require('fs'); 
const fsPromises = require('fs').promises
const logEvents = require( './LogEvents');
const EventEmitter = require( 'events');
const { error } = require('console');

// initialize object 

class MyEmitter  extends  EventEmitter {}

const myEmitter = new MyEmitter();

const PORT = process.env.PORT ||3500 ;

const serverFile = async ( filePath, contentType, response) => {



    
}


const server = http.createServer(( req, res ) => {
    console.log(req.url, req.method)

    const extention = path.extname( req,res)

    let  contentType;

    switch(extention){
        case '.css':
            contentType  = 'text/css';
        break;
        case '.js':
             contentType = ' text/javascript';
        break;
        case '.json':
            contentType =' application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png ':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = ' text/plain'
            break;
        default:
            contentType = 'text.html '
            break
    
    }

     let filePath = contentType === 'text/html' && req.url =='/'
      ? path.join(__dirname,'views', 'index.html')
      : contentType === 'text.html' && req.url.slice(-1) === '/'
      ? path.join (__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

      if (!extention && req.url.slice( -1 ) !== '/') filePath += './html'

      const fileExists = fs.existsSync(filePath);

      if( fileExists) {
        //server the file 


      } else {
        //404 
        //301 require 
       switch(path.parse(filePath).base){
        case 'old-new-page.html':
            res.writeHead(301, {
                'location': '/new-page.html'
            })
            res.end();
            break; 
        case 'www-page.html':
            res.writeHead(301, {'location' : '/'});
            res.end()
            break
        default:
            //server a 404 response 

       }


      }


    
});

server.listen(PORT, () => console.log(`Server  is running in ${PORT}`));



//myEmitter.on('log' , (msg) => logEvents(msg))


//setTimeout(() => {

  //  myEmitter.emit( 'log', 'log event emitted')
//}, 2000)