import React from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, 
} from 'reactstrap';

import "../../index.css"

function ModalAdd(props) {
  const {
    isOpen,
    className,
    toggle,
    children,
    title,
    hiddenFooter
  } = props;


  return (
    <div>
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          {!hiddenFooter && 
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Thêm</Button>{' '}
              <Button color="secondary" onClick={toggle}>Hủy</Button>
            </ModalFooter>
          }
        </Modal>
    </div>
  )
}

export default ModalAdd;
