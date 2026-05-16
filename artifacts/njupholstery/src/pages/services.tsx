import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { useListServices } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { PaymentBadges } from "@/components/payment-badges";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <Layout>
      <PageHeader 
        title="Our Expertise" 
        description="Meticulous craftsmanship across automotive, residential, and commercial upholstery."
        imageSrc="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-20">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-full md:w-1/2 aspect-[4/3] rounded-sm" />
                <div className="w-full md:w-1/2 space-y-4 py-4">
                  <Skeleton className="h-10 w-2/3" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ))
          ) : services?.map((service, index) => (
            <div key={service.id} id={service.id.toString()} className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] overflow-hidden rounded-sm relative">
                  <img 
                    src={service.imageUrl || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800"} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-sm uppercase tracking-widest text-primary font-bold mb-2">{service.category.replace('_', ' ')}</div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{service.name}</h2>
                <div className="text-xl font-medium text-muted-foreground mb-6">Starting from R{service.startingPrice}</div>
                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <PaymentBadges />
                
                <div className="mt-8 flex gap-4">
                  <Link href={`/quote?service=${service.category}`} className="inline-flex h-12 items-center justify-center bg-primary px-8 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-md">
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
