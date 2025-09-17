import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import CartStatus from "./CartStatus";
import WishListStatus from "./WishListStatus";
import { useEcommerceContext } from "../contexts/EcommerceContext";
import { useState } from "react";

const Header = () => {
  const { setSearchTerm, searchTerm } = useEcommerceContext();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          background: "white",
          padding: "1rem 2rem",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6k5Tu66DF6VCECJhNpevf6DrSSn81KRaA9Q&s"
              alt="logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              className="me-2"
            />
            <span className="fw-bold">MyShop</span>
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              isNavCollapsed ? "" : "show"
            }`}
          >
            {/* Left nav links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/products"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Products
                </Link>
              </li>
            </ul>

            {/* Search */}
            <form
              className="d-flex my-2 my-lg-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-group">
                <input
                  type="search"
                  className="form-control border-0 border-bottom bg-transparent rounded-0 shadow-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text border-0 bg-transparent p-0">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </form>

            {/* Right icons */}
            <div className="ms-lg-3 d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <Link to="/user">
                <img
                  src="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                  alt="user"
                  style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                />
              </Link>

              <Link to="/wishlist" className="position-relative">
                <i className="bi bi-heart fs-4"></i>
                <span
                  className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  <WishListStatus />
                </span>
              </Link>

              <Link to="/cart" className="position-relative">
                <i className="bi bi-cart fs-4"></i>
                <span
                  className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  <CartStatus />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ paddingTop: "90px" }}></div>
    </>
  );
};

export default Header;
