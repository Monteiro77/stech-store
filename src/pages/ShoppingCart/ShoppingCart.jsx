import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeProvider.jsx";

const Container = styled.div`
  height: 90vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ darkMode }) => (darkMode ? "#13276e" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#081747")};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-family: "Tinos", serif;
  font-weight: 400;
  text-transform: uppercase;
`;

const EmptyMessage = styled.p`
  text-align: center;
`;

const ContinueShopping = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#007bff")};
  text-decoration: none;
`;

const CartItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#fff" : "#ddd")};
  padding: 10px 0;
  flex-wrap: wrap;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  margin-left: 10px;
  word-break: break-word;

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    margin-left: 5px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: ${({ darkMode }) => (darkMode ? "#ffd700" : "#000")};
  }

  span {
    margin: 0 10px;
  }

  @media (max-width: 768px) {
    span {
      margin: 0 5px;
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.2rem;
`;

const Total = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
  align-self: flex-end;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CheckoutButton = styled.button`
  display: block;
  width: 50%;
  padding: 10px;
  background: ${({ darkMode }) => (darkMode ? "#ffd700" : "#28a745")};
  color: ${({ darkMode }) => (darkMode ? "#081747" : "white")};
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? "#fff" : "#218838")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContainerInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const groupedCart = storedCart.reduce((acc, item) => {
      const existingItem = acc.find((p) => p.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    setCart(groupedCart);
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart.flatMap((item) => Array(item.quantity).fill(item))));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart.flatMap((item) => Array(item.quantity).fill(item))));
    toast.success("Item removido do carrinho!");
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.preco * item.quantity, 0).toFixed(2);
  };

  const finalizePurchase = () => {
    toast.success("Compra Finalizada!");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Container darkMode={darkMode}>
      <ToastContainer />
      <Title darkMode={darkMode}>Seu Carrinho</Title>
      <ContainerInfo>
        {cart.length === 0 ? (
          <>
            <EmptyMessage>Seu carrinho está vazio.</EmptyMessage>
            <ContinueShopping darkMode={darkMode} to="/produtos">
              Continuar Comprando
            </ContinueShopping>
          </>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem darkMode={darkMode} key={item.id}>
                <img src={item.fotoProduto} alt={item.nomeProduto} />
                <ItemInfo>
                  <h3>{item.nomeProduto}</h3>
                  <p>Preço: R$ {item.preco.toFixed(2)}</p>
                </ItemInfo>
                <QuantityControl darkMode={darkMode}>
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <MdRemove />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <MdAdd />
                  </button>
                </QuantityControl>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <MdDelete />
                </RemoveButton>
              </CartItem>
            ))}

            <Total>Total: R$ {getTotal()}</Total>
            <ContinueShopping darkMode={darkMode} to="/produtos">
              Continuar Comprando
            </ContinueShopping>

            <CheckoutButton darkMode={darkMode} onClick={finalizePurchase}>
              Finalizar Compra
            </CheckoutButton>
          </>
        )}
      </ContainerInfo>
    </Container>
  );
};

export default ShoppingCart;
