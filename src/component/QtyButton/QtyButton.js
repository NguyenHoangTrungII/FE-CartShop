import React, { useState } from "react";
import classNames from "classnames/bind";

import { useDispatch } from "react-redux";
import styles from "./QtyButton.module.scss";
import { removeFromCart } from "../../redux/actions/cartAction";

const cx = classNames.bind(styles);

function QtyButton({
  className,
  inputStyle = "",
  updateQuantity,
  product = [],
  isQuantity = false,
  removeItem,
}) {
  const [qty, setqty] = useState(1);
  const dispatch = useDispatch();

  const handleAddQty = () => {
    const updatedQty = qty + 1;

    if (!isQuantity) {
      setqty((prevQty) => prevQty + 1);
      dispatch(updateQuantity(product._id, updatedQty, qty));
    } else {
      setqty((prevQty) => prevQty + 1);
    }
  };

  const handleMinsQty = () => {
    const updatedQty = qty - 1;
    if (qty >= 1) {
      if (!isQuantity) {
        setqty((prevQty) => prevQty - 1);
        dispatch(updateQuantity(product._id, updatedQty, qty));
      } else if (qty === 0) {
        removeItem(product._id);
      } else {
        setqty((prevQty) => prevQty - 1);
      }
    }
  };

  console.log(qty);

  return (
    <div className={cx("wrapper", className)}>
      <button
        type="button"
        className={cx("MinsQty-button")}
        onClick={() => handleMinsQty()}
      >
        <img
          src={require("../../assets/icons/minus.png")}
          className={cx("icon-minusQTY")}
          alt="123"
        />
      </button>

      <label className={cx("input", inputStyle)}>{qty}</label>

      <button
        type="button"
        className={cx("addQty-button")}
        onClick={() => handleAddQty()}
      >
        <img
          src={require("../../assets/icons/plus.png")}
          className={cx("icon-addQTY")}
          alt="123"
        />
      </button>
    </div>
  );
}

export default QtyButton;
