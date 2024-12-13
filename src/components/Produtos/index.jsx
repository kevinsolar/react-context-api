import React, { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
   const { carrinho, setCarrinho } = useContext(CarrinhoContext);//usando o hook para pegar meu contexto e desestruturando os meus estados.

   function adicionarProduto(novoProduto) {
      const temProduto = carrinho.some((itemDoCarrinho) => {
         itemDoCarrinho.id === novoProduto.id;
      });

      if (!temProduto) {//essa eh a verificacao que vai se encarregar de saber se ja tem o produto no carrinho, se nao tiver vai adicionar o produto a um carrinho ja existente.
         novoProduto.quantidade = 1;
         return setCarrinho((carrinhoAnterior) => [
            ...carrinhoAnterior,
            novoProduto,
         ])
      }

      setCarrinho((carrinhoAnterior) =>//Aqui eu pego mue carrinho anterior, verifico se ja tinha o produto, tendo la ele so adiciona mais uma quantidade.
         carrinhoAnterior.map((itemDoCarrinho) => {//usando map para criar um novo array.
            if (itemDoCarrinho.id === novoProduto.id)//Se o item do carrinho for igual ao produto adicionado, ele vai incrementar a quantidade.
               itemDoCarrinho.quantidade += 1;
            return itemDoCarrinho;
         })
      )
   }

   return (
      <section role="produtos" aria-label="Produtos que estão bombando!">
         <Titulo>Produtos que estão bombando!</Titulo>
         <div className="container row mx-auto">
            {produtos.map((produto) => (
               <Produto
                  key={produto.id}
                  {...produto}
                  adicionarProduto={adicionarProduto}
               />
            ))}
         </div>
      </section>
   );
};

export default Produtos;
