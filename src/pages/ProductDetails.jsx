import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import "../index.css";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import { useState } from "react";

const ProductDetails = () => {
  const { productId } = useParams(); // URL se product id
  const { data, loading, error, handleSubmit, setCart, cart } =
    useEcommerceContext();

  // Local state for quantity and size
  const [add, setAdd] = useState({
    qty: "1",
    size: "M",
  });

  // Change handler for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add to cart function
  const addToCart = () => {
    handleSubmit(product._id, {
      qty: Number(add.qty),
      size: add.size,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;

  // Ek product select karna
  const product = data?.getAll?.find((item) => item?._id === productId);

  if (!product) return <p>Product not found</p>;

  // Similar products (same category ke)
  const similar = data?.getAll?.filter(
    (item) =>
      item.subCategory === product.subCategory && item._id !== product._id
  );

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            {/* Left Side - Product Image */}
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

            {/* Right Side - Product Details */}
            <div className="col-md-6">
              {/* Product Name */}
              <h2 className="fw-bold mb-3">{product.name}</h2>

              {/* Price Section */}
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

              {/* Quantity Input */}
              {/* Quantity Input */}
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

              {/* Size Options */}
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

              {/* Extra Info Icons */}
              <div className="mb-3">
                <p className="mb-1">
                  <i className="bi bi-truck me-2 text-success"></i> Free
                  Shipping
                </p>
                <p className="mb-1">
                  <i className="bi bi-headset me-2 text-primary"></i> 24/7
                  Customer Support
                </p>
                <p className="mb-1">
                  <i className="bi bi-house-door me-2 text-warning"></i> Easy
                  Return Policy
                </p>
              </div>

              {/* Add to Cart Button */}
              <Link
                onClick={() => addToCart(product._id)}
                className="btn btn-primary btn-lg w-100 mt-3"
              >
                {product?.inCart ? "Remove from Cart" : "Add to Cart"}
              </Link>
            </div>
          </div>
          ``
          {/* Similar Products Section */}
          <div className="mt-5">
            <h4 className="mb-4">Similar Products</h4>
            <div className="row g-4">
              {similar?.map((item) => (
                <div className="col-md-3" key={item._id}>
                  <div className="card h-100 shadow-sm border-0">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "300px", objectFit: "cover" }}
                    />

                    {/* Details */}
                    <div className="card-body text-center">
                      <h6 className="card-title fw-bold">{item.name}</h6>

                      {/* Rating */}
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

                      {/* Price */}
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

                      {/* Discount */}
                      <span className="badge bg-danger mb-2">20% OFF</span>

                      {/* Buttons */}
                      {/* Buttons */}
                      <div className="d-flex justify-content-center gap-3 mt-3">
                        <button
                          className="btn btn-outline-dark px-4 py-2 fw-semibold"
                          style={{ cursor: "pointer", borderRadius: "8px" }}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-primary px-4 py-2 fw-semibold"
                          style={{ cursor: "pointer", borderRadius: "8px" }}
                        >
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
