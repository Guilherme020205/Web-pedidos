import React, { useState } from "react";

import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";

export default function Teste() {
  addLocale("pt", {
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dayNames: [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ],
    monthNamesShort: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ],
    today: "Hoje",
    clear: "Limpar",
  });
  
  const [dateRecebe, setDateRecebe] = useState(null);
 
  function dateCapture() {
    if (dateRecebe) {
      const ano = dateRecebe.getFullYear();
      const mes = String(dateRecebe.getMonth() + 1).padStart(2, '0');
      const dia = String(dateRecebe.getDate()).padStart(2, '0');
      alert(`${ano}-${mes}-${dia}`);
    } else {
      alert("Nenhuma data selecionada");
    }
  }
    
  return (
    <>
      <button onClick={dateCapture}>a</button>

      <div className="flex-auto">
        <label htmlFor="buttondisplay" className="font-bold block mb-2">
          Recebe
        </label>
        <Calendar
          value={dateRecebe}
          onChange={(e) => setDateRecebe(e.value)}
          locale="pt"
          showButtonBar 
          showIcon
          
        />
      </div>
    </>
  );
}
