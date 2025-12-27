import { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router";
import Cookies from "js-cookie";

import {
  Search,
  Home,
  ShoppingBag,
  Info,
  Gift,
  User,
  LogIn,
  UserPlus,
  ShoppingCart,
} from "lucide-react";

import { useStore } from "../stores/useStore";
import QRCodeScanner from "./QRCodeScanner";

// Navigation items
const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: ShoppingBag },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/contact", label: "Contact", icon: User },
  { to: "/about", label: "About", icon: Info },
];

const activeClass = "text-[var(--color-primary)]";
const inactiveClass =
  "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]";

const Navbar = () => {
  const apiUrl = import.meta.env.VITE_SERVER_API_URL;
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { products, cart } = useStore();

  useEffect(() => {
    setToken(Cookies.get("auth_token") || null);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    return products.filter((product) =>
      [
        product.name,
        product.category_name,
        product.title,
        product.size,
        String(product.price),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery, products]);

  return (
    <div className="shadow-sm fixed top-0 left-0 w-full z-50">
      <header className="bg-[var(--color-surface)] px-2 py-1">
        <nav
          className="grid [grid-template-columns:15%_25%_45%_15%] items-center
          max-[1035px]:grid-cols-2"
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/images/logo.jpeg" alt="Logo" className="h-8 w-8" />
            <p className="text-base font-semibold text-[var(--color-text-primary)]">
              IMD Hardware
            </p>
          </NavLink>

          {/* Profile / Login */}
          <div className="flex justify-end gap-2 text-sm order-4 max-[1035px]:order-2">
            {token ? (
              <>
                <QRCodeScanner />

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>

                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  <span className="ml-1 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[10px]">
                    {cart?.length || 0}
                  </span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </NavLink>

                <span className="text-gray-400">/</span>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Search */}
          <div className="relative max-[1035px]:col-span-2 max-[1035px]:order-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-9 pl-9 pr-4 rounded-lg border"
            />

            {filteredProducts.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <NavLink
                    key={product.product_id}
                    to={`/product/${product.product_id}`}
                    onClick={() => setSearchQuery("")}
                    className="block px-2 py-2 hover:bg-gray-100 border-b"
                  >
                    <div className="flex gap-3">
                      <img
                        src={`${apiUrl}/image/product/${product.images?.[0]}`}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p>{product.name}</p>
                          <p>{product.price}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {product.title}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="flex justify-center gap-6 text-sm max-[1035px]:hidden">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1 ${
                    isActive ? activeClass : inactiveClass
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Bottom Menu */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow max-[1035px]:block hidden">
          <div className="grid grid-cols-5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `p-2 flex flex-col items-center text-xs ${
                    isActive ? activeClass : inactiveClass
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
