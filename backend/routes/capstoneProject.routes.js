const UserController = require('../controllers/user.controller');
const ContentController = require('../controllers/content.controller');

module.exports = (app) => {
    //User routes
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    app.get('/api/getLoggedInUser', UserController.getLoggedInUser);
    app.get('/api/users', UserController.getUsers);
    app.delete('/api/users/:id', UserController.deleteUser);
    
    //Content routes
    app.get('/api/contents', ContentController.getContents);
    app.post('/api/contents', ContentController.createContent);
    app.get('/api/contents/:id', ContentController.getContentsById);
    app.delete('/api/contents/:id', ContentController.deleteContent);
    app.put('/api/contents/:id', ContentController.updateContent);

}