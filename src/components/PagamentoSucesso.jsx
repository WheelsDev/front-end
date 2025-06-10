
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/PagamentoStatus.css';

function PagamentoSucesso() {
  const [searchParams] = useSearchParams();

  return (
    <div className="status-container success">
      <div className="status-box">
        <h2>Pagamento Aprovado! ✅</h2>
        <p>Sua transação foi concluída com sucesso. Em breve, o status do seu contrato será atualizado.</p>
        <p>Obrigado por escolher a WheelsBike!</p>
        <div className="payment-info">
          <p>ID do Pagamento: {searchParams.get('payment_id')}</p>
          <p>ID Externo (Contrato): {searchParams.get('external_reference')}</p>
        </div>
        <Link to="/contratos" className="home-button">Ver meus contratos</Link>
      </div>
    </div>
  );
}

export default PagamentoSucesso;