import React from "react";

const StaticSite = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* --- CSS VARIABLES & RESET --- */
        :root {
            --primary-orange: #FF6600; /* Vibrant Orange */
            --dark-orange: #CC5200;    /* Darker shade for hover */
            --white: #FFFFFF;
            --off-white: #F9F9F9;
            --text-dark: #222222;
            --text-gray: #555555;
            --light-gray: #E0E0E0;
            --shadow: 0 5px 15px rgba(0,0,0,0.1);
            --transition: all 0.3s ease;
        }

        .static-site-wrapper * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .static-site-wrapper {
            font-family: 'Open Sans', sans-serif;
            color: var(--text-dark);
            background-color: var(--off-white);
            line-height: 1.6;
            width: 100%;
        }

        .static-site-wrapper h1, 
        .static-site-wrapper h2, 
        .static-site-wrapper h3, 
        .static-site-wrapper h4, 
        .static-site-wrapper h5, 
        .static-site-wrapper h6 {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 1rem;
        }

        .static-site-wrapper a {
            text-decoration: none;
            color: inherit;
            transition: var(--transition);
        }

        .static-site-wrapper ul {
            list-style: none;
        }

        .static-site-wrapper img {
            max-width: 100%;
            display: block;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }

        .section-padding {
            padding: 80px 0;
        }

        .text-center { text-align: center; }
        .text-orange { color: var(--primary-orange); }

        /* --- BUTTONS --- */
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: var(--primary-orange);
            color: var(--white);
            font-weight: 600;
            border-radius: 5px;
            border: 2px solid var(--primary-orange);
            cursor: pointer;
            text-transform: uppercase;
            font-size: 0.9rem;
        }

        .btn:hover {
            background-color: var(--dark-orange);
            border-color: var(--dark-orange);
        }

        .btn-outline {
            background-color: transparent;
            color: var(--primary-orange);
        }

        .btn-outline:hover {
            background-color: var(--primary-orange);
            color: var(--white);
        }

        /* --- HEADER & NAVIGATION --- */
        header {
            background-color: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .top-bar {
            background-color: #222;
            color: var(--white);
            font-size: 0.85rem;
            padding: 8px 0;
        }

        .top-bar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--primary-orange);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo span { color: var(--text-dark); }

        /* --- HERO SECTION --- */
        .hero {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(255, 102, 0, 0.4)), url('https://picsum.photos/seed/hardwarehero/1920/1080') no-repeat center center/cover;
            height: 80vh;
            display: flex;
            align-items: center;
            color: var(--white);
            text-align: center;
        }

        .hero-content h1 {
            color: var(--white);
            font-size: 3.5rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .hero-content p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        /* --- ABOUT / KEY CONSIDERATIONS --- */
        .key-considerations {
            background-color: var(--white);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .feature-card {
            padding: 30px;
            background: var(--off-white);
            border-left: 4px solid var(--primary-orange);
            border-radius: 5px;
            transition: var(--transition);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow);
        }

        .feature-card i {
            font-size: 2rem;
            color: var(--primary-orange);
            margin-bottom: 15px;
        }

        .feature-card h4 {
            margin-bottom: 10px;
        }

        /* --- CATEGORIES --- */
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }

        .category-card {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: var(--shadow);
            cursor: pointer;
            height: 250px;
        }

        .category-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .category-card:hover img {
            transform: scale(1.1);
        }

        .category-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            padding: 20px;
            color: var(--white);
        }

        /* --- WHY CHOOSE US & STATS --- */
        .why-choose-us {
            background-color: var(--primary-orange);
            color: var(--white);
        }

        .why-choose-us h2 { color: var(--white); }
        .why-choose-us p { color: rgba(255,255,255,0.9); }

        .benefits-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
        }

        .benefits-list {
            flex: 1;
            min-width: 300px;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            font-size: 1.1rem;
        }

        .benefit-item i {
            background: var(--white);
            color: var(--primary-orange);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
        }

        .stats-grid {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            min-width: 300px;
        }

        .stat-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            backdrop-filter: blur(5px);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--white);
            display: block;
        }

        .stat-label {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* --- TRENDING PRODUCTS --- */
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .product-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
            border: 1px solid var(--light-gray);
        }

        .product-card:hover {
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .product-badge {
            background: var(--primary-orange);
            color: var(--white);
            padding: 5px 10px;
            position: absolute;
            top: 15px;
            left: 15px;
            font-size: 0.8rem;
            border-radius: 4px;
            font-weight: 600;
        }

        .product-img-wrapper {
            position: relative;
            height: 200px;
            background-color: #eee;
        }

        .product-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-details {
            padding: 20px;
        }

        .product-details h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }

        .product-details p {
            color: var(--text-gray);
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        /* --- COMPLETE ASSEMBLIES --- */
        .assemblies {
            background-color: var(--white);
        }

        .assembly-container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
        }

        .assembly-card {
            flex: 1;
            min-width: 300px;
            border: 1px solid var(--light-gray);
            border-radius: 8px;
            padding: 25px;
            background: #fff;
            box-shadow: var(--shadow);
            position: relative;
        }

        .assembly-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }

        .time-badge {
            background: #FFF3E0;
            color: var(--primary-orange);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .assembly-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            color: var(--text-gray);
        }

        .assembly-list li::before {
            content: "\\f00c";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            color: green;
            position: absolute;
            left: 0;
            top: 2px;
            font-size: 0.8rem;
        }

        /* --- MANUFACTURING (FUTURE) --- */
        .mfg-products .product-grid .product-card {
            opacity: 0.9;
        }
        .mfg-tag {
            display: block;
            margin-top: 10px;
            font-size: 0.8rem;
            color: #888;
            font-style: italic;
        }

        /* --- PROCESS & QUALITY --- */
        .process-section {
            background-color: var(--off-white);
        }

        .process-steps {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 50px;
            position: relative;
        }

        .step {
            flex: 1;
            min-width: 150px;
            text-align: center;
            margin: 10px;
            position: relative;
            z-index: 2;
        }

        .step-icon {
            width: 80px;
            height: 80px;
            background: var(--white);
            color: var(--primary-orange);
            border: 2px solid var(--primary-orange);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
            margin: 0 auto 15px;
            transition: var(--transition);
        }

        .step:hover .step-icon {
            background: var(--primary-orange);
            color: var(--white);
        }

        .quality-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }

        .quality-item {
            background: var(--white);
            padding: 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            text-align: center;
        }

        /* --- CONTACT --- */
        .contact-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            margin-top: 40px;
        }

        .contact-info {
            flex: 1;
            min-width: 300px;
        }

        .contact-card {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
        }

        .contact-icon {
            width: 50px;
            height: 50px;
            background: var(--primary-orange);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
        }

        .contact-form-box {
            flex: 1;
            min-width: 300px;
            background: var(--white);
            padding: 30px;
            border-radius: 8px;
            box-shadow: var(--shadow);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .form-control {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--light-gray);
            border-radius: 5px;
            font-family: inherit;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary-orange);
        }

        /* --- FOOTER --- */
        footer {
            background-color: #1a1a1a;
            color: #ccc;
            padding-top: 60px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-col h3 {
            color: var(--white);
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-col h3::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50px;
            height: 3px;
            background-color: var(--primary-orange);
        }

        .footer-links li {
            margin-bottom: 12px;
        }

        .footer-links a:hover {
            color: var(--primary-orange);
            padding-left: 5px;
        }

        .footer-bottom {
            background-color: #111;
            padding: 20px 0;
            text-align: center;
            border-top: 1px solid #333;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
            .hero-content h1 { font-size: 2.2rem; }
            .process-steps { flex-direction: column; }
            .step { margin-bottom: 30px; }
            .top-bar { display: none; }
        }
      `,
        }}
      />

      <div className="static-site-wrapper">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container">
            <div className="contact-mini">
              <i className="fas fa-phone-alt"></i> +91 9427893121 |
              <i className="fas fa-envelope"></i> support@imdhardware.com
            </div>
            <div className="social-mini">
              <span>Follow Us: &nbsp;</span>
              <i className="fab fa-facebook-f"></i> &nbsp;
              <i className="fab fa-instagram"></i> &nbsp;
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>

        {/* Header & Nav */}
        <header>
          <div className="container nav-wrapper">
            <a href="#" className="logo">
              <i className="fas fa-tools"></i> IMD<span>Hardware</span>
            </a>
            <a href="#contact" className="btn">
              Get Quote
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container hero-content">
            <h1>Your Trusted Hardware Partner</h1>
            <p>
              Providing high-quality hardware solutions with fast delivery and
              excellent customer service across Gujarat since 2010.
            </p>
            <a href="#products" className="btn">
              Explore Products
            </a>
            <a
              href="#about"
              className="btn btn-outline"
              style={{
                color: "white",
                borderColor: "white",
                marginLeft: "10px",
              }}
            >
              Learn More
            </a>
          </div>
        </section>

        {/* About & Key Considerations */}
        <section id="about" className="section-padding key-considerations">
          <div className="container">
            <div className="text-center">
              <h2>Choosing the Right Hardware</h2>
              <p>
                Our products connect components securely and enable complex
                assembly work with professional results. Here is what matters:
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-gem"></i>
                <h4>Material Quality</h4>
                <p>
                  Opt for stainless steel or corrosion-resistant materials for
                  longevity.
                </p>
              </div>
              <div className="feature-card">
                <i className="fas fa-shield-alt"></i>
                <h4>Safety Features</h4>
                <p>
                  Prioritize tools with built-in safety mechanisms to prevent
                  accidents.
                </p>
              </div>
              <div className="feature-card">
                <i className="fas fa-hand-holding-heart"></i>
                <h4>Ergonomic Design</h4>
                <p>
                  Choose comfortable, user-friendly tools designed for extended
                  use.
                </p>
              </div>
              <div className="feature-card">
                <i className="fas fa-layer-group"></i>
                <h4>Long-term Durability</h4>
                <p>
                  Invest in robust construction that withstands heavy-duty
                  tasks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="section-padding">
          <div className="container">
            <h2 className="text-center">Comprehensive Hardware Categories</h2>
            <div className="categories-grid">
              <div className="category-card">
                <img
                  src="https://picsum.photos/seed/lock/400/300"
                  alt="Security"
                />
                <div className="category-overlay">
                  <h3>Security & Lock Systems</h3>
                  <p>Protect your property with our extensive range.</p>
                </div>
              </div>
              <div className="category-card">
                <img
                  src="https://picsum.photos/seed/doorhandle/400/300"
                  alt="Door Hardware"
                />
                <div className="category-overlay">
                  <h3>Door Hardware Collection</h3>
                  <p>Enhance functionality and aesthetics.</p>
                </div>
              </div>
              <div className="category-card">
                <img
                  src="https://picsum.photos/seed/cabinet/400/300"
                  alt="Cabinet"
                />
                <div className="category-overlay">
                  <h3>Cabinet & Storage</h3>
                  <p>Transform your storage spaces with premium hardware.</p>
                </div>
              </div>
              <div className="category-card">
                <img
                  src="https://picsum.photos/seed/glass/400/300"
                  alt="Glass"
                />
                <div className="category-overlay">
                  <h3>Glass Fittings</h3>
                  <p>Add elegance and sophistication to glass setups.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & Stats */}
        <section className="section-padding why-choose-us">
          <div className="container">
            <div className="benefits-wrapper">
              <div className="benefits-list">
                <h2>Why Choose Us?</h2>
                <p style={{ marginBottom: "20px" }}>
                  We are committed to delivering excellence in every product and
                  service.
                </p>
                <div className="benefit-item">
                  <i className="fas fa-check"></i> Premium Quality Products
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check"></i> Expert Technical Support
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check"></i> Competitive Pricing
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check"></i> Fast Delivery
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-number">15K+</span>
                  <span className="stat-label">Products Catalog</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Satisfied Clients</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section id="products" className="section-padding">
          <div className="container">
            <h2 className="text-center">Trending Products</h2>
            <div className="product-grid">
              {/* Product 1 */}
              <div className="product-card">
                <div className="product-img-wrapper">
                  <span className="product-badge">Security</span>
                  <img
                    src="https://picsum.photos/seed/digitallock/300/200"
                    alt="Smart Digital Lock"
                  />
                </div>
                <div className="product-details">
                  <h3>Smart Digital Lock</h3>
                  <p>
                    Advanced biometric digital lock with mobile app integration.
                  </p>
                  <a
                    href="#contact"
                    className="btn-outline"
                    style={{
                      padding: "5px 15px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
              {/* Product 2 */}
              <div className="product-card">
                <div className="product-img-wrapper">
                  <span className="product-badge">Door Hardware</span>
                  <img
                    src="https://picsum.photos/seed/hinges/300/200"
                    alt="Stainless Steel Hinges"
                  />
                </div>
                <div className="product-details">
                  <h3>Stainless Steel Hinges</h3>
                  <p>
                    Corrosion-resistant heavy-duty hinges for long-lasting
                    performance.
                  </p>
                  <a
                    href="#contact"
                    className="btn-outline"
                    style={{
                      padding: "5px 15px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
              {/* Product 3 */}
              <div className="product-card">
                <div className="product-img-wrapper">
                  <span className="product-badge">Cabinet Hardware</span>
                  <img
                    src="https://picsum.photos/seed/handles/300/200"
                    alt="Cabinet Handle Set"
                  />
                </div>
                <div className="product-details">
                  <h3>Cabinet Handle Set</h3>
                  <p>
                    Elegant modern handles with easy installation mechanism.
                  </p>
                  <a
                    href="#contact"
                    className="btn-outline"
                    style={{
                      padding: "5px 15px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
              {/* Product 4 */}
              <div className="product-card">
                <div className="product-img-wrapper">
                  <span className="product-badge">Glass Accessories</span>
                  <img
                    src="https://picsum.photos/seed/glasskit/300/200"
                    alt="Glass Fitting Kit"
                  />
                </div>
                <div className="product-details">
                  <h3>Glass Fitting Kit</h3>
                  <p>Complete set for glass door and cabinet installations.</p>
                  <a
                    href="#contact"
                    className="btn-outline"
                    style={{
                      padding: "5px 15px",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Product Assemblies */}
        <section className="section-padding assemblies">
          <div className="container">
            <h2 className="text-center">Complete Product Assemblies</h2>
            <p className="text-center">Save time with our curated kits.</p>

            <div className="assembly-container">
              {/* Assembly 1 */}
              <div className="assembly-card">
                <div className="assembly-header">
                  <h3>Complete Door Lock System</h3>
                  <div className="time-badge">
                    <i className="far fa-clock"></i> 15-20 mins
                  </div>
                </div>
                <ul className="assembly-list">
                  <li>Mortise Lock</li>
                  <li>Handle Set</li>
                  <li>Strike Plate</li>
                  <li>Keys (Included)</li>
                </ul>
              </div>

              {/* Assembly 2 */}
              <div className="assembly-card">
                <div className="assembly-header">
                  <h3>Cabinet Hardware Kit</h3>
                  <div className="time-badge">
                    <i className="far fa-clock"></i> 10-15 mins
                  </div>
                </div>
                <ul className="assembly-list">
                  <li>Premium Hinges</li>
                  <li>Modern Handles</li>
                  <li>Drawer Slides</li>
                  <li>Mounting Screws</li>
                </ul>
              </div>

              {/* Assembly 3 */}
              <div className="assembly-card">
                <div className="assembly-header">
                  <h3>Security System Bundle</h3>
                  <div className="time-badge">
                    <i className="far fa-clock"></i> 25-30 mins
                  </div>
                </div>
                <ul className="assembly-list">
                  <li>Main Digital Lock</li>
                  <li>Additional Deadbolt</li>
                  <li>High-Security Bolts</li>
                  <li>Installation Tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Products (Future) */}
        <section className="section-padding mfg-products">
          <div className="container">
            <div className="text-center">
              <h2>Manufacturing Products</h2>
              <p style={{ color: "#666" }}>
                These product images represent the types of products the company
                aims to develop in the future.
              </p>
            </div>
            <div className="product-grid" style={{ marginTop: "30px" }}>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src="https://picsum.photos/seed/mfg1/300/200"
                    alt="Mfg 1"
                  />
                </div>
                <div className="product-details">
                  <h4>Manufacturing Product 1</h4>
                  <span className="mfg-tag">In Development</span>
                </div>
              </div>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src="https://picsum.photos/seed/mfg2/300/200"
                    alt="Mfg 2"
                  />
                </div>
                <div className="product-details">
                  <h4>Manufacturing Product 2</h4>
                  <span className="mfg-tag">In Development</span>
                </div>
              </div>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src="https://picsum.photos/seed/mfg3/300/200"
                    alt="Mfg 3"
                  />
                </div>
                <div className="product-details">
                  <h4>Manufacturing Product 3</h4>
                  <span className="mfg-tag">In Development</span>
                </div>
              </div>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src="https://picsum.photos/seed/mfg4/300/200"
                    alt="Mfg 4"
                  />
                </div>
                <div className="product-details">
                  <h4>Manufacturing Product 4</h4>
                  <span className="mfg-tag">In Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Business Process */}
        <section className="section-padding process-section">
          <div className="container">
            <h2 className="text-center">Our Business Process</h2>
            <div className="process-steps">
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h4>Product Sourcing</h4>
                <p>Direct partnerships with top manufacturers</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h4>Quality Check</h4>
                <p>Rigorous testing and quality assurance</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-warehouse"></i>
                </div>
                <h4>Inventory Management</h4>
                <p>Smart stock optimization</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4>Fast Shipping</h4>
                <p>Quick and reliable delivery</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="section-padding">
          <div className="container">
            <h2 className="text-center">Quality Assurance Process</h2>
            <div className="quality-grid">
              <div className="quality-item">
                <i
                  className="fas fa-cubes fa-3x text-orange"
                  style={{ marginBottom: "15px" }}
                ></i>
                <h4>Raw Material Check</h4>
                <p>Premium material selection</p>
              </div>
              <div className="quality-item">
                <i
                  className="fas fa-vial fa-3x text-orange"
                  style={{ marginBottom: "15px" }}
                ></i>
                <h4>Performance Testing</h4>
                <p>Rigorous durability tests</p>
              </div>
              <div className="quality-item">
                <i
                  className="fas fa-certificate fa-3x text-orange"
                  style={{ marginBottom: "15px" }}
                ></i>
                <h4>Safety Certification</h4>
                <p>International standards</p>
              </div>
              <div className="quality-item">
                <i
                  className="fas fa-box-open fa-3x text-orange"
                  style={{ marginBottom: "15px" }}
                ></i>
                <h4>Packaging Quality</h4>
                <p>Secure delivery guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="section-padding"
          style={{ backgroundColor: "var(--off-white)" }}
        >
          <div className="container">
            <h2 className="text-center">Get In Touch</h2>
            <p className="text-center" style={{ marginBottom: "40px" }}>
              Ready to Start Your Project? Join thousands of satisfied
              customers.
            </p>

            <div className="contact-wrapper">
              {/* Contact Info */}
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone Support</h4>
                    <p>+1 (555) 123-4567</p>
                    <p>+91 9427893121</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email Us</h4>
                    <p>support@imdhardware.com</p>
                    <p>contact@imdhardware.com</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Visit Our Showroom</h4>
                    <p>123 Hardware Street, Industrial Park</p>
                    <p>
                      Near Vaikunthdham Temple, Himatnagar Shamlaji Road,
                      <br />
                      Sabarkantha, Gujarat - 383001
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "#fff",
                      padding: "15px",
                      borderRadius: "5px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <i className="fas fa-truck text-orange fa-2x"></i>
                    <h5 style={{ margin: "5px 0" }}>Free Shipping</h5>
                    <small>On orders above ₹999</small>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "#fff",
                      padding: "15px",
                      borderRadius: "5px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <i className="fas fa-undo text-orange fa-2x"></i>
                    <h5 style={{ margin: "5px 0" }}>Quality Guarantee</h5>
                    <small>30-Day Return Policy</small>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-box">
                <h3>Send a Message</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! We will contact you soon.");
                  }}
                >
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="footer-grid">
              {/* Brand Info */}
              <div className="footer-col">
                <h3>IMD Hardware</h3>
                <p>
                  Your Trusted Hardware Partner. Providing high-quality hardware
                  solutions with fast delivery and excellent customer service
                  across Gujarat.
                </p>
                <div style={{ marginTop: "20px" }}>
                  <i
                    className="fab fa-facebook fa-lg"
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  ></i>
                  <i
                    className="fab fa-instagram fa-lg"
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  ></i>
                  <i
                    className="fab fa-linkedin fa-lg"
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  ></i>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-col">
                <h3>Quick Links</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#products">Products</a>
                  </li>
                  <li>
                    <a href="#about">About Us</a>
                  </li>
                  <li>
                    <a href="#">Rewards</a>
                  </li>
                  <li>
                    <a href="#contact">Contact Us</a>
                  </li>
                </ul>
              </div>

              {/* Policies Section REMOVED as requested */}

              {/* Contact Footer */}
              <div className="footer-col">
                <h3>Contact Us</h3>
                <p>
                  <i className="fas fa-map-marker-alt text-orange"></i>{" "}
                  Himatnagar Shamlaji Road, Sabarkantha, Gujarat - 383001
                </p>
                <p style={{ marginTop: "10px" }}>
                  <i className="fas fa-phone text-orange"></i> +91 9427893121
                </p>
                <p style={{ marginTop: "10px" }}>
                  <i className="fas fa-envelope text-orange"></i>{" "}
                  contact@imdhardware.com
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <div className="container">
              <p>
                &copy; 2026 IMD Hardware. All rights reserved. | GSTIN:
                24BPYPR7738J1ZU
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default StaticSite;
