import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
	const { carrinho, setCarrinho } = useContext(CarrinhoContext); //usando o hook para pegar meu contexto e desestruturando os meus estados.

   function mudarQuantidade(id, quantidade) {
      return carrinho.map((itemDoCarrinho) => {
         if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
         return itemDoCarrinho;
      })
   }

	function adicionarProduto(novoProduto) {
		const temProduto = carrinho.some((itemDoCarrinho) => {
			return itemDoCarrinho.id === novoProduto.id;
		});

		if (!temProduto) {
			//essa eh a verificacao que vai se encarregar de saber se ja tem o produto no carrinho, se nao tiver vai adicionar o produto a um carrinho ja existente.
			novoProduto.quantidade = 1;
			return setCarrinho((carrinhoAnterior) => [
				...carrinhoAnterior,
				novoProduto,
			]);
		}

      const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);

		setCarrinho([...carrinhoAtualizado]);
	}

	function removerProduto(id) {
		const produto = carrinho.find(
			(itemDoCarrinho) => itemDoCarrinho.id === id
		);
		const ehOUltimo = produto.quantidade === 1;
		if (ehOUltimo) {
			return setCarrinho((carrinhoAnterior) =>
				carrinhoAnterior.filter(
					(itemDoCarrinho) => itemDoCarrinho.id !== id
				)
			);
		}

      const carrinhoAtualizado = mudarQuantidade(id, -1);

		setCarrinho([...carrinhoAtualizado]);
	}

	return {
		carrinho,
		setCarrinho,
		adicionarProduto,
      removerProduto,
	};
};
