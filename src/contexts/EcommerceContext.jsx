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
  // const [categories, setCategories] = useState([]);

  // ✅ products with inCart field
  const [select, setSelect] = useState([]);
  const [cart, setCart] = useState([]);
  const [listWish, setListWish] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data?.getAll) {
      const updatedData = data.getAll.map((item) => ({
        ...item,
        inCart: item.inCart || false,
      }));
      setSelect(updatedData);
    }
  }, [data]);

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


  // ✅ Add/Remove Cart
  // ✅ Add to Cart
// ✅ Add/Remove Cart
const handleSubmit = (productId, addData = { qty: 1, size: "M" }) => {
  setSelect((prevProducts) =>
    prevProducts.map((item) =>
      item._id === productId
        ? { ...item, inCart: true } // hamesha true, remove logic alag se handle
        : item
    )
  );

  setCart((prevCart) => {
    const existingIndex = prevCart.findIndex(
      (item) => item._id === productId && item.add.size === addData.size
    );

    if (existingIndex !== -1) {
      // agar same product + same size already cart me hai → qty increment
      const updatedCart = [...prevCart];
      updatedCart[existingIndex].add.qty = addData.qty || 1;
      return updatedCart;
    }

    // agar size different ya naya product → new entry in cart
    const product = select.find((p) => p._id === productId);
    if (!product) return prevCart;

    return [
      ...prevCart,
      { ...product, inCart: true, add: { ...addData, qty: addData?.qty || 1 } },
    ];
  });
};



// ✅ Add to Wishlist
// ✅ Toggle Wishlist
const handleWish = (productId, addData = { qty: 1, size: "M" }) => {
  setSelect((prevProducts) =>
    prevProducts.map((item) =>
      item._id === productId
        ? {
            ...item,
            inWish: !item.inWish, // 👈 toggle true/false
           inCart: false, 
            add: {
              ...item.add,
              qty: item.add?.qty || addData.qty,
              size: item.add?.size || addData.size,
            },
          }
        : item
    )
  );

  // Update listWish
  setListWish((prevWish) => {
    const exists = prevWish.find((item) => item._id === productId);
    if (exists) {
      // already hai -> remove
      return prevWish.filter((item) => item._id !== productId);
    } else {
      // naya add karo
      const product = select.find((p) => p._id === productId);
      if (!product) return prevWish;
      return [...prevWish, { ...product, inWish: true,inCart: product.inCart, add: addData }];
    }

    // new wishlist item
    const product = select.find((p) => p._id === productId);
    if (!product) return prevWish;

    return [
      ...prevWish,
      { ...product, inWish: true, add: { ...addData, qty: addData?.qty || 1 } },
    ];
  });
};

// ✅ Remove from Wishlist
// ✅ Remove from Wishlist by productId
const removeFromWishlist = (productId) => {
  // 1. Wishlist se hatao
  setListWish((prevWish) =>
    prevWish.filter((item) => item._id !== productId)
  );

  // 2. Select (all products list) update karo taki wishlist flag false ho jaye
  setSelect((prevProducts) =>
    prevProducts.map((item) =>
      item._id === productId
        ? { ...item, inWish: false }
        : item
    )
  );
};

// ✅ Move to Wishlist (from Cart)
const moveToWishlist = (productId) => {
  // 1. Cart se hatao
  setCart((prevCart) => prevCart.filter((item) => item._id !== productId));

  // 2. Wishlist me daalo
  setListWish((prevWish) => {
    const product = select.find((p) => p._id === productId);
    if (!product) return prevWish;

    // agar already wishlist me hai to dobara add na karo
    const exists = prevWish.find((p) => p._id === productId);
    if (exists) return prevWish;

    return [
      ...prevWish,
      { ...product, inWish: true, }
    ];
  });

  // 3. Flags update
  setSelect((prevProducts) =>
    prevProducts.map((item) =>
      item._id === productId
        ? { ...item, inWish: true,  }
        : item
    )
  );
};




  // ✅ Filter + Sort
  const filterHandleEvent = select
  .filter((product) => {
    // ✅ Category filter for multiple selections
    if (category.length > 0 && !category.includes("All")) {
      return category.includes(product.subCategory || product.category);
    }
    return true; // agar "All" ya empty hai, sab products dikhao
  })
  .filter((product) => {
    // ✅ Price filter
    return product.price <= price;
  })
  .filter((product) => {
    // ✅ Rating filter
    if (rating > 0) {
      return product.rating >= rating;
    }
    return true;
  })
  .sort((a, b) => {
    // ✅ Sort filter
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });



  // ✅ Clear Filters
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
        cart, //  ab cart state accessible hai
        loading,
        error,
        data,
        listWish,
        handleWish,
        setCart,
        searchTerm,
        setSearchTerm,
        removeFromWishlist,
        moveToWishlist
        // setCategories,
        // categories
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}
