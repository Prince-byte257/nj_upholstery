import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-6 block">
            NJ Upholstery
          </Link>
          <p className="text-primary-foreground/80 max-w-sm mb-6">
            Master craftsmen breathing new life into your cherished furniture and automotive interiors. Quality materials, meticulous attention to detail.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg font-semibold mb-6">Services</h4>
          <ul className="space-y-4">
            <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">Car Seat Reupholstery</Link></li>
            <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">Couch & Sofa Recovery</Link></li>
            <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">Office Chair Repair</Link></li>
            <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">Custom Headboards</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
          <ul className="space-y-4 text-primary-foreground/80">
            <li>155 Charlotte Maxeke Street, Pretoria West</li>
            <li>Mon - Fri: 8am - 5pm</li>
            <li>Sat: 9am - 1pm</li>
            <li><a href="tel:+27740250688" className="hover:text-white transition-colors">+27 74 025 0688</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
        <p>&copy; {new Date().getFullYear()} NJ Upholstery. All rights reserved.</p>
      </div>
    </footer>
  );
}
