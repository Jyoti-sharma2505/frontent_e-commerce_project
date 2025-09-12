import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import * as bootstrap from "bootstrap";

const Whislsit = () => {
  const { listWish, handleSubmit, handleWish, removeFromWishlist } =
    useEcommerceContext();
    const [add, setAdd] = useState({
    qty: "1",
    size: "M",
  });

     const addToCart = () => {
    handleSubmit(product._id, {
      qty: Number(add.qty),
      size: add.size,
    });
  };

  return (
    <>
      <Header />
      <main>
        <div className="container my-4">
          <h3 className="mb-4">My Wishlist ({listWish?.length} items)</h3>
          <div className="row">
            {listWish?.length > 0 ? (
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
                          onClick={() => {handleWish(product._id)
                            
                          }}
                        ></i>
                      </div>

                      {/* Product Details */}
                      <h5 className="fw-semibold mb-2">{product.name}</h5>
                      <p className="text-muted mb-3">₹{product.price}</p>
                      <p className="text-muted mb-3">
                        ₹{product.price} | Qty: {product.add?.qty || 1}
                      </p>

                      {/* Add to Cart Button */}
                      <button
                        className={`btn btn-sm ${
                          product.inWish ? "btn-outline-danger" : "btn-primary"
                        } w-100`}
                        onClick={() => {
                          const addData = {
                            qty: 1,
                            // size: product.add?.size || "M",
                          };
                           const modal = new bootstrap.Modal(
                                                        document.getElementById("sizeModal")
                                                      );
                                                      document.getElementById("selectedProductId").value =
                                                        product._id; // store product id
                                                      modal.show();

                          // 1️⃣ Add to Cart
                          // addToCart(addData);

                          // // 2️⃣ Remove from Wishlist
                          // removeFromWishlist(product?._id);
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
         {/* Size Selection Modal */}
        <div
          className="modal fade"
          id="sizeModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Size</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                <input type="hidden" id="selectedProductId" />
                <select id="selectedSize" className="form-select w-50 mx-auto">
                  <option value="S">Small</option>
                  <option value="M" selected>
                    Medium
                  </option>
                  <option value="L">Large</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    const pid =
                      document.getElementById("selectedProductId").value;
                    const size = document.getElementById("selectedSize").value;
                    handleSubmit(pid, { qty: 1, size });
                    removeFromWishlist(pid);
                    showToast();
                    
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Whislsit;
