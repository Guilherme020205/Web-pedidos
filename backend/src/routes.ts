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
import { ControllerCreatOrder } from './Controller/Orders/ControllerCreatOrder';
import { ControllerListOrders } from './Controller/Orders/ControllerListOrders';
import { ControllerListOneOrder } from './Controller/Orders/ControllerListOneOrder';
import { ControllerEditStatusOrder } from './Controller/Orders/ControllerEditStatusOrder';
import { ControllerEditObservationOrder } from './Controller/Orders/ControllerEditObservationOrder';

router.get("/status/list", new ControllerListStatus().handle)
router.get("/positions/list", new ControllerListPositions().handle)

router.post("/login", new ControllerLogin().handle)

router.post("/user/creat", authenticate, new ControllerCreatUser().handle);
router.put("/user/edit/:idUser", authenticate, new ControllerEditUser().handle)
router.get("/user/list", authenticate, new ControllerListUsers().handle)
router.get("/user/list/:idUser", authenticate, new ControllerListOneUser().handle)

router.post("/order/creat", authenticate, new ControllerCreatOrder().handle)
router.get("/order/list", authenticate, new ControllerListOrders().handle)
router.get("/order/list/:idOrder", authenticate, new ControllerListOneOrder().handle)
router.put("/order/put/status/:idOrder", authenticate, new ControllerEditStatusOrder().handle)
router.put("/order/put/observation/:idOrder", authenticate, new ControllerEditObservationOrder().handle)

export = router;