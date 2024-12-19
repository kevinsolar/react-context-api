import { useContext, useEffect } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
	const {
		carrinho,
		setCarrinho,
		quantidade,
		setQuantidade,
		valorTotal,
		setValorTotal,
	} = useContext(CarrinhoContext); //usando o hook para pegar meu contexto e desestruturando os meus estados.

	function mudarQuantidade(id, quantidade) {
		return carrinho.map((itemDoCarrinho) => {
			if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
			return itemDoCarrinho;
		});
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

	function removerProdutoCarrinho(id) {
		// Aqui utilizaremos o filter, para criar um  novo array com todos os produtos na lista do carrinho, assim vamos fazer uma função que vai retornar(receber/ter) a comparação do id do item do carrinho com o id do parametro, retornando o que não for igual ao que já está lá, ou seja, retirando ele da lista, assim fazendo a função de excluir.
		// Basicamente ele vai comparar o id que foi passado como parametro atraves do click no item, com o id do item atual, se for igual, ele vai retornar todos os itens anteriores, menos o que for igual
		const produto = carrinho.filter(
			(itemDoCarrinho) => itemDoCarrinho.id !== id
		);
		setCarrinho(produto);
	}

	useEffect(() => {
		const { totalTemp, quantidadeTemp } = carrinho.reduce(
			(acumulador, produto) => ({
				quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
				totalTemp:
					acumulador.totalTemp + produto.preco * produto.quantidade,
			}),
         {
            quantidadeTemp: 0,
            totalTemp: 0,
         }
		);
      setQuantidade(quantidadeTemp);
      setValorTotal(totalTemp);
	}, [carrinho]);

	return {
		carrinho,
		setCarrinho,
		adicionarProduto,
		removerProduto,
		removerProdutoCarrinho,
      valorTotal,
      quantidade,
	};
};
