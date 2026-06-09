import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { useListReviews, useCreateReview } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { staticReviews } from "@/lib/static-data";

const reviewSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export default function Reviews() {
  const { data: reviewsDataApi, isLoading, refetch } = useListReviews();
  const createReview = useCreateReview();
  const { toast } = useToast();

  const reviewsData = reviewsDataApi ?? staticReviews;
  
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      customerName: "",
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof reviewSchema>) => {
    createReview.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Review submitted",
            description: "Thank you for your feedback!",
          });
          form.reset();
          refetch();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not submit review. Please try again.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <PageHeader 
        title="Client Reviews" 
        description="Don't just take our word for it. Hear what our clients have to say about our craftsmanship."
        imageSrc="https://images.unsplash.com/photo-1540932239986-30128078f3ea?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-end justify-between mb-8 pb-8 border-b border-border">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-2">Recent Reviews</h2>
                <p className="text-muted-foreground">Showing {reviewsData.reviews.length} reviews</p>
              </div>
              
              <div className="text-right">
                <div className="flex justify-end gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(reviewsData.averageRating) ? 'fill-accent text-accent' : 'text-muted'}`} />
                  ))}
                </div>
                <div className="text-sm font-bold">{reviewsData.averageRating} / 5.0 Average</div>
              </div>
            </div>

            {isLoading && !reviewsDataApi ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-8 bg-muted/30">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))
            ) : reviewsData.reviews.map((review) => (
              <div key={review.id} className="p-8 bg-card border border-border shadow-sm">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`} />
                  ))}
                </div>
                <p className="text-lg mb-8 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-lg">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{review.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-muted/30 p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold mb-6">Leave a Review</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => field.onChange(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-8 w-8 transition-colors ${
                                    star <= field.value ? 'fill-accent text-accent' : 'text-muted hover:text-accent/50'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about the quality of work..." 
                            className="bg-background min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-bold uppercase tracking-wider"
                    disabled={createReview.isPending}
                  >
                    {createReview.isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
