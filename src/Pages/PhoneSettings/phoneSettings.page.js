import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  Label,
  Input,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { FormattedNumber } from "react-intl";
import { Redirect } from "react-router-dom";

import { appConfig } from "../../configs/app.config";
import { getProducts } from "../../actions/phone.action";
import { getLabelList } from "../../actions/label.action";
import phoneApi from "../../api/phone.api";
import Modal from "../../components/modals/modal";
import ModalConfirm from "../../components/modals/modal.comfirm";

class PhoneSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isShowModalConfirm: false,
      isOpenDropdownLabel: false,
      isOpenDropdownSort: false,
      phoneItem: {
        flash: true,
      },
      params: {
        skip: 0,
      },
      indexPagination: 0,
      limit_products: 8,
    };
  }

  toggleModal = (title = "", phoneItem = {}) => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      title,
      phoneItem,
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      isShowModalConfirm: !this.state.isShowModalConfirm,
    });
  };

  onHandleChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let phoneItem = Object.assign({}, this.state.phoneItem);
    phoneItem[inputName] = inputValue;
    this.setState({
      phoneItem,
    });
  };

  FileOnChange = (event) => {
    let phoneItem = Object.assign({}, this.state.phoneItem);
    var name = event.target.name;
    var value = event.target.files[0];
    phoneItem[name] = value;
    this.setState({
      phoneItem,
    });
  };

  showAddNew = () => {
    let title = "Thêm mới";
    this.toggleModal(title, { flash: true });
  };

  savePhone = () => {
    const { id } = this.state.phoneItem;
    if (id) {
      this.updatePhone();
    } else {
      this.addPhone();
    }
  };

  handlePhoneData = (phoneItem) => {
    let phone = {};
    phone.name = phoneItem.name ? phoneItem.name.trim() : phoneItem.name;
    phone.review = phoneItem.reivew
      ? phoneItem.review.trim()
      : phoneItem.review;
    phone.label = phoneItem.label;
    phone.price = phoneItem.price;
    phone.screen = {
      screenTechnology: phoneItem.screenTechnology
        ? phoneItem.screenTechnology.trim()
        : phoneItem.screenTechnology,
      resolution: phoneItem.screenResolution
        ? phoneItem.screenResolution.trim()
        : phoneItem.screenResolution,
      size: phoneItem.size ? phoneItem.size.trim() : phoneItem.size,
      touchScreen: phoneItem.touchScreen
        ? phoneItem.touchScreen.trim()
        : phoneItem.touchScreen,
    };
    phone.mainCamera = {
      resolution: phoneItem.mainCameraResolution
        ? phoneItem.mainCameraResolution.trim()
        : phoneItem.mainCameraResolution,
      video: phoneItem.mainCameraVideo
        ? phoneItem.mainCameraVideo.trim()
        : phoneItem.mainCameraVideo,
      flash: phoneItem.flash,
    };
    phone.selfieCamera = {
      resolution: phoneItem.selfieCameraResolution
        ? phoneItem.selfieCameraResolution.trim()
        : phoneItem.selfieCameraResolution,
      video: phoneItem.selfieCameraVideo
        ? phoneItem.selfieCameraVideo.trim()
        : phoneItem.selfieCameraVideo,
    };
    phone.platform = {
      os: phoneItem.os ? phoneItem.os.trim() : phoneItem.os,
      chipset: phoneItem.chipset ? phoneItem.chipset.trim() : phoneItem.chipset,
      cpu: phoneItem.cpu ? phoneItem.cpu.trim() : phoneItem.cpu,
      gpu: phoneItem.gpu ? phoneItem.gpu.trim() : phoneItem.gpu,
    };
    phone.memory = {
      ram: phoneItem.ram ? phoneItem.ram.trim() : phoneItem.ram,
      rom: phoneItem.rom ? phoneItem.rom.trim() : phoneItem.rom,
      cardSlot: phoneItem.cardSlot
        ? phoneItem.cardSlot.trim()
        : phoneItem.cardSlot,
    };
    phone.comms = {
      sim: phoneItem.sim ? phoneItem.sim.trim() : phoneItem.sim,
      wifi: phoneItem.wifi ? phoneItem.wifi.trim() : phoneItem.wifi,
      gps: phoneItem.gps ? phoneItem.gps.trim() : phoneItem.gps,
      bluetooth: phoneItem.bluetooth
        ? phoneItem.bluetooth.trim()
        : phoneItem.bluetooth,
      jack: phoneItem.jack ? phoneItem.jack.trim() : phoneItem.jack,
    };
    phone.body = {
      dimensions: phoneItem.dimensions
        ? phoneItem.dimensions.trim()
        : phoneItem.dimensions,
      weight: phoneItem.weight ? phoneItem.weight.trim() : phoneItem.weight,
      build: phoneItem.build ? phoneItem.build.trim() : phoneItem.build,
    };
    phone.battery = {
      type: phoneItem.type ? phoneItem.type.trim() : phoneItem.type,
      capacity: phoneItem.capacity
        ? phoneItem.capacity.trim()
        : phoneItem.capacity,
    };
    return phone;
  };

  addPhone = async () => {
    const { image } = this.state.phoneItem;
    let phoneItem = Object.assign({}, this.state.phoneItem);
    try {
      let phone = this.handlePhoneData(phoneItem);
      phone.image = await this.uploadImage(image);
      await phoneApi.addPhone(phone);
      this.props.getProducts();
      this.toggleModal("", { flash: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  updatePhone = async () => {
    try {
      const { phoneItem } = this.state;
      let phoneUpdate = this.handlePhoneData(phoneItem);
      if (typeof phoneItem.image === "object") {
        phoneUpdate.image = await this.uploadImage(phoneItem.image);
      }
      await phoneApi.updateProductById(phoneItem.id, phoneUpdate);
      this.props.getProducts();
      this.toggleModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  uploadImage = async (image) => {
    try {
      let imageResult = await phoneApi.uploadFile(image);
      return imageResult.filename;
    } catch (error) {
      console.log(error.message);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.savePhone();
  };

  componentDidMount() {
    this.props.getProducts();
    this.props.getLabel();
  }

  onClickPhone = async (id) => {
    try {
      const { phoneItem } = this.state;
      let phoneResult = await phoneApi.getProductById(id);

      phoneItem.id = id;
      phoneItem.name = phoneResult.product.name;
      phoneItem.number = phoneResult.product.number;
      phoneItem.label = phoneResult.product.label;
      phoneItem.price = phoneResult.product.price;
      phoneItem.image = phoneResult.product.image;
      phoneItem.review = phoneResult.productDetail.review;

      const { productDetail } = phoneResult;
      if (productDetail.screen) {
        phoneItem.screenTechnology = productDetail.screen.screenTechnology;
        phoneItem.screenResolution = productDetail.screen.resolution;
        phoneItem.size = productDetail.screen.size;
        phoneItem.touchScreen = productDetail.screen.touchScreen;
      }
      if (productDetail.mainCamera) {
        phoneItem.mainCameraResolution = productDetail.mainCamera.resolution;
        phoneItem.mainCameraVideo = productDetail.mainCamera.video;
        phoneItem.flash = productDetail.mainCamera.flash;
      }
      if (productDetail.selfieCamera) {
        phoneItem.selfieCameraResolution =
          productDetail.selfieCamera.resolution;
        phoneItem.selfieCameraVideo = productDetail.selfieCamera.video;
      }
      if (productDetail.platform) {
        phoneItem.os = productDetail.platform.os;
        phoneItem.chipset = productDetail.platform.chipset;
        phoneItem.cpu = productDetail.platform.cpu;
        phoneItem.gpu = productDetail.platform.gpu;
      }
      if (productDetail.memory) {
        phoneItem.rom = productDetail.memory.rom;
        phoneItem.ram = productDetail.memory.ram;
        phoneItem.cardSlot = productDetail.memory.cardSlot;
      }
      if (productDetail.comms) {
        phoneItem.sim = productDetail.comms.sim;
        phoneItem.wifi = productDetail.comms.wifi;
        phoneItem.gps = productDetail.comms.gps;
        phoneItem.bluetooth = productDetail.comms.bluetooth;
        phoneItem.jack = productDetail.comms.jack;
      }
      if (productDetail.body) {
        phoneItem.dimensions = productDetail.body.dimensions;
        phoneItem.weight = productDetail.body.weight;
        phoneItem.build = productDetail.body.build;
      }
      if (productDetail.battery) {
        phoneItem.type = productDetail.battery.type;
        phoneItem.capacity = productDetail.battery.capacity;
      }

      this.toggleModal("Chỉnh sửa", phoneItem);
    } catch (error) {
      console.log(error.message);
    }
  };

  onClickDeletePhone = (id) => {
    try {
      this.setState(
        {
          phoneItem: {
            id,
          },
        },
        () => this.toggleDeleteModal()
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  deletePhone = async () => {
    try {
      const { id } = this.state.phoneItem;
      await phoneApi.deleteProductById(id);
      this.props.getProducts();
      this.toggleDeleteModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  onSearchChange = (e) => {
    const { params } = this.state;
    params.name = e.target.value;
    this.setState(
      {
        params,
      },
      () => {
        // this.props.getProducts(this.state.params)
      }
    );
  };

  onClickSearch = () => {
    const { params } = this.state;
    this.props.getProducts(params);
  };

  toggleDropdownLabel = () => {
    this.setState({
      isOpenDropdownLabel: !this.state.isOpenDropdownLabel,
    });
  };

  onClickSelectLabel = (labelId, labelName) => {
    const { params } = this.state;
    params.label = labelId;
    params.labelName = labelName;
    params.skip = 0;
    this.setState(
      {
        params,
        indexPagination: 0,
      },
      () => {
        this.props.getProducts(this.state.params);
      }
    );
  };

  toggleDropdownSort = () => {
    this.setState({
      isOpenDropdownSort: !this.state.isOpenDropdownSort,
    });
  };

  onClickSelectSort = (sort) => {
    const { params } = this.state;
    params.sort = sort;
    this.setState(
      {
        params,
      },
      () => this.props.getProducts(this.state.params)
    );
  };

  onClickPagination = (number, index) => {
    const { params, indexPagination, limit_products } = this.state;
    const { phoneTotal } = this.props.data;
    let newIndexPagination = indexPagination;
    params.skip = limit_products * (number - 1);

    if (index === "-" && indexPagination > 0) {
      newIndexPagination = indexPagination - 1;
    } else if (index === "+" && params.skip + limit_products < phoneTotal) {
      newIndexPagination = indexPagination + 1;
    }
    this.setState(
      {
        params,
        indexPagination: newIndexPagination,
      },
      () => {
        this.props.getProducts(this.state.params);
      }
    );
  };

  render() {
    const {
      isOpenModal,
      phoneItem,
      title,
      isShowModalConfirm,
      isOpenDropdownLabel,
      params,
      isOpenDropdownSort,
      indexPagination,
      limit_products,
    } = this.state;
    const { data, user, label } = this.props;
    const { phoneList, phoneTotal } = data;
    const currentList = phoneList ? phoneList.length : 0;
    console.log(phoneItem);
    if (user && user.role && user.role.index !== 1) {
      return <Redirect from="/" to="/" />;
    }
    return (
      <div>
        <ModalConfirm
          isShowModal={isShowModalConfirm}
          clickOk={this.deletePhone}
          toggleModal={this.toggleDeleteModal}
        />

        <Modal
          isOpen={isOpenModal}
          toggle={(e) => this.toggleModal()}
          title={title}
          hiddenFooter={true}
        >
          <Form
            onSubmit={(e) => this.onSubmit(e)}
            ref={(c) => {
              this.form = c;
            }}
          >
            <FormGroup>
              <Row>
                <Col>
                  <Label for="name">Tên sản phẩm</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={phoneItem.name || ""}
                    onChange={this.onHandleChange}
                    required
                  />
                </Col>
                <Col>
                  <Label for="image">Image</Label>
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={this.FileOnChange}
                  />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label for="label">Nhãn hiệu</Label>
                  <Input
                    type="select"
                    name="label"
                    id="label"
                    value={phoneItem.label}
                    onChange={this.onHandleChange}
                  >
                    <option>---</option>
                    {label &&
                      label.map((val, idx) => (
                        <option key={idx} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                  </Input>
                </Col>
                <Col>
                  <Label for="price">Giá</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={phoneItem.price || ""}
                    onChange={this.onHandleChange}
                    required
                  />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label for="number">Số lượng</Label>
                  <Input
                    type="number"
                    name="number"
                    id="number"
                    value={phoneItem.number || ""}
                    onChange={this.onHandleChange}
                    required
                    min={1}
                  />
                </Col>
                <Col />
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">Màn hình</CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="screenTechnology">Công nghệ màn hình</Label>
                  <Input
                    type="text"
                    name="screenTechnology"
                    id="screenTechnology"
                    value={phoneItem.screenTechnology || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="screenResolution">Độ phân giải</Label>
                  <Input
                    type="text"
                    name="screenResolution"
                    id="screenResolution"
                    value={phoneItem.screenResolution || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="size">Màn hình rộng</Label>
                  <Input
                    type="text"
                    name="size"
                    id="size"
                    value={phoneItem.size || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="touchScreen">Mặt kính cảm ứng</Label>
                  <Input
                    type="text"
                    name="touchScreen"
                    id="touchScreen"
                    value={phoneItem.touchScreen || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Camera sau
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="mainCameraResolution">Độ phân giải</Label>
                  <Input
                    type="text"
                    name="mainCameraResolution"
                    id="mainCameraResolution"
                    value={phoneItem.mainCameraResolution || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="mainCameraVideo">Quay phim</Label>
                  <Input
                    type="text"
                    name="mainCameraVideo"
                    id="mainCameraVideo"
                    value={phoneItem.mainCameraVideo || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="flash">Đèn Flash</Label>
                  <Input
                    type="select"
                    name="flash"
                    id="flash"
                    value={phoneItem.flash}
                    onChange={this.onHandleChange}
                  >
                    <option value={true}>Có</option>
                    <option value={false}>Không</option>
                  </Input>
                </Col>
                <Col></Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Camera trước
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="selfieCameraResolution">Độ phân giải</Label>
                  <Input
                    type="text"
                    name="selfieCameraResolution"
                    id="selfieCameraResolution"
                    value={phoneItem.selfieCameraResolution || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="selfieCameraVideo">Quay phim</Label>
                  <Input
                    type="text"
                    name="selfieCameraVideo"
                    id="selfieCameraVideo"
                    value={phoneItem.selfieCameraVideo || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Hệ điều hành - CPU
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="os">Hệ điều hành</Label>
                  <Input
                    type="text"
                    name="os"
                    id="os"
                    value={phoneItem.os || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="chipset">Chipset (hãng SX CPU)</Label>
                  <Input
                    type="text"
                    name="chipset"
                    id="chipset"
                    value={phoneItem.chipset || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="cpu">Tốc độ CPU</Label>
                  <Input
                    type="text"
                    name="cpu"
                    id="cpu"
                    value={phoneItem.cpu || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="gpu">Chip đồ họa (GPU)</Label>
                  <Input
                    type="text"
                    name="gpu"
                    id="gpu"
                    value={phoneItem.gpu || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Bộ nhớ & Lưu trữ
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="ram">RAM</Label>
                  <Input
                    type="text"
                    name="ram"
                    id="ram"
                    value={phoneItem.ram || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="rom">Bộ nhớ trong</Label>
                  <Input
                    type="text"
                    name="rom"
                    id="rom"
                    value={phoneItem.rom || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="cardSlot">Thẻ nhớ ngoài</Label>
                  <Input
                    type="text"
                    name="cardSlot"
                    id="cardSlot"
                    value={phoneItem.cardSlot || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col></Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">Kết nối</CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="sim">SIM</Label>
                  <Input
                    type="text"
                    name="sim"
                    id="sim"
                    value={phoneItem.sim || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="wifi">Wifi</Label>
                  <Input
                    type="text"
                    name="wifi"
                    id="wifi"
                    value={phoneItem.wifi || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="gps">GPS</Label>
                  <Input
                    type="text"
                    name="gps"
                    id="gps"
                    value={phoneItem.gps || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="bluetooth">Bluetooth</Label>
                  <Input
                    type="text"
                    name="bluetooth"
                    id="bluetooth"
                    value={phoneItem.bluetooth || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="jack">Jack tai nghe</Label>
                  <Input
                    type="text"
                    name="jack"
                    id="jack"
                    value={phoneItem.jack || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col></Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Thiết kế & Trọng lượng
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="build">Thiết kế</Label>
                  <Input
                    type="text"
                    name="build"
                    id="build"
                    value={phoneItem.build || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="dimensions">Kích thước</Label>
                  <Input
                    type="text"
                    name="dimensions"
                    id="dimensions"
                    value={phoneItem.dimensions || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="weight">Trọng lượng</Label>
                  <Input
                    type="text"
                    name="weight"
                    id="weight"
                    value={phoneItem.weight || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col></Col>
              </Row>
            </FormGroup>

            <CardHeader className="header-product-detail">
              Thông tin pin
            </CardHeader>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="type">Dung lượng pin</Label>
                  <Input
                    type="text"
                    name="type"
                    id="type"
                    value={phoneItem.type || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
                <Col>
                  <Label for="capacity">Loại pin</Label>
                  <Input
                    type="text"
                    name="capacity"
                    id="capacity"
                    value={phoneItem.capacity || ""}
                    onChange={this.onHandleChange}
                  />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label for="type">Đánh giá chi tiết</Label>
                  {/* <textarea
                                        placeholder="Đánh giá chi tiết"
                                        rows="7" style={{width: "100%"}}
                                        name="review"
                                        value={phoneItem.review || ""} onChange={this.onHandleChange}
                                    /> */}
                  <CKEditor
                    editor={ClassicEditor}
                    data={phoneItem.review || ""}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      let phoneItem = Object.assign({}, this.state.phoneItem);
                      phoneItem.review = data;
                      this.setState({
                        phoneItem,
                      });
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </Col>
              </Row>
            </FormGroup>
            <div className="text-center border-top pt-2">
              <Button color="primary" type="submit">
                {" "}
                Xác nhận{" "}
              </Button>{" "}
              <Button
                className="btn-danger"
                onClick={(e) => this.toggleModal()}
              >
                {" "}
                Hủy{" "}
              </Button>
            </div>
          </Form>
        </Modal>
        <Row className="mt-2 mb-4 pb-2 border-bottom">
          <Col lg="2" className="mb-3 mb-xl-0">
            <Button onClick={this.showAddNew} block color="primary">
              Thêm mới
            </Button>
          </Col>
          <Col className="mb-3 mb-xl-0 d-flex align-items-center">
            <div className="ml-auto d-flex">
              <Dropdown
                isOpen={isOpenDropdownSort}
                toggle={this.toggleDropdownSort}
              >
                <DropdownToggle caret>
                  {params.sort > 0 ? "Cũ nhất" : "Mới nhất"}
                </DropdownToggle>
                <DropdownMenu className="">
                  <DropdownItem onClick={(e) => this.onClickSelectSort(-1)}>
                    Mới nhất
                  </DropdownItem>
                  <DropdownItem onClick={(e) => this.onClickSelectSort(1)}>
                    Cũ nhất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                isOpen={isOpenDropdownLabel}
                toggle={this.toggleDropdownLabel}
              >
                <DropdownToggle caret>
                  {params.labelName ? params.labelName : "Tất cả"}
                </DropdownToggle>
                <DropdownMenu className="">
                  <DropdownItem onClick={(e) => this.onClickSelectLabel()}>
                    Tất cả
                  </DropdownItem>
                  {label &&
                    label.map((val, idx) => (
                      <DropdownItem
                        onClick={(e) =>
                          this.onClickSelectLabel(val._id, val.name)
                        }
                        key={idx}
                      >
                        {val.name}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>

              <InputGroup>
                <Input
                  onChange={this.onSearchChange}
                  className="input-search"
                  type="text"
                  id="input1-group2"
                  name="search"
                  placeholder="Nhập tên điện thoại"
                />
                <InputGroupAddon addonType="prepend">
                  <Button
                    onClick={this.onClickSearch}
                    type="button"
                    color="primary"
                  >
                    <i className="fa fa-search"></i> Search
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </Col>
        </Row>

        <Row>
          {phoneList &&
            phoneList.map((val, idx) => (
              <Col key={idx} className="mb-4 phone_item" xs="12" sm="6" lg="3">
                <img
                  className="image-hover"
                  onClick={(e) => this.onClickPhone(val._id)}
                  alt=""
                  height="250"
                  width="auto"
                  src={`${appConfig.apiProductImage}/${
                    val.image ? val.image : "default-phone.png"
                  }`}
                ></img>

                <h6
                  className="pt-2 phone_setting_item"
                  onClick={(e) => this.onClickPhone(val._id)}
                >
                  {val.name.length > 30
                    ? val.name.slice(0, 28) + "..."
                    : val.name}
                </h6>
                <span>
                  <FormattedNumber value={val.price} />đ
                </span>
                <p style={{ marginBottom: "5px" }}>
                  <span>Số lượng: </span>
                  <span>{val.number}</span>
                </p>
                <Button
                  className="phone_item__button"
                  onClick={(e) => this.onClickDeletePhone(val._id)}
                  block
                  color="primary"
                >
                  Xóa
                </Button>
              </Col>
            ))}
        </Row>

        <Row>
          {phoneTotal > currentList && (
            <Col className="d-flex">
              <div className="ml-auto">
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button" />
                  </PaginationItem>
                  <PaginationItem active={params.skip === 0}>
                    <PaginationLink
                      onClick={(e) =>
                        this.onClickPagination(indexPagination + 1, "-")
                      }
                      tag="button"
                    >
                      {indexPagination + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {phoneTotal > limit_products && (
                    <PaginationItem
                      active={
                        (params.skip > 0 &&
                          params.skip + limit_products < phoneTotal) ||
                        (params.skip > 0 && phoneTotal <= limit_products * 2)
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          this.onClickPagination(indexPagination + 2)
                        }
                        tag="button"
                      >
                        {indexPagination + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {phoneTotal > limit_products * 2 && (
                    <PaginationItem
                      active={params.skip + limit_products >= phoneTotal}
                    >
                      <PaginationLink
                        onClick={(e) =>
                          this.onClickPagination(indexPagination + 3, "+")
                        }
                        tag="button"
                      >
                        {indexPagination + 3}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink next tag="button" />
                  </PaginationItem>
                </Pagination>
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.phoneList,
    user: state.auth.user,
    label: state.labelList.labelList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProducts: (params) => {
      dispatch(getProducts(params));
    },
    getLabel: () => {
      dispatch(getLabelList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSettings);
