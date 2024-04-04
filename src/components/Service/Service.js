import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
const Service = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ServiceCss className="container mx-auto ">
      <>
        <h1>
          Dịch vụ cho thuê cây cảnh sự kiện: Tại sao khách hàng tin tưởng lựa
          chọn Vườn Cây Việt?
        </h1>
        <h6>{currentTime.toLocaleString()}</h6>
        <h1>Thuê cây cảnh sự kiện, tại sao không?</h1>
        <h4>
          Bạn đang chuẩn bị tổ chức sự kiện nào đó để tiếp thị, quảng bá hình
          ảnh cá nhân, tổ chức, công ty? Bạn đang sắp sửa cử hành hôn lễ? Hội
          nghị sắp diễn ra và bạn đang phải sắp xếp phòng họp?
        </h4>
        <h4>
          Vấn đề đặt ra là, bạn đang rất cần số lượng lớn cây cảnh để trang trí
          cho sự kiện của mình thêm hoành tráng, long trọng, nhưng túi tiền lại
          có hạn. Thêm vào đó, việc mua cây cảnh sử dụng cho một lần là quá phí
          phạm. Quả là đau đầu đúng không nào?
        </h4>
        <img
          src="https://vuoncayviet.com/data/items/1160/cho-thue-cay-canh-su-kien-3.jpg"
          alt="anhne"
        />
        <h4>
          Thật ra, giải quyết vấn đề này không hề khó. Chỉ cần bạn lựa chọn một
          cửa hàng uy tín, và đến đó thuê cây cảnh sự kiện. Thay vì mua, khi bạn
          đi thuê cây cảnh, sẽ có rất nhiều lợi ích mà chắc chắn kể ra bạn sẽ
          gật gù tán thành:
        </h4>
        <ul>
          <li>
            Tiết kiệm chi phí cho việc trang trí vì giá thuê rẻ hơn rất nhiều
            lần so với giá trị thực của cây.
          </li>
          <li>
            Không lo lắng về vấn đề vận chuyển: đổ vỡ, nặng nhọc hay đường xa.
          </li>
          <li>
            Không cần bỏ thời gian tìm hiểu và chăm sóc cây để giữ sự xanh tốt
            suốt những ngày sự kiện diễn ra.
          </li>
          <li>
            Tuyệt đối an toàn cho người tham gia sự kiện, bởi nếu không am hiểu
            về cây cảnh, có thể bạn sẽ lựa nhầm cây có độc.
          </li>
          <li>
            Được tư vấn miễn phí việc lựa chọn loại cây phù hợp với loại sự kiện
            và cách bày trí sắp xếp sao cho đẹp mắt.
          </li>
        </ul>
        <img
          src="https://vuoncayviet.com/data/items/1160/cho-thue-cay-canh-su-kien-4.jpg"
          alt="anhthu2ne"
        />
        <h4>
          Nếu bạn đồng ý với những điều đã nói ở trên, vậy thì việc quan trọng
          hơn là, nên thuê cây cảnh sự kiện ở đâu?
        </h4>
        <h4>
          Hiện nay thị trường cây cảnh rất sôi động với nhiều cửa hàng, công ty,
          nhà vườn. Trước khi thuê cây bạn cần tìm hiểu kỹ địa điểm đó có uy tín
          hay không. Thế nhưng, nhan nhản cơ sở như vậy, từ online đến offline,
          mà bạn lại đang cần gấp rút. Đơn giản thôi, HÃY ĐỂ KHÁCH HÀNG ĐÁNH GIÁ
          CHẤT LƯỢNG SẢN PHẨM.
        </h4>
      </>
    </ServiceCss>
  );
};

export default Service;

const ServiceCss = styled.div`
  margin-top: 100px;
  html {
    font-family: Arial, Helvetica, sans-serif;
  }
  h1 {
    color: rgb(37, 204, 37);
  }
  .img {
    align-items: center;
  }
`;
