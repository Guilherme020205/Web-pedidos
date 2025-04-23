import { Router } from 'express';

const router = Router();

router.get('/teste', (req, res) => {
    res.send('Hello, World! Teste');
})

import { ControllerListStatus } from './Controller/Status/ControllerListStatus';
import { ControllerListUsers } from './Controller/User/ControllerListUsers';
import { ControllerCreatUser } from './Controller/User/ControllerCreatUser';
import { ControllerListOneUser } from './Controller/User/ControllerListOneUser';
import { ControllerEditUser } from './Controller/User/ControllerEditUser';

router.get("/list/status", new ControllerListStatus().handle)

router.post("/creat/user", new ControllerCreatUser().handle)
router.put("/edit/user/:idUser", new ControllerEditUser().handle)
router.get("/list/users", new ControllerListUsers().handle)
router.get("/list/user/:idUser", new ControllerListOneUser().handle)

export = router;