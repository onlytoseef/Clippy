"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProfileDropdown from "./ui/profile-dropdown";
import { useGetUser } from "@/hooks/useAuth";
import PlanDialog from "./dialogs/plan";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { data } = useGetUser();

  useEffect(() => {
    setToken(localStorage.getItem("auth_token_x"));
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (data?.plan === null) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Logo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, href,  }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center space-x-1 text-foreground hover:text-primary cursor-pointer transition-colors"
              >
                <p>{label}</p>
               
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-primary hover:text-white">
              Contact Sales
            </Button>
            <Link href="/auth/login">
              <Button
                variant="default"
                size="sm"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden pb-100">
            <div className="py-4 px-4 flex flex-col space-y-4">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMobileMenu}
                  className="text-foreground hover:text-primary transition-colors text-center text-base py-2"
                >
                  {label}
                </Link>
              ))}

              {token && (
                <Link
                  href="/dashboard"
                  onClick={(e) => {
                    closeMobileMenu();
                    handleDashboardClick(e);
                  }}
                  className="text-foreground hover:text-primary text-center transition-colors text-base py-2"
                >
                  Dashboard
                </Link>
              )}

              {!token && (
                <div className="flex flex-col items-center">
                  <div className="border-t border-border my-2" />
                  <Link href="/auth/login" onClick={closeMobileMenu}>
                    <Button variant="default" size="lg" className="w-full max-w-40">
                      Log In / Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <PlanDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
