import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const RegistrationForm = ({ onLoginSuccess, setLoggedInUser }) => {
  const [formType, setFormType] = useState("login");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationResult, setRegistrationResult] = useState(null);
  const [loginResult, setLoginResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkExistingEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://api-express-inky.vercel.app/api/${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api-express-inky.vercel.app/api/${userData.email}`
      );

      if (response.status === 200) {
        const user = response.data;

        if (user.password === userData.password) {
          // Xác minh rằng người dùng là admin trước khi đăng nhập
          if (
            userData.email === "lenhathao280302@gmail.com" &&
            userData.password === "A12345"
          ) {
            // Đây là admin, gọi hàm onLoginSuccess để thông báo đăng nhập thành công và chuyển trang
            onLoginSuccess(user);
          } else {
            // Không phải admin, xử lý như người dùng thông thường
            setLoginResult("Đăng nhập thành công!");
            setRegistrationResult(null);
            onLoginSuccess(user);
          }
        } else {
          setLoginResult("Đăng nhập thất bại. Mật khẩu không đúng.");
          setRegistrationResult(null);
        }
      } else {
        setLoginResult("Đăng nhập thất bại. Người dùng không tồn tại.");
        setRegistrationResult(null);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setLoginResult("Đăng nhập thất bại. Vui lòng thử lại sau.");
      setRegistrationResult(null);
    }
  };

  const switchForm = () => {
    setFormType(formType === "register" ? "login" : "register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(userData.password)) {
      setRegistrationResult(
        "Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ in hoa và một chữ số."
      );
      return;
    }

    if (userData.password !== confirmPassword) {
      setRegistrationResult("Mật khẩu không khớp.");
      return;
    }

    const existingUser = await checkExistingEmail(userData.email);
    if (existingUser) {
      setRegistrationResult("Email đã được đăng ký. Vui lòng chọn email khác.");
      return;
    } else {
      setRegistrationResult(null);
    }

    try {
      const response = await axios.post(
        "http://localhost:3008/api/register",
        userData
      );

      if (response.status === 201) {
        setRegistrationResult("Chúc mừng bạn đã đăng ký thành công!");
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setTimeout(() => {
          setFormType("login");
        }, 500);
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      setRegistrationResult("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  return (
    <RegistrationFormContainer>
      <div className="form-register container mt-5">
        <form
          className="form-register-main"
          onSubmit={formType === "login" ? handleLogin : handleSubmit}>
          {formType === "login" && (
            <div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Đăng nhập
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={switchForm}>
                Đăng ký ngay
              </button>
            </div>
          )}
          {formType === "register" && (
            <div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="btn">
                <button type="submit" className="btn btn-primary">
                  Đăng ký
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={switchForm}>
                  Đăng nhập ngay
                </button>
              </div>
            </div>
          )}
        </form>
        {registrationResult && (
          <div
            className={`alert ${
              registrationResult.includes("thành công")
                ? "alert-success"
                : "alert-danger"
            } mt-3`}>
            {registrationResult}
          </div>
        )}
        {loginResult && (
          <div
            className={`alert ${
              loginResult.includes("thành công")
                ? "alert-success"
                : "alert-danger"
            } mt-3`}>
            {loginResult}
          </div>
        )}
      </div>
    </RegistrationFormContainer>
  );
};

// Styled-components cho component
const RegistrationFormContainer = styled.div`
  margin-top: 2%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .form-register{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-register-main {
    margin: 0 0 0 0;
    padding: 20px;
    border: 5px solid #ccc;
    border-radius: 10px;
    margin: 0 0 0 0;
    padding: 20px;
    border: 5px solid #ccc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width:50%;
}

    // Styled-components cho button
    button {
      background-color: #000;
      color: #ccc;
      border-radius: 10px;
      cursor: pointer;
      margin: 10px 0; 
    }

    button:hover {
      background-color: #ccc;
      color: #000;
    }

    .btn{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      flex-direction: column;
    }
  }

  .mb-3 {
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      margin: 0 5px 0 0;
      font-size: 12px;
      width: 30%;
      font-weight: bold;
    }
    input {
      outline:none;
    }

  }
  .alert{
    text-align: center;
    margin: 5px 0 0 0;
  }
`;

// Export component
export default RegistrationForm;
