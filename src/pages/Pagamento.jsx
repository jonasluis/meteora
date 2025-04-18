
import React, { useState } from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import Titulo from "@/components/Titulo";
import { UseCarrinhoContext } from "@/hooks/useCarrinhoContext";
import { formatadorMoeda } from "@/utils/formatadorMoeda";
import Botao from "@/components/Botao";

const Pagamento = () => {
  const { valorTotal } = UseCarrinhoContext();
  const [formaPagamento, setFormaPagamento] = useState('');
  const [parcelas, setParcelas] = useState(1);

  return (
    <>
      <BarraNavegacao />
      <main className="container-xxl">
        <Titulo element="h1" className="text-center fw-semibold my-3 my-md-5">
          Pagamento
        </Titulo>
        <div className="bg-black p-4 mb-4 text-light">
          <h2 className="h5 mb-3">Valor total: {formatadorMoeda(valorTotal)}</h2>
          
          <div className="mb-3">
            <h3 className="h6 mb-2">Forma de Pagamento:</h3>
            <div className="d-flex gap-2">
              <Botao
                variant={formaPagamento === 'pix' ? 'primary' : 'tertiary'}
                onClick={() => setFormaPagamento('pix')}
              >
                PIX
              </Botao>
              <Botao
                variant={formaPagamento === 'credito' ? 'primary' : 'tertiary'}
                onClick={() => setFormaPagamento('credito')}
              >
                Crédito
              </Botao>
              <Botao
                variant={formaPagamento === 'debito' ? 'primary' : 'tertiary'}
                onClick={() => setFormaPagamento('debito')}
              >
                Débito
              </Botao>
            </div>
          </div>

          {formaPagamento === 'credito' && (
            <div className="mb-3">
              <label className="form-label">Parcelas:</label>
              <select 
                className="form-select" 
                value={parcelas} 
                onChange={(e) => setParcelas(Number(e.target.value))}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}x de {formatadorMoeda(valorTotal / (i + 1))}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Botao
            variant="primary"
            className="w-100 mt-3"
            onClick={() => alert('Pagamento processado!')}
          >
            Confirmar Pagamento
          </Botao>
        </div>
      </main>
    </>
  );
};

export default Pagamento;
