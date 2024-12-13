import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({children}) => {
   const [carrinho, setCarrinho] = useState([]);//Tiramos o use State de Home e de qualquer outro arquivo que estava usando, pois quem vai gerenciar o estado vai ser o Carrinho, que tem o contexto.

   return (
      <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
         {children}{/* Utilizamos o children, pois o Carrinho context vai englobar todo nosso app */}
      </CarrinhoContext.Provider>
   )
}