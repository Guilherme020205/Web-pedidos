import { useState } from "react";
import { api } from "../../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { msgInfo } from "./../../../../alerts";

function NewOrder() {
  const [description, setDescription] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1 }]);

  const navigate = useNavigate();

  async function creatorder(e) {
    e.preventDefault();

    try {
      if (!description.trim()) {
        return msgInfo("Descrição é obrigatória!");
      }

      if (!receiptDate) {
        return msgInfo("Data de recebimento é obrigatória!");
      }

      if (!returnDate) {
        return msgInfo("Data de devolução é obrigatória!");
      }

      if (
        items.length === 0 ||
        items.some((item) => !item.name.trim() || item.quantity < 1)
      ) {
        return msgInfo(
          "Preencha corretamente todos os itens (nome e quantidade)!"
        );
      }

      const response = await api.post("/order/creat", {
        description,
        receipt_date: receiptDate,
        return_date: returnDate,
        items,
      });

      setDescription("");
      setReceiptDate("");
      setReturnDate("");
      setItems([{ name: "", quantity: 1 }]);

      navigate("/home/order");
    } catch (error) {
      console.error(error);
    }
  }

  function updateItem(index, key, value) {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { name: "", quantity: 1 }]);
  }

  function removeItem(index) {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  }

  return (
    <div className="py-10 px-5 select-none">
      <ToastContainer stacked />
      <div className=" flex flex-col gap-2">
        <Link
          to={"/home/order"}
          className="bg-slate-400 flex items-center justify-center w-28 py-1 rounded-md 
            border-[2px] border-transparent 
            hover:bg-slate-100 hover:border-slate-400 hover:border-solid transition duration-700"
        >
          ← Voltar
        </Link>
        <p className="text-xl font-bold">Novo pedido</p>
      </div>
      <form onSubmit={creatorder} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-200 px-2 py-1 w-96 rounded-md border border-gray-300"
        />

        <div className="flex flex-row gap-1">
          <div>
            <p>Data recebimento</p>
            <input
              type="date"
              value={receiptDate}
              onChange={(e) => setReceiptDate(e.target.value)}
              className="bg-slate-200 w-40 px-2 py-1 rounded-md border border-gray-300"
            />
          </div>

          <div>
            <p>Data devolução</p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="bg-slate-200 w-40 px-2 py-1 rounded-md border border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Item"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="bg-slate-200 px-2 py-1 rounded-md border border-gray-300"
              />
              <input
                type="number"
                placeholder="Qtd"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateItem(index, "quantity", parseInt(e.target.value))
                }
                className="bg-slate-200 px-2 py-1 w-20 rounded-md border border-gray-300"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 text-sm"
                >
                  Remover
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="text-primary-scooter_600 underline text-sm"
          >
            + Adicionar item
          </button>
        </div>

        <button
          type="submit"
          className="bg-primary-scooter_400 px-4 py-2 rounded-md 
                border-[2px] border-transparent 
                hover:bg-primary-scooter_100 hover:border-primary-scooter_400 hover:border-solid transition duration-700"
        >
          Criar pedido
        </button>
      </form>
    </div>
  );
}

export default NewOrder;
