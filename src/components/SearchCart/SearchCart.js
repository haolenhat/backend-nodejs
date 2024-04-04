import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  margin: 20px;
  margin-top: 100px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

function UserInfoTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [infoUser, setInfoUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api-caycanh.vercel.app/api/info/${searchTerm}`,
      );
      setInfoUser(response.data);
      setError('');
    } catch (error) {
      setInfoUser(null);
      setError(
        'Không tìm thấy thông tin người dùng cho số điện thoại đã nhập.',
      );
    }
  };

  return (
    <Container className="container">
      <Input
        type="text"
        placeholder="Nhập số điện thoại để tìm kiếm thông tin sản phẩm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Tìm kiếm</Button>
      {infoUser && (
        <Table>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Tên sản phẩm</TableHeader>
              <TableHeader>Tên người dùng</TableHeader>
              <TableHeader>Giá</TableHeader>
              <TableHeader>Số lượng</TableHeader>
              <TableHeader>Địa chỉ</TableHeader>
              <TableHeader>Số điện thoại</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr key={infoUser._id}>
              <TableCell>{infoUser._id}</TableCell>
              <TableCell>{infoUser.name}</TableCell>
              <TableCell>{infoUser.nameUser}</TableCell>
              <TableCell>{infoUser.price}</TableCell>
              <TableCell>{infoUser.quantity}</TableCell>
              <TableCell>{infoUser.location}</TableCell>
              <TableCell>{infoUser.phone}</TableCell>
            </tr>
          </tbody>
        </Table>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

export default UserInfoTable;
