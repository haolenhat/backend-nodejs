import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

// Styled Components
import styled from 'styled-components';

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
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

const TreeTable = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    axios.get('https://api-caycanh.vercel.app/api/info')
      .then(response => {
        setTrees(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClose = () => {
    // Điều khiển đóng modal ở đây
  };

  return (
    <Info className='a'>
    <Infocss className='container' style={{  }}>
      <CloseButton onClick={handleClose}>
        <FaTimes />
      </CloseButton>
      <h2>Danh sách đơn hàng cây</h2>
      <Table>
        <thead>
          <tr>
            <Th>STT</Th>
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

  );
};

export default TreeTable;



const Infocss = styled.div`
top: 0;
left: 0;
bottom: 0;
bottom: 0;

right: 0;
`


const Info = styled.div`
.a {
    width: 100%;
    height: 100%;
}

`
