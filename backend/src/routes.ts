import { Router } from 'express'; 
import { authenticate } from './middlewares/authMiddleware';
const router = Router();

router.get('/teste', (req, res) => {
    res.send('Hello, World! Teste');
})

import { ControllerListStatus } from './Controller/Status/ControllerListStatus';
import { ControllerListPositions } from './Controller/Position/ControllerListPositions';
import { ControllerListUsers } from './Controller/User/ControllerListUsers';
import { ControllerCreatUser } from './Controller/User/ControllerCreatUser';
import { ControllerListOneUser } from './Controller/User/ControllerListOneUser';
import { ControllerEditUser } from './Controller/User/ControllerEditUser';
import { ControllerLogin } from './Controller/Login/ControllerLogin';

router.get("/list/status", new ControllerListStatus().handle)
router.get("/list/positions", new ControllerListPositions().handle)

router.post("/login", new ControllerLogin().handle)

router.post("/creat/user", authenticate, new ControllerCreatUser().handle);
router.put("/edit/user/:idUser", authenticate, new ControllerEditUser().handle)
router.get("/list/users", authenticate, new ControllerListUsers().handle)
router.get("/list/user/:idUser", authenticate, new ControllerListOneUser().handle)

export = router;