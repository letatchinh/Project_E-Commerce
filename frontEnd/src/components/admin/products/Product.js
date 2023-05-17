import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../redux/admin/Actions/ProductActions";
import StyledRating from "../../client/StyledRating";
import { toast, ToastContainer } from "react-toastify";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
      toast("Xoá thành công");
    }
  };

  return (
    <>
      {!product ? <ToastContainer /> : ""}
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={`/images/${product.images[active]}`} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            {product.discount === 0 && (
              <div className="price mb-2 price-box">
                {product.price < 1000
                  ? "$" + product.price
                  : product.price.toLocaleString() + "VND"}
              </div>
            )}
            {product.discount !== 0 && (
              <div className="price mb-2 price-box">
                {product.price < 1000
                  ? "$" + product.newPrice
                  : (
                      product.price *
                      ((100 - product.discount) / 100)
                    ).toLocaleString() + "VND"}
                <sup className="price-old">
                  {product.price < 1000
                    ? "$" + product.price
                    : product.price.toLocaleString() + "VND"}
                </sup>
              </div>
            )}
            <div className="product-rating">
              <StyledRating value={product.rating} readOnly />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "5px",
                  marginBottom: "-10px",
                  position: "relative",
                  top: "-4px",
                }}
              >
                ({product.numReviews})
              </span>
            </div>
            <div className="price mb-2">Loại: {product.category}</div>
            <div className="price mb-2">
              Số lượng trong kho: {product.countInStock}
            </div>
            {product.discount > 0 && (
              <div className="dicount mb-2">-{product.discount}%</div>
            )}
            <div className="price mb-2">
              Số lượng đã bán: {product.quantitySold}
            </div>
            <div className="price mb-2" style={{ whiteSpace: "nowrap" }}>
              Giá gốc:{" "}
              <span className=" price-box">
                {product.price < 1000
                  ? "$" + product.pricePure
                  : ((product.price * 80) / 100).toLocaleString() + "VND"}
              </span>
            </div>
            {/* <div className="row productImageSub">
              {product.images.map((e, i) => (
                <img
                  key={i}
                  src={`/images/${e}`}
                  alt="Product"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "30px",
                    marginBottom: "10px",
                    marginRight: "3px",
                    padding: "0",
                    border: active === i ? "1px solid #000" : "",
                    boxSizing: "border-box",
                  }}
                  onClick={() => setActive(i)}
                />
              ))}
            </div> */}
            <div className="row">
              <Link
                to={`/admin/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>

              <Link
                to="#"
                onClick={() => deleteHandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
