import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@workspace/api-client-react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: searchResults } = useSearch({ q: searchQuery }, { query: { enabled: searchQuery.length > 2 } });

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="NJ Upholstery Services"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <div className={`flex items-center transition-all ${isSearchOpen ? 'w-64 opacity-100' : 'w-8 opacity-0'} absolute right-8 top-1/2 -translate-y-1/2 bg-background border border-input h-10 px-3 overflow-hidden`}>
               <input 
                 className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground" 
                 placeholder="Search..."
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
               />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative z-10">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery.length > 2 && searchResults && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border shadow-lg p-2 max-h-96 overflow-y-auto z-50">
                {searchResults.services?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Services</h4>
                    {searchResults.services.map(s => (
                      <Link key={s.id} href={`/services#${s.id}`} className="block px-2 py-2 hover:bg-muted text-sm" onClick={() => setIsSearchOpen(false)}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.gallery?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Gallery</h4>
                    {searchResults.gallery.map(g => (
                      <Link key={g.id} href={`/gallery`} className="block px-2 py-2 hover:bg-muted text-sm" onClick={() => setIsSearchOpen(false)}>
                        {g.title}
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.services?.length === 0 && searchResults.gallery?.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>
                )}
              </div>
            )}
          </div>
          <Link href="/quote" className="inline-flex h-10 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 absolute w-full">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/quote" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-12 items-center justify-center bg-primary px-6 text-base font-medium text-primary-foreground mt-4"
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
