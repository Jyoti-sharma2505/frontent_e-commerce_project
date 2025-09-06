const Footer = () => {
  return (
    <>
      <footer class="bg-dark text-light pt-5 pb-4">
        <div class="container">
          <div class="row">
            {/* <!-- About / Logo --> */}
            <div class="col-md-3 mb-4 text-center text-md-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6k5Tu66DF6VCECJhNpevf6DrSSn81KRaA9Q&s"
                alt="MyShop"
                style={{width:"60px", height:"60px", objectFit:"cover"}}
                class="rounded-circle mb-2"
              />
              <h5 class="fw-bold">MyShop</h5>
              <p>Your one-stop shop for quality products and services.</p>
            </div>

            {/* <!-- Quick Links --> */}
            <div class="col-md-3 mb-4">
              <h6 class="fw-bold mb-3">Quick Links</h6>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Cart
                  </a>
                </li>
                <li>
                  <a href="#" class="text-light text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Services --> */}
            <div class="col-md-3 mb-4">
              <h6 class="fw-bold mb-3">Our Services</h6>
              <ul class="list-unstyled">
                <li>
                  <i class="bi bi-truck me-2"></i>Free Shipping & Return
                </li>
                <li>
                  <i class="bi bi-currency-dollar me-2"></i>Money Back Guarantee
                </li>
                <li>
                  <i class="bi bi-tag me-2"></i>Best Prices
                </li>
                <li>
                  <i class="bi bi-headset me-2"></i>24/7 Support
                </li>
              </ul>
            </div>

            <div class="col-md-3 mb-4">
              <h6 class="fw-bold mb-3">Contact Us</h6>
              <p>
                <i class="bi bi-telephone me-2"></i>020-800-456-747
              </p>
              <p>
                <i class="bi bi-envelope me-2"></i>support@myshop.com
              </p>
              <p>
                <i class="bi bi-geo-alt me-2"></i>123 Market Street, City
              </p>
            </div>
          </div>

          <hr class="border-light" />

          <div class="text-center pt-3">
            <p class="mb-0">&copy; 2025 MyShop. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
