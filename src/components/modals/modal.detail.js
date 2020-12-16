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

function ModalDetail(props) {
  const { isOpen, name, productDetail, toggle } = props;
  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, toggle);
  return (
    <Modal isOpen={isOpen}  className="min-width-modal-detail" >
      <ModalHeader>Đánh giá chi tiết {name}</ModalHeader>
      <ModalBody>
        <div >
            <p style={{whiteSpace: "pre-line"}}>
            <div dangerouslySetInnerHTML={{__html: productDetail.review}} />
             </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} >Đóng</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDetail;
