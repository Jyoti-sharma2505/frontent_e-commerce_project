import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import "../index.css";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import { useState } from "react";
import "../index.css";
import * as bootstrap from "bootstrap"; // ✅ Import full Bootstrap

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, loading, error, handleSubmit } = useEcommerceContext();

  // Local state
  const [add, setAdd] = useState({
    qty: "1",
    size: "M",
  });

  // Change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Find product
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;

  const product = data?.getAll?.find((item) => item?._id === productId);
  if (!product) return <p>Product not found</p>;

  const similar = data?.getAll?.filter(
    (item) =>
      item.subCategory === product.subCategory && item._id !== product._id
  );

  // Cart handler
  const addToCart = () => {
    handleSubmit(product._id, {
      qty: Number(add.qty),
      size: add.size,
    });
  };

  // ✅ Show Toast
  const showToast = () => {
    const toastElement = document.getElementById("cartToast");
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            {/* Left Image */}
            <div className="col-md-6 ">
              <div className="position-relative">
                <button className="like-btn">
                  <i className="bi bi-heart"></i>
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>

            {/* Right Details */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{product.name}</h2>

              {/* Price */}
              <div className="mb-3">
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#dc3545",
                    marginRight: "10px",
                  }}
                >
                  Rs {product.price}
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#6c757d",
                    fontSize: "16px",
                  }}
                >
                  Rs 3996
                </span>
                <span
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginLeft: "10px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  50% OFF
                </span>
              </div>

              {/* Rating */}
              <div className="mb-3">
                {"⭐".repeat(product.rating)}{" "}
                <span className="text-muted">({product.rating} / 5)</span>
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="me-2 fw-bold">Quantity:</label>
                <input
                  type="number"
                  value={add.qty}
                  name="qty"
                  min="1"
                  style={{ width: "80px" }}
                  className="form-control d-inline"
                  onChange={handleChange}
                />
              </div>

              {/* Size */}
              <label className="fw-bold">Size:</label>
              <select
                name="size"
                value={add.size}
                onChange={handleChange}
                className="form-select form-select-sm mt-2"
                style={{ width: "100px" }}
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>

              {/* Description */}
              <p className="mt-3">{product.description}</p>

              {/* Icons */}
              <div className="mb-3">
                <p className="mb-1">
                  <i className="bi bi-truck me-2 text-success"></i> Free Shipping
                </p>
                <p className="mb-1">
                  <i className="bi bi-headset me-2 text-primary"></i> 24/7 Support
                </p>
                <p className="mb-1">
                  <i className="bi bi-house-door me-2 text-warning"></i> Easy Returns
                </p>
              </div>

              {/* ✅ Toast */}
              <div
                className="toast-container position-fixed top-0 end-0 p-3"
                style={{ zIndex: 9999 }}
              >
                <div
                  id="cartToast"
                  className="toast align-items-center text-bg-success border-0"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      ✅ Item added to cart successfully!
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => {
                  addToCart();
                  showToast();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-5">
  <h4 className="mb-4">Similar Products</h4>
  <div className="row g-4">
    {similar?.map((item) => (
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3"
        key={item._id}
      >
        <div className="card h-100 shadow-sm border-0 similar-card">
          <div className="text-center p-3">
            <img
              src={item.image}
              alt={item.name}
              className="card-img-top img-fluid"
            />
          </div>
          <div className="text-center px-3 pb-3">
            <h6 className="fw-bold text-truncate">{item.name}</h6>
            <div className="mb-2">
              {"⭐".repeat(item.rating || 4)}
              <span
                className="text-muted"
                style={{ fontSize: "12px" }}
              >
                {" "}
                ({item.rating || 4}/5)
              </span>
            </div>
            <p className="mb-1">
              <span className="fw-bold text-danger me-2">
                Rs {item.price}
              </span>
              <span
                className="text-muted"
                style={{
                  textDecoration: "line-through",
                  fontSize: "13px",
                }}
              >
                Rs {item.price + 1000}
              </span>
            </p>
            <span className="badge bg-danger mb-2">20% OFF</span>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
              <button className="btn btn-outline-dark w-100">
                View
              </button>
              <button className="btn btn-primary w-100">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
