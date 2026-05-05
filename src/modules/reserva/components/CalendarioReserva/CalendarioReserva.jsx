import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import "./calendario.css"; 

registerLocale('pt-BR', ptBR);

export default function CalendarioReserva({ startDate, endDate, onChange, datasBloqueadas }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="tcc-calendar-container">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        locale="pt-BR"
        excludeDates={datasBloqueadas}
        minDate={new Date()}
        monthsShown={isDesktop ? 2 : 1}
      />
    </div>
  );
}