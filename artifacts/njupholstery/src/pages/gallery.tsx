import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { useListGallery, useListServices } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  const { data: services } = useListServices();
  const { data: gallery, isLoading } = useListGallery(activeServiceId ? { serviceId: activeServiceId } : undefined);

  const categories = [
    { id: null, name: "All Work" },
    ...(services?.map(s => ({ id: s.id, name: s.name })) || [])
  ];

  return (
    <Layout>
      <PageHeader 
        title="Our Portfolio" 
        description="A showcase of restorations, custom builds, and automotive trim."
        imageSrc="https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id || 'all'}
              onClick={() => setActiveServiceId(cat.id)}
              className={`px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors ${
                activeServiceId === cat.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square w-full" />)
          ) : gallery?.map((item) => (
            <div key={item.id} className="group relative bg-background border border-border">
              {item.beforeImageUrl ? (
                <div className="relative aspect-square overflow-hidden group">
                  <img 
                    src={item.beforeImageUrl} 
                    alt={`Before: ${item.title}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img 
                    src={item.imageUrl} 
                    alt={`After: ${item.title}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm group-hover:opacity-0 transition-opacity">Before</div>
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">After</div>
                </div>
              ) : (
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{item.serviceName}</div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                {item.description && <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {gallery?.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground text-lg">No gallery items found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
