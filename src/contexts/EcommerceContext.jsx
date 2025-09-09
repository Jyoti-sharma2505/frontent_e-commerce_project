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

  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");

  // ✅ products with inCart field
  const [select, setSelect] = useState([]);
  const [cart, setCart] = useState([]);
  const [ listWish,setListWish] =useState([])
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

    useEffect(() => {
    if (categoryFilter) {
      setCategory(categoryFilter);
    }
  }, [categoryFilter]);

  // ✅ Add/Remove Cart
const handleSubmit = (selectId, addData) => {
  setSelect((prevProducts) => {
    const updatedList = prevProducts.map((item) =>
      item._id === selectId
        ? {
            ...item,
            inCart: !item.inCart,
            add: addData,   // ✅ quantity & size yaha store hoga
          }
        : item
    );

    setCart(updatedList.filter((item) => item.inCart)); // cart update
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

  // ✅ Filter + Sort
  const filterHandleEvent = select
    ?.filter((item) => {
      if (categoryFilter !== "All" && item.subCategory !== categoryFilter)
        return false;

      if (category !== "All" && item.subCategory !== category) return false;

      if (item.price > price) return false;

      if (rating && item.rating < rating) return false;

        if (
      searchTerm &&
      !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true
    })
    ?.sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  // ✅ Clear Filters
  const clearFilters = () => {
    setCategory("All");
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
          searchTerm, setSearchTerm,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}
