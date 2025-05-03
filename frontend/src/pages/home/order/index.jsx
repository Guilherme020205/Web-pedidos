import {
  useUserId,
  useUserPosition,
} from "../../../context/PositionValidation";

import ListOrders from "./listOrder/listOrders";
function ScreenOrder() {
  const userId = useUserId();
  const cargo = useUserPosition();
  return (
    <div className="py-10 px-32 select-none">
      <h2>ScreenOrder</h2>
      <div className="flex flex-row justify-between">
        {cargo !== "u" && <ListOrders esperaProps="null" />}
        <ListOrders esperaProps={userId} />
      </div>
    </div>
  );
}

export default ScreenOrder;
