import React from "react";

const StockForm = ({
  className,
  labelText,
  value,
  onClickCallback,
  onChangeFunc = null,
  inputType = "submit",
  inputValue = "Submit"
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClickCallback(value);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label>
        {labelText}
        <input
          type="text"
          value={value}
          onChange={e => onChangeFunc(e.target.value)}
        />
      </label>
      <input type={inputType} value={inputValue} />
    </form>
  );
}


export default StockForm;
