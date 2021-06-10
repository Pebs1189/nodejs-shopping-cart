/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error, port) =>  {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        default:
        throw error;;
    }
};

module.exports = {
    onError
}