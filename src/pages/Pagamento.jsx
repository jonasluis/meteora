import React, { useState } from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import Titulo from "@/components/Titulo";
import { UseCarrinhoContext } from "@/hooks/useCarrinhoContext";
import { formatadorMoeda } from "@/utils/formatadorMoeda";
import Botao from "@/components/Botao";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const Pagamento = () => {
  const navigate = useNavigate();
  const { valorTotal } = UseCarrinhoContext();
  const [formaPagamento, setFormaPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [cardData, setCardData] = useState({
    numero: "",
    validade: "",
    cvc: "",
    nome: "",
  });

  const generatePixData = () => {
    // Simulando dados do PIX
    const pixKey = "12345678900";
    const pixUrl = `pix:${pixKey}?amount=${valorTotal}&description=Compra Meteora`;
    return pixUrl;
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "numero":
        // Remove espaços e valida se a entrada contém apenas números
        const cleanedValue = value.replace(/\s/g, "");
        if (!/^\d*$/.test(cleanedValue)) return;

        // Adiciona espaço a cada 4 dígitos
        const numeroFormatado = cleanedValue.replace(/(.{4})/g, "$1 ").trim();

        // Atualiza o estado
        return setCardData((prev) => ({ ...prev, [name]: numeroFormatado }));
        break;
      case "cvc":
        if (!/^\d*$/.test(value)) return;
        break;
      case "validade":
        if (!/^\d*$/.test(value.replace("/", ""))) return;
        if (
          value.length === 2 &&
          !value.includes("/") &&
          cardData.validade.length !== 3
        ) {
          return setCardData((prev) => ({
            ...prev,
            [name]: value + "/",
          }));
        }
        break;
      case "nome":
        if (!/^[A-Za-z\s]*$/.test(value)) return;
        break;
    }

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <BarraNavegacao />
      <main className="container-xxl">
        <Titulo element="h1" className="text-center fw-semibold my-3 my-md-5">
          Pagamento
        </Titulo>
        <div className="bg-black p-4 mb-4 text-light">
          <h2 className="h5 mb-3">
            Valor total: {formatadorMoeda(valorTotal)}
          </h2>

          <div className="mb-3">
            <h3 className="h6 mb-2">Forma de Pagamento:</h3>
            <div className="d-flex gap-2">
              <Botao
                variant={formaPagamento === "pix" ? "primary" : "tertiary"}
                onClick={() => {
                  setFormaPagamento("pix");
                }}
              >
                PIX
              </Botao>
              <Botao
                variant={formaPagamento === "credito" ? "primary" : "tertiary"}
                onClick={() => setFormaPagamento("credito")}
              >
                Crédito
              </Botao>
              <Botao
                variant={formaPagamento === "debito" ? "primary" : "tertiary"}
                onClick={() => setFormaPagamento("debito")}
              >
                Débito
              </Botao>
            </div>
          </div>

          {formaPagamento === "pix" && (
            <div className="text-center mb-3">
              <QRCodeSVG value={generatePixData()} size={256} />
              <p className="mt-2">Link do PIX: {generatePixData()}</p>
            </div>
          )}

          {(formaPagamento === "credito" || formaPagamento === "debito") && (
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label">Número do Cartão:</label>
                <input
                  type="text"
                  className="form-control"
                  name="numero"
                  value={cardData.numero}
                  onChange={handleCardInputChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength="19" // 16 digits + 3 spaces
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Validade:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="validade"
                    value={cardData.validade}
                    onChange={handleCardInputChange}
                    placeholder="MM/AA"
                    maxLength="5"
                  />
                </div>
                <div className="col">
                  <label className="form-label">CVC:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleCardInputChange}
                    maxLength="3"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Nome no Cartão:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={cardData.nome}
                  onChange={handleCardInputChange}
                />
              </div>
              {formaPagamento === "credito" && (
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
            </div>
          )}

          <Botao
            variant="primary"
            className="w-100 mt-3"
            disabled={
              !formaPagamento ||
              ((formaPagamento === "credito" || formaPagamento === "debito") &&
                (!cardData.numero ||
                  !cardData.validade ||
                  !cardData.cvc ||
                  !cardData.nome))
            }
            onClick={() => {
              alert("Pagamento processado!");
              navigate("/"); // ou "/home", depende da sua rota principal
            }}
          >
            Confirmar Pagamento
          </Botao>
        </div>
      </main>
    </>
  );
};

export default Pagamento;
