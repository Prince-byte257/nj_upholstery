import { Layout } from "@/components/layout";
import { useGetStats, useListServices, useListGallery, useListReviews } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronRight, Quote as QuoteIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: services, isLoading: servicesLoading } = useListServices();
  const { data: gallery, isLoading: galleryLoading } = useListGallery({ limit: 4 } as any);
  const { data: reviewsData, isLoading: reviewsLoading } = useListReviews();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2000&auto=format&fit=crop" 
            alt="Upholstery craftsmanship" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mt-20">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Crafting comfort. <br/>Restoring legacy.
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-zinc-300 font-light max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            South Africa's premier artisan workshop for worn furniture and car seats. We work with our hands so you can live in comfort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/quote" className="w-full sm:w-auto inline-flex h-14 items-center justify-center bg-primary px-8 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-xl">
              Request a Quote
            </Link>
            <a href="https://wa.me/27123456789" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex h-14 items-center justify-center border border-white/30 bg-white/5 backdrop-blur-sm px-8 text-lg font-medium text-white hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
            ) : stats && (
              <>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-2">{stats.projectsCompleted}+</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-2">{stats.yearsExperience}</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-primary mb-2">{stats.happyClients}</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="font-serif text-5xl md:text-6xl font-bold text-primary">{stats.averageRating}</span>
                    <Star className="h-8 w-8 text-accent fill-accent" />
                  </div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Average Rating</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Expertise</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Meticulous craftsmanship across automotive, residential, and commercial upholstery.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors uppercase tracking-wider text-sm">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesLoading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)
            ) : services?.slice(0, 4).map((service) => (
              <Link key={service.id} href={`/services#${service.id}`} className="group block relative overflow-hidden bg-background">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={service.imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800"} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-serif text-2xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Discover More <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 md:hidden">
            <Link href="/services" className="flex items-center justify-center gap-2 text-primary font-semibold w-full py-4 border border-primary/20 bg-primary/5 uppercase tracking-wider text-sm">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Recent Transformations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">See the difference skilled hands and quality materials can make.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {galleryLoading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full" />)
            ) : gallery?.map((item) => (
              <Link key={item.id} href="/gallery" className="group block aspect-square overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 backdrop-blur-sm">View Project</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/gallery" className="inline-flex h-12 items-center justify-center border border-primary text-primary px-8 font-medium hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm">
              Explore Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Teaser */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <QuoteIcon className="h-16 w-16 text-accent mb-8 opacity-50" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Trusted by hundreds across South Africa.</h2>
              <p className="text-primary-foreground/80 text-lg mb-10">We don't just fix furniture; we restore memories and comfort. Our reputation is built on every stitch.</p>
              <Link href="/reviews" className="inline-flex h-12 items-center justify-center bg-white text-primary px-8 font-semibold hover:bg-white/90 transition-colors uppercase tracking-wider text-sm">
                Read All Reviews
              </Link>
            </div>
            
            <div className="space-y-6">
              {reviewsLoading ? (
                Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-48 w-full bg-white/10" />)
              ) : reviewsData?.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-black/20 p-8 backdrop-blur-sm">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'fill-accent text-accent' : 'text-white/20'}`} />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic mb-6">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center font-bold text-white">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{review.customerName}</div>
                      <div className="text-sm text-primary-foreground/60">{review.serviceName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
