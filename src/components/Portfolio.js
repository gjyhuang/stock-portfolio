import React from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import StockSelectForm from './StockSelectForm';

const Portfolio = () => {
  const [stockToBuy, setStockToBuy] = React.useState("");

  return (
    <>
    <Navbar />
    <div id="main-wrapper">
      <div id="portfolio">
        <div className="">My Portfolio</div>
      </div>
      <StockSelectForm stockToBuy={stockToBuy} setStockToBuy={setStockToBuy} />
    </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const ConnectedPortfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

export default ConnectedPortfolio;
