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
  const handleSubmit = (selectId, addData) => {
    setSelect((prevProducts) => {
      const updatedList = prevProducts.map((item) => {
        if (item._id === selectId && item.add?.size === addData?.size) {
          // Same product & same size → quantity update
          return {
            ...item,
            inCart: true,
            add: {
              ...item.add,
              qty: (item.add?.qty) + (addData?.qty),
            },
          };
        }
        return item;
      });

      // Agar same product but alag size hai → push as new
      const exists = updatedList.some(
        (item) => item._id === selectId && item.add?.size === addData?.size
      );

      if (!exists) {
        const product = prevProducts.find((item) => item._id === selectId);
        updatedList.push({
           ...product,
          _id: selectId,
          inCart: true,
          add: addData, // { qty, size }
        });
      }

      setCart(updatedList.filter((item) => item.inCart));
      return updatedList;
    });
  };

  const handleWish = (productId) => {
    const updatedList = select.map((item) =>
      item._id === productId ? { ...item, inWish: !item.inWish } : item
    );
    setSelect(updatedList);

    const wishlistItems = updatedList.filter((item) => item.inWish);
    setListWish(wishlistItems);
  };

  // ✅ Direct remove from wishlist
  const removeFromWishlist = (productId) => {
    const updatedList = select.map((item) =>
      item._id === productId ? { ...item, inWish: false } : item
    );
    setSelect(updatedList);

    const wishlistItems = updatedList.filter((item) => item.inWish);
    setListWish(wishlistItems);
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
        // setCategories,
        // categories
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}
