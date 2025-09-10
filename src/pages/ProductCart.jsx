import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import { Link } from "react-router-dom";

const ProductCart = () => {
  const { cart, setCart } = useEcommerceContext(); // cart ko update karne ke liye setCart bhi chahiye

  // Quantity update handler
  const updateQty = (id, size, type) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id && item.add?.size === size) {
        let newQty = item.add?.qty || 1;
        if (type === "inc") newQty += 1;
        if (type === "dec" && newQty > 1) newQty -= 1;

        return {
          ...item,
          add: { ...item.add, qty: newQty },
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  // Remove item from cart
  // Remove item from cart
  const removeFromCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item._id === id && item.add?.size === size)
    );
    setCart(updatedCart);
  };

  //  Calculation with qty
  // Total MRP
  const totalMRP = cart?.reduce(
    (acc, item) => acc + item.price * (item.add?.qty || 1),
    0
  );

  // Total Discount
  const totalDiscount = cart?.reduce(
    (acc, item) =>
      acc + (item.price * (item.discount || 0) * (item.add?.qty || 1)) / 100,
    0
  );

  const deliveryCharge = totalMRP > 2000 ? 0 : 100;
  const finalAmount = totalMRP - totalDiscount + deliveryCharge;

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-md-8">
            <h4 className="fw-bold mb-4">
              My Cart <span className="text-muted">({cart?.length} items)</span>
            </h4>
            {cart?.map((item) => (
              <div
                key={item._id}
                className="d-flex align-items-center border rounded mb-3 p-3 shadow-sm bg-white"
              >
                {/* Product Image */}
                <Link to={`/products/${item?._id}`}>
                  <img
                    src={item?.image}
                    alt={item.name}
                    className="me-3 rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold">{item.name}</h6>
                  <p className="text-muted mb-1">
                    <span className="fw-bold text-danger">
                      ₹{item.price * (item.add?.qty || 1)}
                    </span>{" "}
                    <span className="text-muted text-decoration-line-through">
                      ₹{(item.price + 500) * (item.add?.qty || 1)}
                    </span>
                  </p>
                  <small className="text-success fw-semibold">
                    {item.discount}% off | You Save ₹
                    {Math.round(
                      (item.price * item.discount * (item.add?.qty || 1)) / 100
                    )}
                  </small>

                  {/* ✅ Size Display */}
                  <p className="mt-2 mb-0">
                    <span className="fw-semibold">Size: </span>
                    <span className="badge bg-secondary">
                      {item.add?.size || "M"}
                    </span>
                  </p>

                  {/* Quantity */}
                  <div className="mt-2 d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-dark me-2"
                      onClick={() => updateQty(item._id, item.add?.size, "dec")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.add?.qty || 1}
                      readOnly
                      style={{
                        width: "50px",
                        textAlign: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    <button
                      className="btn btn-sm btn-outline-dark ms-2"
                      onClick={() => updateQty(item._id, item.add?.size, "inc")}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="btn btn-sm btn-outline-danger ms-3"
                  onClick={() => removeFromCart(item._id, item.add?.size)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Price Details Section */}
          <div className="col-md-4">
            <div className="border rounded p-3 shadow-sm bg-white">
              <h5 className="fw-bold mb-3">Price Details</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-success fw-semibold">
                <span>Discount</span>
                <span>-₹{Math.round(totalDiscount)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success fw-semibold">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>
              <button className="btn btn-primary w-100 mt-3 fw-bold">
                Proceed to Checkout
              </button>
              <p className="text-muted small text-center mt-2">
                Safe and Secure Payments. Easy returns.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductCart;
