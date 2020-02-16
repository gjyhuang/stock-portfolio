import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {STOCK_API_KEY} from '../../keys';
import Navbar from './Navbar';
import StockSelectForm from './StockSelectForm';
import StockSelected from './StockSelected';

const Portfolio = () => {
  const [stockToBuy, setStockToBuy] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState({});

  // makes IEX API call for the selected stock and sets it to state
  // pass object down to StockSelected component
  const getStock = async (name) => {
    name = name.toUpperCase();
    try {
      const URL = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${name}&types=quote&range=1m&last=5&&token=${STOCK_API_KEY}`;
      const dataFetch = await axios.get(URL);
      const stock = dataFetch.data[name]
      if (stock) setSelectedStock(stock.quote);
    } catch (err) {
      console.error(err);
    }
  }

  console.log('selectedStock >>>>', selectedStock)

  return (
    <>
    <Navbar />
    <div id="main-wrapper">
      <div id="portfolio">
        <div className="">My Portfolio</div>
      </div>
      <StockSelectForm stockToBuy={stockToBuy} setStockToBuy={setStockToBuy} getStock={getStock} />
      <StockSelected selectedStock={selectedStock} fetchSelectedStock={setSelectedStock}/>
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
