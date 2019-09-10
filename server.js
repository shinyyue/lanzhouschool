var express = require('express')
var app = express()
app.use(express.static('dist'))
app.get('./', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.listen(9002, function() {
    // 监听9001端口，监听成功后打印
    console.log('server is running...')
})
