
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/PagamentoStatus.css';

function PagamentoPendente() {
  const [searchParams] = useSearchParams();

  return (
    <div className="status-container pending">
      <div className="status-box">
        <h2>Pagamento Pendente ⏳</h2>
        <p>Seu pagamento está aguardando confirmação.</p>
        <p>Se você pagou com boleto, pode levar até 2 dias úteis para aprovação. Assim que for aprovado, o status do seu contrato será atualizado.</p>
        <div className="payment-info">
            <p>ID do Pagamento: {searchParams.get('payment_id')}</p>
        </div>
        <Link to="/contratos" className="home-button">Ver meus contratos</Link>
      </div>
    </div>
  );
}

export default PagamentoPendente;