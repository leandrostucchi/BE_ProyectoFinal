import { Router } from 'express';
import sessionsController from '../applicationserver/controllers/sessions.controller.js';
import { passportCall } from '../utils/utils.js';
import mailController from '../applicationserver/controllers/mail.controller.js';

const sessionRouter = Router();

sessionRouter.get('/register',sessionsController.registerInit);
sessionRouter.post('/register',sessionsController.register);

sessionRouter.get('/login',sessionsController.loginInit);
sessionRouter.post('/login',passportCall('login'),sessionsController.login);

sessionRouter.get('/current',sessionsController.current);
sessionRouter.get('/unprotectedLogin',sessionsController.unprotectedLogin);
sessionRouter.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

sessionRouter.get('/passwordRestore',sessionsController.passwordRestoreInit);
sessionRouter.post('/passwordRestore',sessionsController.passwordRestore);

sessionRouter.get('/mail', mailController.mail);

export default sessionRouter;