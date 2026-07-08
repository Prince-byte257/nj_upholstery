import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <PageHeader 
        title="Get in Touch" 
        description="Visit our workshop or contact us for inquiries."
        imageSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you need a quick repair or a complete custom build, our team is ready to discuss your project.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Workshop</h3>
                    <p className="text-muted-foreground">155 Charlotte Maxeke Street<br />Pretoria West</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Operating Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 08:00 - 17:00<br />Saturday: 09:00 - 13:00<br />Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+27740250688" className="hover:text-primary transition-colors">+27 74 025 0688</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">
                      <a href="https://wa.me/27740250688" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">+27 74 025 0688</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-full min-h-[400px] bg-muted relative overflow-hidden border border-border">
            {/* Placeholder for actual map */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-card">
              <MapPin className="h-16 w-16 mb-4 opacity-50" />
              <h3 className="font-serif text-2xl font-bold mb-2 text-foreground">Visit our Shop</h3>
              <p>Map Integration Placeholder</p>
              <p className="text-sm mt-4 max-w-xs">In a production environment, an interactive Google Map or Mapbox component would be rendered here.</p>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
