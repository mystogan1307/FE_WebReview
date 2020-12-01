import React, { Component } from 'react';
import { Row, Col, Carousel, CarouselControl, CarouselItem } from "reactstrap";
import { FormattedNumber } from "react-intl";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {appConfig} from "../../configs/app.config";
import {getProducts} from "../../actions/phone.action";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndexLatestPhone: 0,
      activeIndexMostComment: 0,
      lengthCarousel: 2
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount(){
    this.props.getProducts({homepage: true})
  }  

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  nextLatestPhone = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndexLatestPhone === this.state.lengthCarousel - 1 ? 0 : this.state.activeIndexLatestPhone + 1;
    this.setState({ activeIndexLatestPhone: nextIndex });
  }

  previousLatestPhone = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndexLatestPhone === 0 ? this.state.lengthCarousel - 1 : this.state.activeIndexLatestPhone - 1;
    this.setState({ activeIndexLatestPhone: nextIndex });
  }

  // activeIndexMostComment

  nextMostComment = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndexMostComment === this.state.lengthCarousel - 1 ? 0 : this.state.activeIndexMostComment + 1;
    this.setState({ activeIndexMostComment: nextIndex });
  }

  previousMostComment = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndexMostComment === 0 ? this.state.lengthCarousel - 1 : this.state.activeIndexMostComment - 1;
    this.setState({ activeIndexMostComment: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndexLatestPhone: newIndex });
  }

  render() {
    const {activeIndexLatestPhone, activeIndexMostComment} = this.state;
    const {phoneList, phonetByComment} = this.props.data;
    const itemsLatestPhone = [{data: []}, {data: []}]
    const itemsMostCommet = [{data: []}, {data: []}]
    
    if (phoneList){
      itemsLatestPhone[0].data = phoneList.slice(0, 4);
      itemsLatestPhone[1].data = phoneList.slice(4, 9);
    }
    const slidesLatestPhone = itemsLatestPhone.map((item, idx) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={idx}
        >
          <Row>
            {item.data.map((val, index) => 
              <Col key={val._id} className="phone_item" xs="12" sm="6" lg="3">
                <NavLink to={`/dien-thoai/${val._id}`}>
                    <img className="image-hover" alt="" height="250" width="auto" src={`${appConfig.apiProductImage}/${val.image ? val.image : 'default-phone.png'}`} ></img>
                    <h6 className="pt-2">{val.name.length > 30 ? val.name.slice(0, 28) + "..." : val.name}</h6>
                </NavLink>
                <span className="text-danger"><FormattedNumber value={val.price}/> đ</span>
                <p>{val.commentAmount} bình luận</p>
              </Col>
            )}
          </Row>
        </CarouselItem>
      );
    });

    if (phonetByComment){
      itemsMostCommet[0].data = phonetByComment.slice(0, 4);
      itemsMostCommet[1].data = phonetByComment.slice(4, 9);
    }
    const slidesMostComment = itemsMostCommet.map((item, idx) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={idx}
        >
          <Row>
            {item.data.map((val, index) => 
              <Col key={val._id} className="phone_item" xs="12" sm="6" lg="3">
                <NavLink to={`/dien-thoai/${val._id}`}>
                    <img className="image-hover" alt="" height="250" width="auto" src={`${appConfig.apiProductImage}/${val.image ? val.image : 'default-phone.png'}`} ></img>
                    <h6 className="pt-2">{val.name.length > 30 ? val.name.slice(0, 28) + "..." : val.name}</h6>
                </NavLink>
                <span className="text-danger"><FormattedNumber value={val.price}/> đ</span>
                <p>{val.commentAmount} bình luận</p>
              </Col>
            )}
          </Row>
        </CarouselItem>
      );
    });
    return (
      <div className="animated fadeIn">
        <h3 className="text-primary border-bottom d-flex align-items-center pt-2">Mới nhất</h3>
        <Carousel activeIndex={activeIndexLatestPhone} next={this.nextLatestPhone} previous={this.previousLatestPhone}>
          {/* <CarouselIndicators items={itemsLatestPhone} activeIndex={activeIndexLatestPhone} onClickHandler={this.goToIndex} /> */}
          {slidesLatestPhone}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previousLatestPhone} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.nextLatestPhone} />
        </Carousel>

        <h3 className="text-primary border-bottom d-flex align-items-center pt-2">Nhiều bình luận nhất</h3>
        <Carousel activeIndex={activeIndexMostComment} next={this.nextMostComment} previous={this.previousMostComment}>
          {/* <CarouselIndicators items={itemsLatestPhone} activeIndex={activeIndexLatestPhone} onClickHandler={this.goToIndex} /> */}
          {slidesMostComment}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previousMostComment} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.nextMostComment} />
        </Carousel>
        
        {/* <h3 className="text-primary border-bottom d-flex align-items-center pt-2">Quan tâm nhất</h3>
        <Row>
          <Col className="" xs="12" sm="6" lg="3">
            <NavLink to="/dien-thoai/123">
              <img  alt="" height="250" width="auto" src="https://images.fpt.shop/unsafe/fit-in/192x192/filters:quality(90):fill(white)/cdn.fptshop.com.vn/Uploads/Originals/2019/8/8/637008693100566121_SS-note-10-pl-dd-1.png" ></img>
            </NavLink>
              <h4 className="pt-2">Samsung galaxy</h4>
              <span><FormattedNumber value={800000} /> - <FormattedNumber value={1000000} /></span>
          </Col>

          <Col className="" xs="12" sm="6" lg="3">
              <img alt="" height="250px" width="auto" src="https://cdn.tgdd.vn/Products/Images/42/207641/samsung-galaxy-a50s-green-400x400.jpg" ></img>
              
              <h4 className="pt-2">Card Title</h4>
              <span><FormattedNumber value={800000} /> - <FormattedNumber value={1000000} /></span>
          </Col>

          <Col xs="12" sm="6" lg="3">.col</Col>
          <Col xs="12" sm="6" lg="3">.col</Col>
        </Row> */}
        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.phoneList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getProducts: (params) => {
          dispatch(getProducts(params))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);