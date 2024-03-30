import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Cart = ({ cart, setCart }) => {
  const [showForm, setShowForm] = useState(false); // State để kiểm soát việc hiển thị form
  const [showCartList, setShowCartList] = useState(true); // State để kiểm soát việc hiển thị danh sách sản phẩm trong giỏ hàng
  const [selectedProductInfo, setSelectedProductInfo] = useState(null); // Biến để lưu thông tin sản phẩm được chọn
  const [orderSuccess, setOrderSuccess] = useState(false); // State để kiểm soát việc hiển thị thông báo đặt hàng thành công

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  const handleThanhToanClick = (selectedProduct) => {
    // Xoá sản phẩm khỏi giỏ hàng khi click vào nút "Thanh toán"
    handleRemoveFromCart(selectedProduct._id);
    // Hiển thị form
    setShowForm(true);
    // Ẩn danh sách sản phẩm trong giỏ hàng
    setShowCartList(false);
    // Lưu thông tin của sản phẩm được chọn
    setSelectedProductInfo(selectedProduct);
  };

  const handleExitButtonClick = () => {
    // Ẩn form khi click vào nút "Thoát"
    setShowForm(false);
    // Hiển thị danh sách sản phẩm trong giỏ hàng
    setShowCartList(true);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Lấy giá trị email từ trường input của người dùng
    const userEmail = form.current.user_email.value;

    // Tạo nội dung email
    const messageContent = `Tên sản phẩm: ${
      selectedProductInfo.title || selectedProductInfo.name
    }\n
                             Mô tả: ${selectedProductInfo.overview}\n
                             Giá: ${selectedProductInfo.price}`;

    emailjs
      .sendForm("service_qm2224r", "template_g508xbg", form.current, {
        to_email: userEmail, // Sử dụng địa chỉ email của người dùng
        publicKey: "QvkxCLR2QEfTosGdc",
        message: messageContent, // Thêm thông tin sản phẩm vào nội dung email
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // Hiển thị thông báo đặt hàng thành công
          setOrderSuccess(true);
          // Ẩn thông báo sau 1 giây
          setTimeout(() => {
            setOrderSuccess(false);
          }, 1000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <CartCss>
      {showForm && ( // Sử dụng điều kiện render để hiển thị form
        <StyledContactForm>
          <form ref={form} onSubmit={sendEmail}>
            <label>Tên của bạn</label>
            <input type="text" name="user_name" />
            <label>Email của bạn</label>
            <input type="email" name="user_email" />
            <label>Thông tin đơn hàng</label>
            <textarea
              name="message"
              value={
                selectedProductInfo
                  ? `Tên sản phẩm: ${
                      selectedProductInfo.title || selectedProductInfo.name
                    }\nMô tả: ${selectedProductInfo.overview}\nGiá: ${
                      selectedProductInfo.price
                    }`
                  : ""
              }
              readOnly
            />{" "}
            {/* Điền thông tin sản phẩm vào ô */}
            <input type="submit" value="Đặt Hàng" />
            <input
              type="button"
              value="Thoát"
              onClick={handleExitButtonClick}
            />{" "}
            {/* Xử lý sự kiện khi click vào nút "Thoát" */}
          </form>
        </StyledContactForm>
      )}
      {showCartList && ( // Sử dụng điều kiện render để hiển thị danh sách sản phẩm
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h3>Danh sách sản phẩm trong giỏ hàng</h3>
              <div className="row">
                {Array.isArray(cart) &&
                  cart.map((selectedProduct) => (
                    <div key={selectedProduct._id} className="col-md-4">
                      <h5 className="card-title fw-semibold mb-4">
                        {selectedProduct.title || selectedProduct.name}
                      </h5>
                      <div className="card">
                        <img
                          src={
                            selectedProduct.poster_path ||
                            "../assets/images/products/s4.jpg"
                          }
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <p className="card-text">
                            {selectedProduct.overview}
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              handleThanhToanClick(selectedProduct)
                            }>
                            Thanh toán
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleRemoveFromCart(selectedProduct._id)
                            }>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {orderSuccess && (
        <div className="alert alert-success" role="alert">
          Đặt hàng thành công!
        </div>
      )}
    </CartCss>
  );
};

export default Cart;

const CartCss = styled.div`
  .card-body h3 {
    margin-top: 56px;
  }
`;

const StyledContactForm = styled.div`
  width: 400px;
  margin: 100px auto;
  display: block; /* Hiển thị form khi cần */
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
