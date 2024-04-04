import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {
  const [showForm, setShowForm] = useState(false); // State để kiểm soát việc hiển thị form
  const [showCartList, setShowCartList] = useState(true); // State để kiểm soát việc hiển thị danh sách sản phẩm trong giỏ hàng
  const [selectedProductInfo, setSelectedProductInfo] = useState(null); // Biến để lưu thông tin sản phẩm được chọn
  const [orderSuccess, setOrderSuccess] = useState(false); // State để kiểm soát việc hiển thị thông báo đặt hàng thành công
  const [userLocation, setUserLocation] = useState(''); // State để lưu trữ địa chỉ người dùng
  const [userPhone, setUserPhone] = useState(''); // State để lưu trữ số điện thoại người dùng

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  const handleThanhToanClick = (selectedProduct) => {
    // Xoá sản phẩm khỏi giỏ hàng khi click vào nút "Thanh toán"
    handleRemoveFromCart(selectedProduct._id);
    // Lưu thông tin của sản phẩm được chọn
    setSelectedProductInfo(selectedProduct);
    // Cập nhật danh sách sản phẩm trong giỏ hàng chỉ bao gồm các sản phẩm chưa được click để đặt hàng
    const updatedCart = cart.filter(
      (product) => product._id !== selectedProduct._id,
    );
    setCart(updatedCart);
    // Hiển thị form
    setShowForm(true);
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
    }\nMô tả: ${selectedProductInfo.overview}\nGiá: ${
      selectedProductInfo.price
    }\nĐịa chỉ: ${userLocation}\nSố điện thoại: ${userPhone}`;

    emailjs
      .sendForm('service_qm2224r', 'template_g508xbg', form.current, {
        to_email: userEmail, // Sử dụng địa chỉ email của người dùng
        publicKey: 'QvkxCLR2QEfTosGdc',
        message: messageContent, // Thêm thông tin sản phẩm vào nội dung email
      })
      .then(
        () => {
          console.log('SUCCESS!');
          // Ẩn form khi gửi email thành công
          setShowForm(false);
          // Hiển thị thông báo đặt hàng thành công
          setOrderSuccess(true);
          // Ẩn thông báo sau 1 giây
          saveDataToDatabase();
          setTimeout(() => {
            setOrderSuccess(false);
          }, 1000);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  // eslint-disable-next-line no-unused-vars
  const saveDataToDatabase = () => {
    const userName = form.current.user_name.value;
    const productName = selectedProductInfo.title || selectedProductInfo.name;
    const productQuantity = selectedProductInfo.quantity || 1;

    axios
      .post('https://api-caycanh.vercel.app/api/info', {
        name: productName,
        price: selectedProductInfo.price,
        quantity: productQuantity,
        location: userLocation,
        phone: userPhone,
        nameUser: userName,
      })
      .then((response) => {
        console.log('Data saved to database:', response.data);
        // Hiển thị thông báo đặt hàng thành công
        setOrderSuccess(true);
        setTimeout(() => {
          setOrderSuccess(false);
        }, 1000);
      })
      .catch((error) => {
        console.error('Failed to save data to database:', error);
      });
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
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="user_location"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
            />{' '}
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="user_phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />{' '}
            <label>Thông tin đơn hàng</label>
            <textarea
              name="message"
              value={
                selectedProductInfo
                  ? `Tên sản phẩm: ${
                      selectedProductInfo.title || selectedProductInfo.name
                    }\nGiá: ${selectedProductInfo.price}đ\nSố lượng: ${
                      selectedProductInfo.quantity || 1
                    }\nĐịa chỉ: ${userLocation}\nSố điện thoại: ${userPhone}`
                  : ''
              }
              readOnly
            />
            <input type="submit" value="Đặt Hàng" />
            <input
              type="button"
              value="Thoát"
              onClick={handleExitButtonClick}
            />
          </form>
        </StyledContactForm>
      )}
      {showCartList && (
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h3>Danh sách sản phẩm trong giỏ hàng</h3>
              {Array.isArray(cart) && cart.length > 0 ? (
                <>
                  <span>
                    Lưu ý do kiện hàng là "Cây" nên quý khách vui lòng điền đủ
                    thông tin cần thiết để chúng tôi có thể hỗ trợ bạn sớm nhất
                    !
                  </span>
                  <div className="">
                    {cart.map((selectedProduct, index) => (
                      <div key={selectedProduct._id} className="">
                        <div className="carda">
                          <div className="stt-column">{index + 1}.</div>{' '}
                          <img
                            src={
                              selectedProduct.poster_path ||
                              '../assets/images/products/s4.jpg'
                            }
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body1 ">
                            <h5 className="card-title fw-semibold ">
                              {selectedProduct.title || selectedProduct.name}
                            </h5>
                            <p className="card-text limit-lines">
                              {selectedProduct.overview}
                            </p>
                            <div className="soluong">
                              <label htmlFor="quantity">Số lượng:</label>
                              <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                defaultValue="1"
                              />
                            </div>
                            <div className="btn-css">
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  handleThanhToanClick(selectedProduct)
                                }
                              >
                                Đặt Hàng
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleRemoveFromCart(selectedProduct._id)
                                }
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <span>Bạn chưa có sản phẩm trong giỏ hàng!</span>
              )}
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
  .limit-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-body h3 {
    margin-top: 56px;
  }
  .carda {
    display: Flex;
    align-items: center;
    border-bottom: 0.1px solid #333;
    padding: 20px 0;
    h5 {
      width: 30%;
      text-align: center;
    }
  }
  .card-img-top {
    width: 10%;
    margin-right: 20px;
  }

  .soluong {
    margin-bottom: 10px;
    label {
      widht: 40px;
      padding-left: 10px;
    }
    input {
      width: 50px;
      text-align: center;
      margin-left: 10px;
    }
  }
  .stt-column {
    margin: 0 10px;
    font-weight: bold;
    width: 5%;
  }
`;

const StyledContactForm = styled.div`
  .card-body1 {
    width: 80%;
    margin-left: 30px;
  }
  padding: 10px;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 10px;
  .btn-css {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 20% !important;
    }
  }
  .card-title {
    margin-top: 10px !important;
    margin-bottom: 0 !important;
    text-align: center;
    width: 40%;
  }

  .card-body {
    display: flex !important;
    align-items: center;
    h3 {
      font-size: 16px;
    }
  }
  width: 400px;
  margin: 80px auto;
  display: block;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    background-color: #5ba503;
    padding: 10px;
    border-radius: 10px;
    color: white;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      color: #333;
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 120px;
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

    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
