const express = require('express');
const app = express( );
const path = require('path')
const PORT= process.env.PORT || 35000;


app.get('/' ,( req , res ) => {
    res.send('hello word ')


})

app.listen(PORT, () => console.log (` Server is running on port ${PORT}`))