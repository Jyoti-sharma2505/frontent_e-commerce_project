// import { useState, useEffect } from "react";
// import useFetch from "../useFetch";
// // import axios from "axios";

// const AddressPage = ({ userId, onSelectAddress }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState({
//     name: "",
//     phone: "",
//     line1: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//   });

//   // Load addresses
//   // useEffect(() => {
//   //   axios.get(`http://localhost:3000/addresses/${userId}`)
//   //     .then(res => setAddresses(res.data.address))
//   //     .catch(err => console.error(err));
//   // }, [userId]);
//   const {}=useFetch

//   // Add new address
//   const addAddress = async () => {
//     const res = await axios.post("http://localhost:3000/addresses", {
//       ...newAddress,
//       userId,
//     });
//     setAddresses([...addresses, res.data.address]);
//     setNewAddress({
//       name: "",
//       phone: "",
//       line1: "",
//       city: "",
//       state: "",
//       pincode: "",
//       country: "",
//     });
//   };

//   // Delete address
//   const deleteAddress = async (id) => {
//     await axios.delete(`http://localhost:3000/addresses/${id}`);
//     setAddresses(addresses.filter(addr => addr._id !== id));
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Manage Addresses</h3>

//       {/* Add New Address Form */}
//       <div className="card p-3 mb-3">
//         <h5>Add New Address</h5>
//         <input className="form-control mb-2" placeholder="Name"
//           value={newAddress.name} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} />
//         <input className="form-control mb-2" placeholder="Phone"
//           value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} />
//         <input className="form-control mb-2" placeholder="Address Line"
//           value={newAddress.line1} onChange={(e) => setNewAddress({...newAddress, line1: e.target.value})} />
//         <input className="form-control mb-2" placeholder="City"
//           value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} />
//         <input className="form-control mb-2" placeholder="State"
//           value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} />
//         <input className="form-control mb-2" placeholder="Pincode"
//           value={newAddress.pincode} onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})} />
//         <input className="form-control mb-2" placeholder="Country"
//           value={newAddress.country} onChange={(e) => setNewAddress({...newAddress, country: e.target.value})} />
//         <button className="btn btn-success" onClick={addAddress}>Add Address</button>
//       </div>

//       {/* Show Addresses */}
//       {addresses.map(addr => (
//         <div key={addr._id} className="card p-3 mb-2">
//           <h6>{addr.name} ({addr.phone})</h6>
//           <p>{addr.line1}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}</p>
//           <button className="btn btn-primary me-2" onClick={() => onSelectAddress(addr)}>Select</button>
//           <button className="btn btn-danger" onClick={() => deleteAddress(addr._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddressPage;
