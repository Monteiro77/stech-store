import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const Container = styled.div`
  max-width: 2000px;
  height: 90vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #081747;
  font-size: 2rem;
  font-weight: bold;
  text-align: start;
  text-transform: uppercase;
`;

const ProductWrapper = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  height: 550px; /* Altura fixa */
  position: relative; /* Para posicionar a imagem dentro */
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease;


  &:hover {
    transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Faz a imagem cobrir toda a div sem distorção */
  
 
`;



const ProductInfo = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3f58ad;
  margin: 10px 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const ButtonQuantity = styled.button`
  background-color: #3f58ad;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #081747;
  }
`;

const SelectQuantity = styled.select`
  font-size: 1.2rem;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
`;

const PaymentOptions = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const BackButton = styled.button`
  background: #081747;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 20px;

  &:hover {
    background: #3f58ad;
  }
`;

const AddToCartButton = styled.button`
  background: #3f58ad;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 20px;

  &:hover {
    background: #081747;
  }
`;

const ModalButton = styled.button`
  background: #081747;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #3f58ad;
  }
`;

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Contagem do carrinho
    const [quantity, setQuantity] = useState(1); // Quantidade do produto
    const [paymentMethod, setPaymentMethod] = useState("cartao"); // Método de pagamento (cartão ou pix)
    const product = location.state?.product;

    useEffect(() => {
        Modal.setAppElement('#root');
        // Carregar a contagem de itens do carrinho ao iniciar
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
    }, []);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        // Atualizar a contagem de itens no carrinho imediatamente
        setCartCount(cart.length);
        setIsModalOpen(true);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, e.target.value); // Impede quantidade negativa
        setQuantity(newQuantity);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const calculatePrice = () => {
        const originalPrice = product.preco || 0;
        if (paymentMethod === "pix") {
            return originalPrice * 0.95; // Desconto de 5% no Pix
        }
        return originalPrice;
    };

    return (
        <Container>
            <ProductWrapper>
                <ProductImageWrapper>
                    <ProductImage
                        src={product.fotoProduto || "https://via.placeholder.com/400"}
                        alt={product.nomeProduto || "Produto"}
                    />
                </ProductImageWrapper>

                <ProductInfo>
                    <Title>{product.nomeProduto || "Produto"}</Title>
                    <Price>R$ {calculatePrice().toFixed(2)}</Price>
                    <p>{product.descricao || "Descrição não disponível."}</p>

                    {/* Controle de Quantidade */}
                    <QuantityControl>
                        <SelectQuantity value={quantity} onChange={handleQuantityChange}>
                            {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </SelectQuantity>
                    </QuantityControl>

                    <PaymentOptions>
                        <h4>Forma de Pagamento</h4>
                        <Label>
                            <RadioInput
                                type="radio"
                                name="paymentMethod"
                                value="cartao"
                                checked={paymentMethod === "cartao"}
                                onChange={() => setPaymentMethod("cartao")}
                            />
                            Cartão de Crédito
                        </Label>
                        <Label>
                            <RadioInput
                                type="radio"
                                name="paymentMethod"
                                value="pix"
                                checked={paymentMethod === "pix"}
                                onChange={() => setPaymentMethod("pix")}
                            />
                            Pix (5% de Desconto)
                        </Label>
                    </PaymentOptions>

                    <ContainerButton>
                        <AddToCartButton onClick={handleAddToCart}>
                            Adicionar ao Carrinho
                        </AddToCartButton>
                        <BackButton onClick={() => navigate("/produtos")}>Voltar</BackButton>
                    </ContainerButton>
                </ProductInfo>
            </ProductWrapper>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Produto Adicionado"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        width: '300px',
                        height: "150px",
                        margin: 'auto',
                    },
                }}
            >
                <h3>Produto Adicionado ao Carrinho!</h3>
                <ModalButton onClick={closeModal}>Fechar</ModalButton>
            </Modal>
        </Container>
    );
};

export default ProductDetails;
