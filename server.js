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

    try{
      const data = await fsPromises.readFile(filePath, 'utf-8')
      response.writeHead( 200 , { 'Content-Type':  contentType})
      response.end(data)
    

    }catch ( err) {

        console.log(err)
        response.statusCode = 500
        response.end();  


    }





}


const server = http.createServer(( req, res ) => {
    console.log(req.url, req.method)

    const extension = path.extname( req.url)

    let  contentType;

    switch(extension){
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
    let filePath = 
        contentType ==='text/html' && req.url ==='/'
            ? path.join(__dirname, 'Views', ' index.html')
            :contentType === 'text/html' && req.url.slice(-1) ==='/'
                 ?  path.join(__dirname, 'Views', ' index.html')
                 :  contentType === 'text/html'
                        ? path.join(__dirname, 'Views',  req.url)
                        : path.join(__dirname,   req.url)

      if (!extension && req.url.slice( -1 ) !== '/') filePath += '.html'

      const  fileExists = fs.existsSync ( filePath)
      if( fileExists) {

        serverFile(filePath,contentType,res)

      }else {
        switch( path.parse(filePath).base){
            case 'old-page.html':
                res. writeHead(301,{'Location': '/Views/new-page.html' })
                res.end();
                break
            case ' www-page.html':
                res.writeHead (301,{'Location': '/Views/index.html'})
                res.end()
                break
            default:
                serverFile(path.join(__dirname, 'Views', '404.html'), 'text/html', res)


        }
      }
      
      
})

     

server.listen(PORT, () => console.log(`Server  is running in ${PORT}`));


