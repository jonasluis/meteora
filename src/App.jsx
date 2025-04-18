import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import PaginaErro from "./pages/PaginaErro";
import { CarrinhoProvider } from "./context/CarrinhoContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="*" element={<PaginaErro />} />
        </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  );
}

export default App;
