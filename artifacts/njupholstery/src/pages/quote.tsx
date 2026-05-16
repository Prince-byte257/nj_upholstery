import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { useCreateQuote, useListServices } from "@workspace/api-client-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentBadges } from "@/components/payment-badges";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal('')),
  serviceCategory: z.string().min(1, "Service category is required"),
  description: z.string().min(10, "Please provide more details"),
  preferredContact: z.enum(["whatsapp", "call", "email"]).optional(),
});

export default function Quote() {
  const { data: services } = useListServices();
  const createQuote = useCreateQuote();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceCategory: "",
      description: "",
      preferredContact: "whatsapp",
    },
  });

  const onSubmit = (values: z.infer<typeof quoteSchema>) => {
    createQuote.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Quote Request Received",
            description: "We'll get back to you shortly with an estimate.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not send quote request. Please try again or contact us via WhatsApp.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <PageHeader 
        title="Request an Estimate" 
        description="Tell us about your project. The more details you provide, the more accurate our estimate will be."
        imageSrc="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-card border border-border p-8 md:p-12 shadow-sm">
            <h2 className="font-serif text-3xl font-bold mb-8">Project Details</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="082 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Required</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="car_seats">Car Seat Reupholstery</SelectItem>
                            <SelectItem value="couches">Couch / Sofa Recovery</SelectItem>
                            <SelectItem value="office_chairs">Office Chair Repair</SelectItem>
                            <SelectItem value="headboards">Design New Headboards</SelectItem>
                            <SelectItem value="other">Other Custom Work</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the item, current condition, and what you'd like done (e.g. recover 3-seater couch in genuine leather)..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="whatsapp" />
                            </FormControl>
                            <FormLabel className="font-normal">WhatsApp</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="call" />
                            </FormControl>
                            <FormLabel className="font-normal">Phone Call</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="email" />
                            </FormControl>
                            <FormLabel className="font-normal">Email</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-border">
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Accepted Order Methods:</p>
                    <PaymentBadges />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto h-14 px-10 text-base font-bold uppercase tracking-wider"
                    disabled={createQuote.isPending}
                  >
                    {createQuote.isPending ? "Submitting..." : "Send Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
