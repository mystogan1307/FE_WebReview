import React, {useRef, useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table,
  CardHeader
} from 'reactstrap';

function useOutsideAlerter(ref, toggle) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if(event.target.className === "modal fade show"){
      toggle();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  });
}

function ModalInfo(props) {
  const { isOpen, name, productDetail, toggle } = props;
  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, toggle);
  return (
    <Modal isOpen={isOpen}   >
      <ModalHeader>Thông số kỹ thuật chi tiết {name}</ModalHeader>
      <ModalBody>
        <div >
          <CardHeader className="header-product-detail">Màn hình</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Công nghệ màn hình</td>
                <td>{productDetail.screen ? productDetail.screen.screenTechnology : ""}</td>
              </tr>
              <tr>
                <td>Độ phân giải</td>
                <td>{productDetail.screen ? productDetail.screen.resolution : ""}</td>
              </tr>
              <tr>
                <td>Màn hình rộng</td>
                <td>{productDetail.screen ? productDetail.screen.size : ""}</td>
              </tr>
              <tr>
                <td>Mặt kính cảm ứng</td>
                <td>{productDetail.screen ? productDetail.screen.touchScreen : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Camera sau</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Độ phân giải</td>
                <td>{productDetail.mainCamera ? productDetail.mainCamera.resolution : ""}</td>
              </tr>
              <tr>
                <td>Quay phim</td>
                <td>{productDetail.mainCamera ? productDetail.mainCamera.video : ""}</td>
              </tr>
              <tr>
                <td>Đèn Flash</td>
                <td>{productDetail.mainCamera ? productDetail.mainCamera.flash ? "Có" : "Không" : ""}</td>
              </tr>
            </tbody>
          </Table>
            
          <CardHeader className="header-product-detail">Camera trước</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Độ phân giải</td>
                <td>{productDetail.selfieCamera ? productDetail.selfieCamera.resolution : ""}</td>
              </tr>
              <tr>
                <td>Quay phim</td>
                <td>{productDetail.selfieCamera ? productDetail.selfieCamera.video : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Hệ điều hành - CPU</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Hệ điều hành</td>
                <td>{productDetail.platform ? productDetail.platform.os : ""}</td>
              </tr>
              <tr>
                <td>Chipset (hãng SX CPU)</td>
                <td>{productDetail.platform ? productDetail.platform.chipset : ""}</td>
              </tr>
              <tr>
                <td>Tốc độ CPU</td>
                <td>{productDetail.platform ? productDetail.platform.cpu : ""}</td>
              </tr>
              <tr>
                <td>Chip đồ họa (GPU)</td>
                <td>{productDetail.platform ? productDetail.platform.gpu : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Bộ nhớ & Lưu trữ</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>RAM</td>
                <td>{productDetail.memory ? productDetail.memory.ram : ""}</td>
              </tr>
              <tr>
                <td>Bộ nhớ trong</td>
                <td>{productDetail.memory ? productDetail.memory.rom : ""}</td>
              </tr>
              <tr>
                <td>TThẻ nhớ ngoài</td>
                <td>{productDetail.memory ? productDetail.memory.cardSlot : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Kết nối</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>SIM</td>
                <td>{productDetail.comms ? productDetail.comms.sim : ""}</td>
              </tr>
              <tr>
                <td>Wifi</td>
                <td>{productDetail.comms ? productDetail.comms.wifi : ""}</td>
              </tr>
              <tr>
                <td>GPS</td>
                <td>{productDetail.comms ? productDetail.comms.gps : ""}</td>
              </tr>
              <tr>
                <td>Bluetooth</td>
                <td>{productDetail.comms ? productDetail.comms.bluetooth : ""}</td>
              </tr>
              <tr>
                <td>Jack tai nghe</td>
                <td>{productDetail.comms ? productDetail.comms.jack : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Thiết kế & Trọng lượng</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Thiết kế</td>
                <td>{productDetail.body ? productDetail.body.build : ""}</td>
              </tr>
              <tr>
                <td>Kích thước</td>
                <td>{productDetail.body ? productDetail.body.dimensions : ""}</td>
              </tr>
              <tr>
                <td>Trọng lượng</td>
                <td>{productDetail.body ? productDetail.body.weight : ""}</td>
              </tr>
            </tbody>
          </Table>

          <CardHeader className="header-product-detail">Thông tin pin</CardHeader>
          <Table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Dung lượng pin</td>
                <td>{productDetail.battery ? productDetail.battery.capacity : ""}</td>
              </tr>
              <tr>
                <td>Loại pin</td>
                <td>{productDetail.battery ? productDetail.battery.type : ""}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} >Hủy</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalInfo;
