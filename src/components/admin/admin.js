import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';
import AddMovieForm from '../add/add';
import { FaTimes } from 'react-icons/fa';

const Admin = () => {
  const [trees, setTrees] = useState([]);
  // eslint-disable-next-line
  const [infoHidden, setInfoHidden] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  useEffect(() => {
    axios
      .get('https://api-caycanh.vercel.app/api/info')
      .then((response) => {
        setTrees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [movies, setMovies] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const openFormAdd = () => {
    setShowFormAdd(true);
  };

  const closeFormAdd = () => {
    setShowFormAdd(false);
  };

  useEffect(() => {
    // Gửi yêu cầu GET đến API
    axios
      .get('https://api-caycanh.vercel.app/api/tree')
      .then((response) => {
        // Cập nhật trạng thái với dữ liệu từ API
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // useEffect sẽ chỉ chạy một lần sau khi component được render

  const handleDelete = async (id) => {
    try {
      // Gửi yêu cầu DELETE đến API để xoá bộ phim theo id
      const response = await axios.delete(
        `https://api-caycanh.vercel.app/api/tree/${id}`,
      );
      console.log('Delete Response:', response.data);

      // Cập nhật state bằng cách lọc ra những bộ phim không có id trùng với id đã xoá
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('user_email');

    try {
      const response = await axios.get(
        `https://api-caycanh.vercel.app/api/users/${email}`,
      );

      if (response.data) {
        // Nếu email tồn tại trong cơ sở dữ liệu
        setLoginStatus('success'); // Đặt trạng thái thành công
      } else {
        // Nếu email không tồn tại trong cơ sở dữ liệu
        setLoginStatus('fail'); // Đặt trạng thái thất bại
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginStatus('error'); // Xử lý lỗi nếu có
    }
  };

  const openInfo = () => {
    setInfoVisible(true);
  };

  const closeInfo = () => {
    setInfoVisible(false);
  };

  return (
    <AdminStyled>
      <ContactForm
        style={{ display: loginStatus === 'success' ? 'none' : 'block' }}
      >
        <form onSubmit={handleSubmit}>
          <h5>Nhập thông tin của Admin để được sử dụng quyền quản trị</h5>
          <label>Email</label>
          <input type="email" name="user_email" required />
          <label>Mật khẩu</label>
          <input type="password" name="user_password" required />
          <input type="submit" value="Submit" />
        </form>
        {loginStatus === 'success' && <p>Đăng nhập thành công!</p>}
        {loginStatus === 'fail' && <p>Email hoặc mật khẩu không chính xác.</p>}
        {loginStatus === 'error' && (
          <p>Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.</p>
        )}
      </ContactForm>
      <Info className="" style={{ display: infoVisible ? 'block' : 'none' }}>
        <Infocss hidden={infoHidden} className="container">
          <CloseButton onClick={closeInfo}>
            <FaTimes />
          </CloseButton>
          <h2>Danh sách đơn hàng cây</h2>
          <Table>
            <thead>
              <tr>
                <Th>STT</Th>
                <Th>Tên Khách Hàng</Th>
                <Th>Tên Cây</Th>
                <Th>Giá</Th>
                <Th>Số Lượng</Th>
                <Th>Địa chỉ</Th>
                <Th>Số Điện Thoại</Th>
              </tr>
            </thead>
            <tbody>
              {trees.map((tree, index) => (
                <Tr key={tree._id}>
                  <Td>{index + 1}</Td>
                  <Td>{tree.nameUser}</Td>
                  <Td>{tree.name}</Td>
                  <Td>{tree.price}</Td>
                  <Td>{tree.quantity}</Td>
                  <Td>{tree.location}</Td>
                  <Td>{tree.phone}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Infocss>
      </Info>

      <div
        className="edit"
        style={{ display: loginStatus === 'success' ? 'block' : 'none' }}
      >
        <div
          className="formAdd"
          style={{ display: showFormAdd ? 'flex' : 'none' }}
        >
          <IoCloseCircle className="formAddIcon" onClick={closeFormAdd} />
          <form>
            <AddMovieForm />
          </form>
        </div>

        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
        >
          <aside className="left-sidebar">
            <div>
              <div className="brand-logo d-flex align-items-center justify-content-between">
                <button className="text-nowrap logo-img">
                  <img
                    src="../assets/images/logos/dark-logo.svg"
                    width={180}
                    alt=""
                  />
                </button>
                <div
                  className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                  id="sidebarCollapse"
                >
                  <i className="ti ti-x fs-8" />
                </div>
              </div>
              <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                <ul id="sidebarnav">
                  <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4" />
                    <span className="hide-menu">Home</span>
                  </li>
                  <li className="sidebar-item">
                    <div
                      className="sidebar-link"
                      onClick={openFormAdd}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>
                        <i className="ti ti-layout-dashboard" />
                      </span>
                      <span className="hide-menu">Thêm cây cảnh</span>
                    </div>
                    <div
                      className="sidebar-link"
                      onClick={openInfo}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>
                        <i className="ti ti-layout-dashboard" />
                      </span>
                      <span className="hide-menu">Danh sách đặt hàng</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="body-wrapper">
            <header className="app-header">
              <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                  <li className="nav-item d-block d-xl-none">
                    <button
                      className="nav-link sidebartoggler nav-icon-hover"
                      id="headerCollapse"
                    >
                      <i className="ti ti-menu-2" />
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link nav-icon-hover">
                      <i className="ti ti-bell-ringing" />
                      <div className="notification bg-primary rounded-circle" />
                    </button>
                  </li>
                </ul>
                <div
                  className="navbar-collapse justify-content-end px-0"
                  id="navbarNav"
                >
                  <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link nav-icon-hover"
                        id="drop2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="../assets/images/profile/user-1.jpg"
                          alt=""
                          width={35}
                          height={35}
                          className="rounded-circle"
                        />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                        aria-labelledby="drop2"
                      >
                        <div className="message-body">
                          <button className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-user fs-6" />
                            <p className="mb-0 fs-3">My Profile</p>
                          </button>
                          <button className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-mail fs-6" />
                            <p className="mb-0 fs-3">My Account</p>
                          </button>
                          <button className="d-flex align-items-center gap-2 dropdown-item">
                            <i className="ti ti-list-check fs-6" />
                            <p className="mb-0 fs-3">My Task</p>
                          </button>
                          <button className="btn btn-outline-primary mx-3 mt-2 d-block">
                            Logout
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            {/*  Header End */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                  <div className="card w-100">
                    <div className="card-body p-4">
                      <h5 className="card-title fw-semibold mb-4">
                        Quản lý cây
                      </h5>
                      <span>Danh sách các cây cảnh hiển thị trong website</span>
                      <div className="">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead className="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <span className="fw-semibold mb-0">STT</span>
                              </th>
                              <th className="border-bottom-0">
                                <span className="fw-semibold mb-0">Name</span>
                              </th>
                              <th className="border-bottom-0">
                                <span className="fw-semibold mb-0">Image</span>
                              </th>
                              <th className="border-bottom-0">
                                <span className="fw-semibold mb-0">Type</span>
                              </th>
                              <th className="border-bottom-0">
                                <span className="fw-semibold mb-0">Price</span>
                              </th>
                              <th className="border-bottom-0">
                                <span />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {movies.map((movie, index) => (
                              <tr key={index}>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-1">
                                    {index + 1}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-1">
                                    {movie.name || movie.title}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() =>
                                      window.open(movie.link_film, '_blank')
                                    }
                                  >
                                    <img
                                      src={movie.poster_path}
                                      alt={movie.name}
                                      width={50}
                                    />
                                  </button>
                                </td>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">
                                    {movie.type === 'construction'
                                      ? 'Cây công trình'
                                      : movie.type === 'flower'
                                        ? 'Cây hoa'
                                        : movie.type === 'table'
                                          ? 'Cây để bàn'
                                          : ''}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0 fs-4">
                                    ${movie.price}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <h6>
                                    <button
                                      type="button"
                                      className="btn btn-warning m-1"
                                      onClick={() => handleDelete(movie._id)}
                                    >
                                      Xóa
                                    </button>
                                  </h6>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 px-6 text-center">
                <p className="mb-0 fs-4">
                  Made by{' '}
                  <button
                    target="_blank"
                    className="pe-1 text-primary text-center"
                  >
                    Nguyễn Quang Luật,Phạm Tôn Thuận,Huỳnh Thanh Phúc{' '}
                  </button>{' '}
                  with <button>Nguyễn Huỳnh Phúc Nghi và Lê Nhật Hào</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminStyled>
  );
};

export default Admin;

const AdminStyled = styled.div`
  .edit {
    display: none;
  }
  .form-info,
  .formAdd {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #c8ecc1;
    justify-content: center;

    .formAddIcon {
      position: absolute;
      top: 3%;
      right: 3%;
      cursor: pointer;
      font-size: 30px;
    }
    .formAddIcon:hover {
      color: #333;
    }
  }
`;

const ContactForm = styled.div`
  width: 400px;
  margin: 100px auto;
  display: block; /* Hiển thị form khi cần */
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    h5 {
      text-align: center;
    }

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

    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

const Info = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  background-color: #c8ecc1;
`;

const Infocss = styled.div`
  position: relative;
  width: 80%; /* điều chỉnh kích thước phù hợp */
  max-width: 800px; /* giới hạn chiều rộng tối đa */
  max-height: 80%; /* giới hạn chiều cao tối đa */
  overflow-y: auto; /* hiển thị thanh cuộn nếu nội dung quá dài */
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const Th = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;
