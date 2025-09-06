import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import "../index.css";

const ProductDetails = () => {
  const { productId } = useParams(); // URL se product id
  const { data, loading, error } = useFetch(
    "https://backend-e-commerce-project.vercel.app/products"
  );

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
              <div className=" position-relative">
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
                  Rs {product.price} {/* discounted price */}
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
                  defaultValue={1}
                  min={1}
                  style={{ width: "80px" }}
                  className="form-control d-inline"
                />
              </div>

              {/* Size Options */}
              <div className="mb-3">
                <label className="me-2 fw-bold">Size:</label>
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    {size}
                  </button>
                ))}
              </div>

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
              <Link  to="/cart" className="btn btn-primary btn-lg w-100 mt-3">
                Add to Cart
              </Link>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="mt-5">
            <h4 className="mb-4">Similar Products</h4>
            <div className="row g-4">
              {similar?.map((item) => (
                <div className="col-md-3" key={item._id}>
                  <div className="card h-100 shadow-sm border-0">
                    {/* Sirf Image Upar */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "500px", objectFit: "cover" }}
                    />

                    {/* Saari Details Image ke Neeche */}
                    <div className="card-body text-center">
                      {/* Name */}
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

                      {/* Price + Cut Price */}
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
                      <div className="d-flex justify-content-center gap-2 mt-2">
                        <button className="btn btn-sm btn-outline-dark">
                          View
                        </button>
                        <button className="btn btn-sm btn-primary">
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
