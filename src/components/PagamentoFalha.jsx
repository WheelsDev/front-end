import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/PagamentoStatus.css';

function PagamentoFalha() {
  const [searchParams] = useSearchParams();
  const contratoId = searchParams.get('external_reference');

  return (
    <div className="status-container failure">
      <div className="status-box">
        <h2>Pagamento Recusado ❌</h2>
        <p>Não foi possível processar seu pagamento. Nenhum valor foi cobrado.</p>
        <p>Por favor, tente novamente com outro meio de pagamento ou entre em contato com seu banco.</p>
        <div className="payment-info">
          <p>ID da Tentativa: {searchParams.get('payment_id')}</p>
        </div>
        <Link to={`/concluir-contrato/${contratoId}`} className="home-button">Tentar Novamente</Link>
      </div>
    </div>
  );
}

export default PagamentoFalha;