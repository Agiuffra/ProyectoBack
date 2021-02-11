const Multer = require('multer');

module.exports = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        // bytes*1024=kilobytes*1024=megabytes
        fileSize: 5*1024*1024
    }
});