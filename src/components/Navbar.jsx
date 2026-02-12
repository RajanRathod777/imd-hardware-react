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

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: ShoppingBag },
    { to: "/rewards", label: "Rewards", icon: Gift },
    { to: "/contact", label: "Contact", icon: User },
    { to: "/about", label: "About", icon: Info },
];

const Navbar = () => {
    const apiUrl = import.meta.env.VITE_SERVER_API_URL;
    const token = Cookies.get("auth_token") || null;
    const [searchQuery, setSearchQuery] = useState("");
    const { products, cart } = useStore();

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return products.filter((p) =>
            [p.name, p.category_name, p.title, p.size, String(p.price)]
                .join(" ")
                .toLowerCase()
                .includes(q),
        );
    }, [searchQuery, products]);

    return (
        <div
            className="fixed top-0 left-0 w-full z-50"
            style={{ boxShadow: "0 2px 8px var(--shadow-soft)" }}
        >
            <header
                className="px-2 py-1 border-b"
                style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <nav className="grid [grid-template-columns:15%_25%_45%_15%] items-center max-[1035px]:grid-cols-2">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2">
                        <img
                            src="/images/logo.jpeg"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <p
                            style={{
                                fontWeight: "var(--font-semibold)",
                                color: "var(--color-text-primary)",
                            }}
                        >
                            IMD Hardware
                        </p>
                    </NavLink>

                    {/* Profile / Auth */}
                    <div
                        className="flex justify-end gap-2 order-4 max-[1035px]:order-2"
                        style={{ fontSize: "var(--text-sm)" }}
                    >
                        {token ? (
                            <>
                                <QRCodeScanner />

                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `flex items-center gap-1 ${
                                            isActive ? "" : "hover:opacity-80"
                                        }`
                                    }
                                    style={({ isActive }) => ({
                                        color: isActive
                                            ? "var(--color-primary)"
                                            : "var(--color-text-secondary)",
                                    })}
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </NavLink>

                                <NavLink
                                    to="/cart"
                                    className="py-2 flex items-center gap-1 relative"
                                    style={({ isActive }) => ({
                                        color: isActive
                                            ? "var(--color-primary)"
                                            : "var(--color-text-secondary)",
                                    })}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Cart
                                    <span
                                        className="px-1 py-0.5 rounded-lg"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary)",
                                            color: "var(--color-text-on-primary)",
                                            fontSize: "var(--text-xs)",
                                        }}
                                    >
                                        {cart?.length || 0}
                                    </span>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="py-2 flex items-center gap-1 md:px-2 "
                                    style={({ isActive }) => ({
                                        color: isActive
                                            ? "var(--color-primary)"
                                            : "var(--color-text-secondary)",
                                    })}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </NavLink>

                                <span
                                    className="py-2"
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    /
                                </span>

                                <NavLink
                                    to="/register"
                                    className="md:px-2 py-2 flex items-center gap-1"
                                    style={({ isActive }) => ({
                                        color: isActive
                                            ? "var(--color-primary)"
                                            : "var(--color-text-secondary)",
                                    })}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative max-[1035px]:col-span-2 max-[1035px]:order-3 max-[1035px]:mt-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: "var(--color-text-muted)" }}
                        />

                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full h-9 pl-9 pr-4 rounded-lg border focus:outline-none transition-colors"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-text-primary)",
                                fontSize: "var(--text-sm)",
                            }}
                        />

                        {filteredProducts.length > 0 && (
                            <div
                                className="absolute w-full mt-1 max-h-60 overflow-y-auto rounded-lg border z-10"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    borderColor: "var(--color-border)",
                                    boxShadow: "0 4px 12px var(--shadow-soft)",
                                }}
                            >
                                {filteredProducts.map((p) => (
                                    <NavLink
                                        key={p.product_id}
                                        to={`/product/${p.product_id}`}
                                        onClick={() => setSearchQuery("")}
                                        className="block px-3 py-2.5 border-b transition-colors"
                                        style={{
                                            borderColor:
                                                "var(--color-border-light)",
                                        }}
                                    >
                                        <div className="flex gap-3">
                                            <img
                                                src={`${apiUrl}/image/product/${p.images?.[0]}`}
                                                alt={p.name}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <p
                                                        className="truncate"
                                                        style={{
                                                            color: "var(--color-text-primary)",
                                                            fontWeight:
                                                                "var(--font-medium)",
                                                            fontSize:
                                                                "var(--text-sm)",
                                                        }}
                                                    >
                                                        {p.name?.slice(0, 30)}
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: "var(--color-primary)",
                                                            fontWeight:
                                                                "var(--font-semibold)",
                                                            fontSize:
                                                                "var(--text-sm)",
                                                        }}
                                                    >
                                                        ₹{p.price}
                                                    </p>
                                                </div>
                                                <p
                                                    className="truncate"
                                                    style={{
                                                        color: "var(--color-text-muted)",
                                                        fontSize:
                                                            "var(--text-xs)",
                                                    }}
                                                >
                                                    {(
                                                        p.title ||
                                                        p.category_name
                                                    )?.slice(0, 30)}
                                                </p>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop Nav */}
                    <div
                        className="flex justify-center  max-[1035px]:hidden"
                        style={{ fontSize: "var(--text-sm)" }}
                    >
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className="px-4 py-2 flex items-center gap-1"
                                style={({ isActive }) => ({
                                    color: isActive
                                        ? "var(--color-primary)"
                                        : "var(--color-text-secondary)",
                                    fontWeight: "var(--font-medium)",
                                })}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Mobile Bottom Nav */}
                <div
                    className="fixed bottom-0 left-0 w-full hidden max-[1035px]:block border-t"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "0 -2px 8px var(--shadow-soft)",
                    }}
                >
                    <div className="grid grid-cols-5 py-1">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className="flex flex-col items-center py-2"
                                style={({ isActive }) => ({
                                    color: isActive
                                        ? "var(--color-primary)"
                                        : "var(--color-text-secondary)",
                                    fontSize: "var(--text-xs)",
                                    fontWeight: "var(--font-medium)",
                                })}
                            >
                                <Icon className="w-6 h-6 mb-1" />
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
