const createError = require('http-errors');

const userRoutes = require('./user')
const authRoutes = require('./auth')

module.exports = (app) => {
    app.use('/user', userRoutes)
    app.use('/auth', authRoutes)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        let errorCode = err.status || 500;
        res.status(errorCode);
        res.json({
            message: err.message
        });
    });
  

    return app
}