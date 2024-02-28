import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";
import { useState } from "react";
import { addToCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function ProductCard({ itemData = {} }) {
  const dispatch = useDispatch();
  const [buttonActive, setButtonActive] = useState(!itemData.inCart);
  const [isInCart, setInCart] = useState(itemData.inCart);
  const productImgStyle = {
    backgroundColor: itemData.color || "rgb(212, 215, 214)",
  };

  const fetching = async (itemData) => {
    try {
      await dispatch(addToCart(itemData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (itemData) => {
    fetching(itemData);
    handleClickOn();
  };

  const handleClickOn = () => {
    setButtonActive(!buttonActive);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-img")} style={productImgStyle}>
        <img src={itemData.image} />
      </div>
      <div className={cx("product-name")}>{itemData.name}</div>

      <div className={cx("product-description")}>{itemData.description}</div>
      <div className={cx("product-bottom")}>
        <label>${itemData.price}</label>
        <div className={cx("addToCard-button")}>
          <div
            className={cx("button", buttonActive ? " " : "inactive")}
            onClick={() => handleAddToCart(itemData)}
          >
            {buttonActive ? (
              "ADD TO CART"
            ) : (
              <img src={require("../../assets/icons/check.png")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
