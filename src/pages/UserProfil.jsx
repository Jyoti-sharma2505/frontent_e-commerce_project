import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import "../Userprofile.css"; // keep your global styles
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = () => {
  const {
    addresses = [],
    addAddress,
    removeAddress,
    selectedAddress,
    setSelectedAddress,
    orders = [],
  } = useEcommerceContext();

  // Avatar local state (not persisted in backend)
  const [avatarSrc, setAvatarSrc] = useState(
    "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
  );

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddr, setEditAddr] = useState(null);

  // Preview chosen avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setNewAddr({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
    setShowAddModal(true);
  };

  const submitAddAddress = () => {
    // basic validation
    if (!newAddr.name || !newAddr.phone || !newAddr.street) {
      toast.error("Please provide name, phone and street.");
      return;
    }
    addAddress({
      name: newAddr.name,
      phone: newAddr.phone,
      street: newAddr.street,
      city: newAddr.city,
      state: newAddr.state,
      pincode: newAddr.pincode,
    });
    setShowAddModal(false);
  };

  const openEditModal = (addr) => {
    // We will implement edit by removing then adding updated address
    setEditAddr({ ...addr });
    setShowEditModal(true);
  };

  const submitEditAddress = () => {
    if (!editAddr?.name || !editAddr?.phone || !editAddr?.street) {
      toast.error("Please provide name, phone and street.");
      return;
    }
    // remove original address and add updated one
    removeAddress(editAddr.id);
    addAddress({
      name: editAddr.name,
      phone: editAddr.phone,
      street: editAddr.street,
      city: editAddr.city,
      state: editAddr.state,
      pincode: editAddr.pincode,
    });
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (!toast.error("Are you sure you want to delete this address?"))
      return;
    removeAddress(id);
    if (selectedAddress === id) setSelectedAddress(null);
  };

  // When addresses change, ensure selectedAddress is valid
  useEffect(() => {
    if (selectedAddress && !addresses.some((a) => a.id === selectedAddress)) {
      setSelectedAddress(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  return (
    <>
      <Header />
      <ToastContainer />
      <main className="container my-9 py-5">
        <div className="row g-4">
          {/* Left: Profile */}
          <div className="col-lg-4">
            <div className="profile-card">
              <img src={avatarSrc} alt="avatar" />
              <div className="mt-3">
                <label className="btn btn-sm btn-outline-primary">
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h5>Jyoti Sharma</h5>
              <p>user@example.com • +91 98765 43210</p>
              <hr />
              <h6 className="fw-bold">Account</h6>
              <p>
                <strong>Addresses:</strong> {addresses.length}
              </p>
              <p>
                <strong>Orders:</strong> {orders.length}
              </p>
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={openAddModal}
              >
                + Add New Address
              </button>
            </div>
          </div>

          {/* Right: Addresses + Orders */}
          <div className="col-lg-8">
            <div className="card py-3 shadow-sm mb-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-2">My Addresses- </h5>
                <small className="text-muted mb-2">
                  {" "}
                  Select shipping address
                </small>
              </div>

              {addresses?.length === 0 && (
                <p className="text-muted">
                  No addresses yet. Add one to continue.
                </p>
              )}

              {/* ADDRESS CARDS */}
              <div className="row">
                {addresses.map((addr) => (
                  <div className="col-md-6 mb-3" key={addr.id}>
                    <div
                      className={`address-card ${
                        selectedAddress === addr.id ? "selected" : ""
                      }`}
                    >
                      <h6>{addr.name}</h6>
                      <p className="mb-1">
                        {addr.street}, {addr.city}
                      </p>
                      <small>📞 {addr.phone}</small>
                      <div className="d-flex justify-content-between mt-2">
                        <button
                          className={`btn btn-sm ${
                            selectedAddress === addr.id
                              ? "btn-secondary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setSelectedAddress(addr.id)}
                        >
                          {selectedAddress === addr.id ? "Selected" : "Select"}
                        </button>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-secondary me-1"
                            onClick={() => openEditModal(addr)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(addr.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders / History */}
            <div className="card p-3 shadow-sm">
              <h5>📦 Order History</h5>
              {orders.length === 0 ? (
                <p className="text-muted">No previous orders.</p>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="order-card">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">Order #{ord.id}</div>
                        <small className="text-muted">{ord.date}</small>
                        <ul className="mt-2 small">
                          {ord.items?.map((it) => (
                            <li key={it._id}>
                              {it.name} × {it.qty} — ₹{it.price * it.qty}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold fs-6">₹{ord.total}</div>
                        <div className="text-muted small">
                          {ord.address?.city}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Address Modal */}
      <div
        className={`modal ${showAddModal ? "d-block" : ""}`}
        tabIndex="-1"
        style={{ background: showAddModal ? "rgba(0,0,0,0.4)" : "transparent" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Address</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  value={newAddr.name}
                  onChange={(e) =>
                    setNewAddr({ ...newAddr, name: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input
                  value={newAddr.phone}
                  onChange={(e) =>
                    setNewAddr({ ...newAddr, phone: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Street / Address</label>
                <input
                  value={newAddr.street}
                  onChange={(e) =>
                    setNewAddr({ ...newAddr, street: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">City</label>
                  <input
                    value={newAddr.city}
                    onChange={(e) =>
                      setNewAddr({ ...newAddr, city: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Pincode</label>
                  <input
                    value={newAddr.pincode}
                    onChange={(e) =>
                      setNewAddr({ ...newAddr, pincode: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="col-12 mb-2">
                  <label className="form-label">State</label>
                  <input
                    value={newAddr.state}
                    onChange={(e) =>
                      setNewAddr({ ...newAddr, state: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitAddAddress}>
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Address Modal */}
      <div
        className={`modal ${showEditModal ? "d-block" : ""}`}
        tabIndex="-1"
        style={{
          background: showEditModal ? "rgba(0,0,0,0.4)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Address</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {!editAddr ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="mb-2">
                    <label className="form-label">Name</label>
                    <input
                      value={editAddr.name}
                      onChange={(e) =>
                        setEditAddr({ ...editAddr, name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Phone</label>
                    <input
                      value={editAddr.phone}
                      onChange={(e) =>
                        setEditAddr({ ...editAddr, phone: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Street / Address</label>
                    <input
                      value={editAddr.street}
                      onChange={(e) =>
                        setEditAddr({ ...editAddr, street: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    <div className="col-6 mb-2">
                      <label className="form-label">City</label>
                      <input
                        value={editAddr.city}
                        onChange={(e) =>
                          setEditAddr({ ...editAddr, city: e.target.value })
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-6 mb-2">
                      <label className="form-label">Pincode</label>
                      <input
                        value={editAddr.pincode}
                        onChange={(e) =>
                          setEditAddr({ ...editAddr, pincode: e.target.value })
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="form-label">State</label>
                      <input
                        value={editAddr.state}
                        onChange={(e) =>
                          setEditAddr({ ...editAddr, state: e.target.value })
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitEditAddress}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
