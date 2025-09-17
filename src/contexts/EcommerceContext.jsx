import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../useFetch";

const EcommerceContext = createContext();
export const useEcommerceContext = () => useContext(EcommerceContext);

export function EcommerceContextProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://backend-e-commerce-project.vercel.app/products"
  );

  const location = useLocation();
  const categoryFilter = location.state?.categoryName || "All";

  const [category, setCategory] = useState(["All"]);
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
   const [selectedAddress, setSelectedAddress] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ Cart & Wishlist states (load from localStorage first)
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
  const [listWish, setListWish] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const [select, setSelect] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Address + Orders (as before)

// ✅ Address + Orders
const [addresses, setAddresses] = useState(() => {
  const savedAddresses = localStorage.getItem("addresses");
  return savedAddresses
    ? JSON.parse(savedAddresses)
    : [
        {
          id: 1,
          name: "Jyoti Sharma",
          phone: "9876543210",
          address: "123, MG Road, Delhi",
          city: "New Delhi",
          pincode: "110001",
          state: "Delhi",
        },
          {
          id: 2,
          name: "Rohit Sharma",
          phone: "9876543210",
          address: "123, MG Road, Delhi",
          city: "New Delhi",
          pincode: "110001",
          state: "Delhi",
        },
          {
          id: 3,
          name: "Rahul Sharma",
          phone: "9876543210",
          address: "123, MG Road, Delhi",
          city: "New Delhi",
          pincode: "110001",
          state: "Delhi",
        },
      ];
});
console.log(addresses)

useEffect(() => {
  localStorage.setItem("addresses", JSON.stringify(addresses));
}, [addresses]);

const addAddress = (newAddress) => {
  setAddresses((prev) => [...prev, { ...newAddress, id: Date.now() }]);
};

const removeAddress = (id) => {
  setAddresses((prev) => prev.filter((addr) => addr.id !== id));
};

  // ✅ Place Order
const placeOrder = (orderData) => {
  const newOrder = {
    id: Date.now(),
    ...orderData,
    date: new Date().toLocaleString(),
  };

  setOrders((prev) => [...prev, newOrder]);

  // ✅ Cart clear yahi karo
  setCart([]);
  localStorage.setItem("cart", JSON.stringify([])); 
};


const handlePlaceOrder = () => {
  if (!selectedAddress) {
    alert("Please select an address!");
    return;
  }

  placeOrder({
    addressId: selectedAddress,
    items: cart,
    total: totalPrice,
  });

  setOrderSuccess(true);
};
console.log(handlePlaceOrder)



  // ✅ Sync cart + wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(listWish));
  }, [listWish]);

//   const clearCart = () => {
//   setCart([]); 
//   localStorage.setItem("cart", JSON.stringify([]));
// };

  // ✅ Update product list with inCart/inWish
  useEffect(() => {
    if (data?.getAll) {
      const updatedData = data.getAll.map((item) => ({
        ...item,
        inCart: cart.some((c) => c._id === item._id),
        inWish: listWish.some((w) => w._id === item._id),
      }));
      setSelect(updatedData);
    }
  }, [data, cart, listWish]);

  // ✅ Add to Cart
  const handleSubmit = (productId, addData = { qty: 1, size: "M" }) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item._id === productId && item.add.size === addData.size
      );

      if (existingIndex !== -1) {
        // agar same product + same size already cart me hai → qty update
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].add.qty =
          (updatedCart[existingIndex].add.qty || 1) + (addData.qty || 1);
        return updatedCart;
      }

      const product = select.find((p) => p._id === productId);
      if (!product) return prevCart;

      return [
        ...prevCart,
        { ...product, inCart: true, add: { ...addData, qty: addData?.qty || 1 } },
      ];
    });
  };

  // ✅ Toggle Wishlist
  const handleWish = (productId, addData = { qty: 1, size: "M" }) => {
    setListWish((prevWish) => {
      const exists = prevWish.find((item) => item._id === productId);
      if (exists) {
        return prevWish.filter((item) => item._id !== productId); // remove
      } else {
        const product = select.find((p) => p._id === productId);
        if (!product) return prevWish;
        return [
          ...prevWish,
          { ...product, inWish: true, add: { ...addData, qty: addData.qty } },
        ];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setListWish((prevWish) =>
      prevWish.filter((item) => item._id !== productId)
    );
  };

  const moveToWishlist = (productId) => {
    const item = cart.find((c) => c._id === productId);
    if (!item) return;

    setCart((prev) => prev.filter((c) => c._id !== productId));
    setListWish((prev) => {
      if (prev.find((w) => w._id === productId)) return prev;
      return [...prev, { ...item, inWish: true }];
    });
  };

  // ✅ Filter + Sort
  const filterHandleEvent = select
    .filter((product) => {
      if (category.length > 0 && !category.includes("All")) {
        return category.includes(product.subCategory || product.category);
      }
      return true;
    })
    .filter((product) => product.price <= price)
    .filter((product) => (rating > 0 ? product.rating >= rating : true))
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const clearFilters = () => {
    setCategory([]);
    setPrice(5000);
    setRating(null);
    setSortBy("relevance");
  };

  return (
    <EcommerceContext.Provider
      value={{
        handleSubmit,
        clearFilters,
        filterHandleEvent,
        category,
        setCategory,
        price,
        setPrice,
        rating,
        setRating,
        sortBy,
        setSortBy,
        cart,
        setCart,
        listWish,
        handleWish,
        removeFromWishlist,
        moveToWishlist,
        loading,
        error,
        data,
        searchTerm,
        setSearchTerm,
        addresses,
        addAddress,
        removeAddress,
        selectedAddress,
        setSelectedAddress,
        placeOrder,
        orders,
        handlePlaceOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}
