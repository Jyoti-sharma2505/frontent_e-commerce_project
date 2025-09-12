import { useEcommerceContext } from "../contexts/EcommerceContext";

const Checkout = () => {
  const { cart, selectedAddress, placeOrder } = useEcommerceContext();

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      <h5>Order Summary</h5>
      {cart.map((item) => (
        <div key={item._id} className="d-flex justify-content-between border p-2 mb-2">
          <span>{item.name} (x{item.add.qty})</span>
          <span>₹{item.price * item.add.qty}</span>
        </div>
      ))}

      <h5 className="mt-3">Delivery Address</h5>
      {selectedAddress ? (
        <div className="card p-3 mb-3">
          <h6>{selectedAddress.name} ({selectedAddress.phone})</h6>
          <p>{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
        </div>
      ) : (
        <p className="text-danger">No address selected! Please go to Address Page.</p>
      )}

      <button
        className="btn btn-success"
        disabled={!selectedAddress || cart.length === 0}
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
