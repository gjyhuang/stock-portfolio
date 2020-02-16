import React from "react";

const StockSelectForm = (props) => {
  const {stockToBuy, setStockToBuy} = props;

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form className="stockSelectForm" onSubmit={handleSubmit}>
      <label>
        Stock Ticker:
        <input
          type="text"
          value={stockToBuy}
          onChange={e => setStockToBuy(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}


export default StockSelectForm;
