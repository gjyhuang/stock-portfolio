import React from "react";

const StockSelectForm = ({stockToBuy, setStockToBuy, getStock}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    getStock(stockToBuy);
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
