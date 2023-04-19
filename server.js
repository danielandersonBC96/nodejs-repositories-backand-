
const express = require('express');
const app = express( );
const path = require('path')

const PORT = process.env.PORT || 3500;


app.get('^/$|/index(.html)?',( req , res ) => {

    ///res.sendFile('./Views/index.html', { root: __dirname})

    res.sendFile(path.join(__dirname, 'Views', 'index.html'))

})

app.get('/new-page(.html)?',( req , res ) => {

    ///res.sendFile('./Views/index.html', { root: __dirname})

    res.sendFile(path.join(__dirname, 'Views', 'new-page.html'))


})

app.get('/old-page(.html)?',( req , res ) => {

    ///res.sendFile('./Views/index.html', { root: __dirname})
   //  res.sendFile(path.join(__dirname, 'Views', 'new-page.html'))

    res.redirect(301 , '/new-page.html')

})

app.get ('/*', (req, res ) => {

    res.status(404).sendFile(path.join( __dirname , 'Views ', '404.html' ))



})

app.get('/hello(.html)?' ,  ( req , res , next)  => {
     console.log('attempetd to load hello.hrml')
     next()
} , ( req, res) => {

    res.send('hello world ')
})


app.listen(PORT, () => console.log (` express  is running on port ${PORT}`))
