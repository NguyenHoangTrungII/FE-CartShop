import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import QtyButton from "../QtyButton/QtyButton";
import { removeFromCart, updateQuantity } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function CartItem({ itemData }) {
  const dispatch = useDispatch();
  const productImgStyle = {
    backgroundColor: itemData.color || "rgb(212, 215, 214)",
  };

  const fetching = async () => {
    try {
      await dispatch(removeFromCart(itemData._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = () => {
    fetching();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("item-img")} style={productImgStyle}>
        <img src={itemData.image} className={cx("img")} alt={itemData.name} />
      </div>
      <div className={cx("item-content")}>
        <label className={cx("item-name")}>{itemData.name}</label>
        <label className={cx("item-price")}>${itemData.price}</label>
        <div className={cx("item-bottom")}>
          <div className={cx("qty-button")}>
            <QtyButton product={itemData} updateQuantity={updateQuantity} />
          </div>
          <div className={cx("item-trash")} onClick={() => handleRemove()}>
            <img src={require("../../assets/icons/trash.png")} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
