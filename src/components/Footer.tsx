import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-gradient-to-b from-transparent to-secondary/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gradient mb-3">LUXE</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium fashion marketplace with curated collections for the modern
            lifestyle.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-foreground transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-foreground transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ UPDATED CONTACT SECTION */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@luxe.com.au</li>
            <li>+61 2 1234 5678</li>
            <li>Sydney, NSW, Australia</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 LUXE. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
