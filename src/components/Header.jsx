import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import CartStatus from "./CartStatus";
import WishListStatus from "./WishListStatus";
import { useEcommerceContext } from "../contexts/EcommerceContext";

const Header = () => {
  const {setSearchTerm,searchTerm}=useEcommerceContext()
  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          position: "fixed",
          width: "100%",
          background: "white", // navbar background
          padding: "1rem 2rem",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderBottomLeftRadius: "50px", // bottom-left half-round
          borderBottomRightRadius: "50px", // bottom-right half-round
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center " to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6k5Tu66DF6VCECJhNpevf6DrSSn81KRaA9Q&s"
              alt="ecommerce"
              //   style={{ width: "50px", height: "50px", objectFit: "cover" }}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover", // fill the box
                borderRadius: "50%",
                marginTop: "10px",
                // circle
              }}
              className="me-2 rounded-circle"
            />
            <span className="fw-bold">MyShop</span>
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Left nav links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Product Cart
                </Link>
              </li>
            </ul>

            {/* Search bar */}
            <form className="d-flex my-2 my-lg-0" onSubmit={(e)=>e.preventDefault()}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control border-0 border-bottom bg-transparent rounded-0 shadow-none"
                  placeholder="Search"
                  aria-label="Search"
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
              <i className="bi bi-person-circle fs-4"></i>
              <Link to="/wishlist" className="position-relative"><i className="bi bi-heart fs-4"></i>
               <span
                  className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                ><WishListStatus/></span>
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

      {/* Spacer so content doesn't hide behind navbar */}
      <div style={{ paddingTop: "90px" }}></div>
    </>
  );
};

export default Header;
