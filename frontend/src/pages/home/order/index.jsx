import { Link } from "react-router";
import {
  useUserId,
  useUserPosition,
} from "../../../context/PositionValidation";
import { Accordion, AccordionTab } from "primereact/accordion";
import ListOrders from "./listOrder/listOrders";
function ScreenOrder() {
  const userId = useUserId();
  const cargo = useUserPosition();
  return (
    <div
      className="
      py-10 px-5 select-none"
    >
      <div
        className="
      flex flex-row justify-between items-center mb-5
      "
      >
        <h2 className="text-xl">ScreenOrder</h2>
        <Link
          // to={"/home/order"}
          // onClick={saveEdit}
          className="bg-blue-400 text-xs flex items-center justify-center py-1 px-3 rounded-md border-[2px] border-transparent hover:bg-blue-100 hover:border-blue-400 hover:border-solid transition duration-700"
        >
          Novo Pedido
        </Link>
      </div>
      <div>
        <div className="block sm:hidden">
          <div className="flex flex-col justify-between">
            {cargo !== "u" && (
              <Accordion>
                <AccordionTab
                  className="border p-3 rounded-md shadow-sm"
                  header={
                    <div className="px-5">
                      <p>Todos os pedidos</p>
                    </div>
                  }
                >
                  <ListOrders esperaProps="null" />
                </AccordionTab>
              </Accordion>
            )}
            <Accordion activeIndex={0}>
              <AccordionTab
                className="border p-3 rounded-md shadow-sm"
                header={
                  <div className="px-5">
                    <p>Meus pedidos</p>
                  </div>
                }
              >
                <ListOrders esperaProps={userId} />
              </AccordionTab>
            </Accordion>
          </div>
        </div>

        <div className="hidden sm:block p-10">
          <div className="flex flex-row justify-between">
            {cargo !== "u" && <ListOrders esperaProps="null" />}
            <ListOrders esperaProps={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenOrder;
