import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../index.css";
import useFetch from "../useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useEcommerceContext } from "../contexts/EcommerceContext";

const brands = [
  "https://varkala-react-2.vercel.app/img/brand/brand-3.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-4.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-5.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-6.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-3.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-4.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-1.svg",
  "https://varkala-react-2.vercel.app/img/brand/brand-6.svg",
];

const Home = () => {
  const [filter, setFilter] = useState("ALL");
  const { filterHandleEvent, handleSubmit, handleWish, loading, error } =
    useEcommerceContext();
  //   const { data, loading, error } = useFetch(
  //     "https://backend-e-commerce-project.vercel.app/products"
  //   );

  //   const filterHandle = data?.getAll?.filter((list) => filter === "All" || list?.subCategory === filter)

  // //   const handleEventWomen = () => {
  // //     const filterList = data.getAll.filter(
  // //       (list) => list.subCategory === "Women"
  // //     );
  // //     console.log(filterList);
  // //   };

  //   const handleEventMen = () => {
  //     const filterMen = data.getAll.filter((list) => list.subCategory === "Men");
  //     console.log(filterMen);
  //   };
  return (
    <>
      <Header />
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div class="carousel-inner " style={{ height: "800px" }}>
          <div className="carousel-item active">
            <img
              src="https://i.pinimg.com/1200x/0b/95/59/0b955953bd4e9c197a911474aaf3476e.jpg"
              className="d-block w-100 h-100"
              alt="..."
              style={{
                objectFit: "cover", // pura image fill karega
                objectPosition: "center",
              }}
            />

            {/* Centered Caption */}
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Royal Weaves
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                Elegance in every drape
              </p>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/736x/39/8c/52/398c527a750e2df0d935b81baccfa0d7.jpg"
              className="d-block w-100 h-50"
              alt="..."
              style={{
                objectFit: "cover",
                objectPosition: "center",
                // height: "50vh",
              }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "3rem",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Linen and denim
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                Set sail for the ultimate adventure.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/1200x/0b/e1/de/0be1dec77e38b62b94ac320bc5306d16.jpg"
              class="d-block w-100 img-fluid"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "3rem",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Louis Philippe
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                The bedding was hardly able to cover it and seemed ready to
                slide off any moment. His many legs, pit
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/1200x/8b/de/4d/8bde4db05c914e7111eb95b8dbe8174e.jpg"
              class="d-block w-100 img-fluid"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "3rem",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Raymond
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                Formal shirts, trousers, women’s office wear.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/736x/a6/31/75/a63175c97f79fcf5621b87be96283243.jpg"
              class="d-block w-100 img-fluid"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "3rem",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                Blouses & Tops
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                Dress to Impress
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="row row-cols-1 row-cols-md-2 g-4 pt-4 pb-4 px-5 ">
        <div class="col">
          <div class="card">
            <Link
              to="/products"
              state={{ categoryName: "Women" }}
              onClick={() => setFilter("Women")}
            >
              <img
                src="https://i.pinimg.com/736x/a2/86/63/a28663a49b5c976bc1c4500dec254315.jpg"
                class="card-img-top"
                alt="..."
              />
            </Link>
            <div class="card-body">
              <h5 class="card-title">Women</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <Link
              to="/products"
              state={{ categoryName: "Men" }}
              onClick={() => setFilter("Men")}
            >
              <img
                src="https://i.pinimg.com/736x/81/f6/90/81f690c81b28dec84730a4cc445f5ac4.jpg"
                class="card-img-top"
                alt="..."
              />
            </Link>
            <div class="card-body">
              <h5 class="card-title">Men</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-card d-flex flex-column justify-content-center align-items-center py-4">
        <div>
          <h1 class=" mb-3 text-center py-4">New Arrivals</h1>
          <p
            class=" card-text  text-center"
            style={{
              fontSize: "1rem",
              marginBottom: "20px",
              color: "#bdbb5bff",
              textAlign: "center",
            }}
          >
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </p>
        </div>
      </div>
      <div className="container py-4">
        <nav
          aria-label="breadcrumb"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <ol
            className="breadcrumb py-3 container ms-3"
            style={{
              marginBottom: 0,
              backgroundColor: "transparent",
              padding: 0,
            }}
          >
            <li className="breadcrumb-item" style={{ color: "#0d6efd" }}>
              <Link
                state={{ categoryName: "All" }}
                to="/products"
                onClick={() => setFilter("All")}
                style={{ color: "#0d6efd", textDecoration: "none" }}
              >
                All Product
              </Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#6c757d", fontWeight: 500 }}
            >
              <Link
                state={{ categoryName: "Men" }}
                to="/products"
                onClick={() => setFilter("All")}
                style={{ color: "#0d6efd", textDecoration: "none" }}
              >
                Men
              </Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#6c757d", fontWeight: 500 }}
            >
              <Link
                state={{ categoryName: "Women" }}
                to="/products"
                onClick={() => setFilter("All")}
                style={{ color: "#0d6efd", textDecoration: "none" }}
              >
                Women
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <div class="container">
        <div class="row g-3">
          {filterHandleEvent?.map((list) => (
            <div class="col-2" key={list._id}>
              <div className="product-card p-3">
                <div className="img-box position-relative">
                  {/* Like Button */}
                  <button
                    className="like-btn"
                    onClick={() => handleWish(list._id)}
                  >
                    <i
                      className={`bi ${
                        list.inWish ? "bi-heart-fill" : "bi-heart"
                      }`}
                      style={{
                        color: list.inWish ? "red" : "#ccc",
                        cursor: "pointer",
                        fontSize: "1.5rem",
                      }}
                    ></i>
                  </button>
                  <img
                    src={list.image}
                    class="img-fluid rounded"
                    alt={list?.name}
                  />

                  {/* Add to Cart Overlay */}
                  <div>
                    <button
                      onClick={() => handleSubmit(list?._id)}
                      className="cart-btn"
                    >
                      {list?.inCart ? "Remove to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>

                <h6 className="mt-2 mb-0">{list?.name}</h6>
                <p>Rs {list?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <Swiper
          spaceBetween={20}
          slidesPerView={3} // show 3 logos
          loop={true} // infinite loop
          breakpoints={{
            640: { slidesPerView: 2 }, // mobile
            768: { slidesPerView: 3 }, // tablet
            1024: { slidesPerView: 4 }, // desktop
          }}
        >
          {brands.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Brand ${index + 1}`}
                style={{ width: "100%", height: "100px", objectFit: "contain" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className="card"
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          lineHeight: "1.6",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            color: "#bdbb5bff",
            textAlign: "center",
          }}
        >
          Our History
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            marginBottom: "15px",
            textAlign: "justify",
          }}
        >
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            textAlign: "justify",
          }}
        >
          He must have tried it a hundred times, shut his eyes so that he
          wouldn't have to look at the floundering legs, and only stopped when
          he began to feel a mild, dull pain there that he had never felt
          before.
        </p>
      </div>

      {/* <div class="card p-3">
        <div class="row g-3">
          <div class="col-3">
            <div class="p-3 bg-light text-center rounded">
                <h4>Free shipping & return</h4>
                <p>Free Shipping over $300</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light text-center rounded">
                <h4>Money back guarantee</h4>
                <p>Free Shipping over $300</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light text-center rounded">
                <h4>Best prices</h4>
                <p>Always the best prices</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light text-center rounded">
                <h4>020-800-456-747</h4>
                <p>Free Shipping over $300</p>
            </div>
          </div>
        </div>
      </div> */}

      <div class=" p-4 shadow-sm ">
        <div class="row g-3 text-center">
          <div class="col-3">
            <div class="p-3 bg-light rounded h-100 d-flex flex-column align-items-center justify-content-center">
              <i class="bi bi-truck fs-2 mb-2"></i>
              <h5 class="fw-bold">Free Shipping & Return</h5>
              <p class="text-muted mb-0">Free Shipping over $300</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light rounded h-100 d-flex flex-column align-items-center justify-content-center">
              <i class="bi bi-currency-dollar fs-2 mb-2"></i>
              <h5 class="fw-bold">Money Back Guarantee</h5>
              <p class="text-muted mb-0">100% Money Back</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light rounded h-100 d-flex flex-column align-items-center justify-content-center">
              <i class="bi bi-tag fs-2 mb-2"></i>
              <h5 class="fw-bold">Best Prices</h5>
              <p class="text-muted mb-0">Always the best prices</p>
            </div>
          </div>
          <div class="col-3">
            <div class="p-3 bg-light rounded h-100 d-flex flex-column align-items-center justify-content-center">
              <i class="bi bi-headset fs-2 mb-2"></i>
              <h5 class="fw-bold">24/7 Support</h5>
              <p class="text-muted mb-0">Call: 020-800-456-747</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
