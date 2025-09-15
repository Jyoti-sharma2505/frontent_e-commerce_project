import { useState } from "react";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, addresses, placeOrder } = useEcommerceContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // ✅ Price Calculation with qty + discount
  const totalMRP = cart.reduce(
    (sum, item) => sum + item.price * (item.add?.qty || 1),
    0
  );

  const totalDiscount = cart.reduce(
    (sum, item) =>
      sum +
      ((item.price * (item.discount || 0)) / 100) * (item.add?.qty || 1),
    0
  );

  const deliveryCharge = totalMRP > 2000 ? 0 : 100;
  const finalAmount = totalMRP - totalDiscount + deliveryCharge;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address!");
      return;
    }

    // ✅ Pass correct data to backend
    placeOrder({
      addressId: selectedAddress,
      items: cart,
      total: finalAmount,
    });

    setOrderSuccess(true);
  };
//   console.log(handlePlaceOrder,"ab")

  return (
    <>
      <Header />
      <div className="container my-3">
        <h3 className="mb-4">Checkout /</h3> <Link to="/">Back to HomePage..</Link>

        {orderSuccess ? (
          <div className="alert alert-success text-center">
            🎉 Order Placed Successfully!
          </div>
        ) : (
          <div className="row py-2">
            {/* Address Section */}
            <div className="col-md-6 mb-4">
              <h5>Select Address</h5>
              {addresses?.length > 0 ? (
                addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="form-check border rounded p-3 my-2"
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                    />
                    <label className="form-check-label ms-2">
                      {addr.name}, {addr.address}, {addr.city} - {addr.pincode}
                      <br />
                      <small className="text-muted">{addr.phone}</small>
                    </label>
                  </div>
                ))
              ) : (
                <p>No addresses found. Please add one in your profile.</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="col-md-6 mb-4">
              <h5>Order Summary</h5>
              <ul className="list-group mb-3">
                {cart?.map((item) => (
                  <li
                    key={item._id + item.add?.size}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {item.name} (x{item.add?.qty || 1}) | Size:{" "}
                      <strong>{item.add?.size}</strong>
                    </span>
                    <span>
                      ₹{item.price * (item.add?.qty || 1)}{" "}
                      <small className="text-muted text-decoration-line-through">
                        ₹{(item.price + 500) * (item.add?.qty || 1)}
                      </small>
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Discount</span>
                  <span>-₹{Math.round(totalDiscount)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </li>
              </ul>

              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrder}
                
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
