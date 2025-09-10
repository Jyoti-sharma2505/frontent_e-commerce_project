import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEcommerceContext } from "../contexts/EcommerceContext";

const Whislsit = () => {
  const { listWish, handleSubmit, handleWish,removeFromWishlist } = useEcommerceContext();

  return (
    <>
      <Header />
      <main>
        <div className="container my-4">
          <h3 className="mb-4">My Wishlist ({listWish.length} items)</h3>
          <div className="row">
            {listWish.length > 0 ? (
              listWish.map((product) => {
                // const isWishlisted = product.inWish; // or use another field if wishlist separate
                return (
                  <div className="col-md-4 mb-4" key={product._id}>
                    <div className="card p-3 shadow-sm h-100">
                      {/* Product Image */}
                      <div className="position-relative mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                        {/* Wishlist Icon */}
                        <i
                          className="bi bi-heart-fill fs-5 position-absolute top-0 end-0 m-2"
                          style={{
                            color: product.inWish ? "red" : "#ccc",
                            cursor: "pointer",
                          }}
                          onClick={() => handleWish(product._id)}
                        ></i>
                      </div>

                      {/* Product Details */}
                      <h5 className="fw-semibold mb-2">{product.name}</h5>
                      <p className="text-muted mb-3">₹{product.price}</p>

                      {/* Add to Cart Button */}
                      <button
                        className={`btn btn-sm ${
                          product.inWish ? "btn-outline-danger" : "btn-primary"
                        } w-100`}
                        onClick={() => {
                          const addData = {
                            qty: 1,
                            size: product.add?.size || "M",
                          };

                          // 1️⃣ Add to Cart
                          handleSubmit(product._id, addData);

                          // 2️⃣ Remove from Wishlist
                           removeFromWishlist(product._id);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No products in wishlist.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Whislsit;
