"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.nav}`}>
        <div className={`cursor-pointer ${styles.brand}`}>
          <Image width={60} height={60} src="/log.webp" alt="ventures logo" />
          <div>
            <h1>Eben Tours safaris</h1>
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              Guided & family-friendly treks
            </div>
          </div>
        </div>

        <nav aria-label="Primary navigation">
          <button
            className={styles["nav-toggle"]}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>

          <ul
            id="primary-menu"
            className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
          >
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/destination")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/destination"
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/packages")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/packages"
              >
                Packages
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/services")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/about")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/blogs")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/blogs"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className={
                  "font-semibold px-3 py-2 rounded-lg transition-all " +
                  (isActive("/contact")
                    ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                    : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                }
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          {menuOpen ? (
            <div className="md:hidden absolute right-0 top-[52px] w-[240px] rounded-2xl p-3 bg-[rgba(250,247,244,1)] border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="grid gap-2">
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/destination")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/destination"
                >
                  Destinations
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/packages")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/packages"
                >
                  Packages
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/services")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/services"
                >
                  Services
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/about")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/about"
                >
                  About
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/blogs")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/blogs"
                >
                  Blog
                </Link>
                <Link
                  className={
                    "font-semibold px-3 py-2 rounded-lg transition-all " +
                    (isActive("/contact")
                      ? "bg-[rgba(30,86,49,0.1)] text-[var(--color-primary)]"
                      : "text-[var(--color-secondary)] hover:bg-[rgba(30,86,49,0.1)] hover:text-[var(--color-primary)]")
                  }
                  href="/contact"
                >
                  Contact
                </Link>

                <Link
                  className="mt-2 inline-flex justify-center rounded-xl px-4 py-3 font-bold text-white!"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30, 86, 49, 0.8), rgba(41, 81, 53, 0.8))",
                  }}
                  href="/book"
                >
                  Request a Trek
                </Link>
              </div>
            </div>
          ) : null}
        </nav>

        <div className={`${styles.cta} ${styles.desktopOnly}`}>
          <Link className={styles["cta-primary"]} href="/book">
            Request a Trek
          </Link>
        </div>
      </div>
    </header>
  );
}
