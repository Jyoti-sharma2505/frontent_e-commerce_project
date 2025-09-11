import useFetch from "../useFetch";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useContext, useEffect, useState } from "react";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import "../index.css";

const ProductList = () => {
  const {
    handleSubmit,
    filterHandleEvent,
    clearFilters,
    category,
    setCategory,
    price,
    setPrice,
    rating,
    setRating,
    sortBy,
    handleWish,
    // categories,
    // setCategories,
    setSortBy,
  } = useEcommerceContext();
  // const [categories, setCategories] = useState([]);
  const toggleCategory = (cat) => {
    if (cat === "All") {
      // Agar "All" select kiya to sirf "All" rakho
      setCategory(["All"]);
    } else {
      let updated = [];

      if (category.includes(cat)) {
        // agar already selected hai to remove karo
        updated = category.filter((c) => c !== cat);
      } else {
        // agar nahi hai to add karo
        updated = [...category.filter((c) => c !== "All"), cat];
      }

      // agar sab empty ho gaye to default "All"
      if (updated.length === 0) {
        updated = ["All"];
      }

      setCategory(updated);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <div className="row">
          {/* Left Side - Filter */}
          <div className="col-md-3">
            <div
              className="filter-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <h5 style={{ marginBottom: "20px", fontWeight: "600" }}>
                Filters
              </h5>

              {/* Category */}
              <div style={{ marginBottom: "20px" }}>
                <h6 style={{ fontWeight: "500" }}>Category</h6>
                {["All", "Men", "Women"].map((cat) => (
                  <div key={cat}>
                    <input
                      type="checkbox"
                      name="category"
                      id={cat}
                      checked={category?.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      style={{ marginRight: "6px" }}
                    />
                    <label htmlFor={cat}>{cat}</label>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "20px" }}>
                <h6 style={{ fontWeight: "500" }}>Price</h6>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="5000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: "100%" }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <small>100</small>
                  <small>{price}</small>
                </div>
              </div>

              {/* Rating */}
              <div style={{ marginBottom: "20px" }}>
                <h6 style={{ fontWeight: "500" }}>Rating</h6>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star}>
                    <input
                      type="radio"
                      name="rating"
                      id={`star${star}`}
                      checked={rating === star}
                      onChange={() => setRating(star)}
                      style={{ marginRight: "6px" }}
                    />
                    <label htmlFor={`star${star}`}>{star} Stars & above</label>
                  </div>
                ))}
              </div>

              {/* Sort By */}
              <div style={{ marginBottom: "20px" }}>
                <h6 style={{ fontWeight: "500" }}>Sort By</h6>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "6px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Clear */}
              <button
                onClick={clearFilters}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc3545",
                  color: "#fff",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="col-md-9">
            <div className="row g-4">
              {filterHandleEvent?.map((list) => (
                <div className="col-md-4" key={list?._id}>
                  <div className="product-card p-3">
                    <div className="img-box position-relative">
                      <button
                        className="like-btn"
                        onClick={() => handleWish(list._id)}
                      >
                        <i
                          className={`bi ${
                            list?.inWish ? "bi-heart-fill" : "bi-heart"
                          }`}
                          style={{
                            color: list?.inWish ? "red" : "#ccc",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                          }}
                        ></i>
                      </button>
                      <Link to={`/products/${list?._id}`}>
                        <img
                          src={list?.image}
                          className="img-fluid rounded"
                          alt={list?.name}
                          style={{ height: "250px", objectFit: "contain" }}
                        />
                      </Link>
                      <div>
                        <button
                          onClick={() => handleSubmit(list?._id)}
                          className={`btn w-100 ${
                            list?.inCart ? "btn-danger" :"btn btn-outline-primary"
                          }`}
                        >
                          {list?.inCart ? "Remove from Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>

                    <h5 className="mt-3">{list?.name}</h5>
                    <p className="text-muted mb-1">Rs {list?.price}</p>
                    <div style={{ color: "#ffc107", fontSize: "16px" }}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <i
                          key={i}
                          className={
                            i < Math.round(list?.rating || 0)
                              ? "bi bi-star-fill"
                              : "bi bi-star"
                          }
                        ></i>
                      ))}
                      <span style={{ marginLeft: "6px", color: "#555" }}>
                        ({list?.rating || 0})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filterHandleEvent?.length === 0 && (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
