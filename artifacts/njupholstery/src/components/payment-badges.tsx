import { Banknote, Store, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground hover:bg-muted font-medium text-xs">
        <Banknote className="h-3.5 w-3.5" />
        Cash on Delivery
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground hover:bg-muted font-medium text-xs">
        <Store className="h-3.5 w-3.5" />
        In-Store Purchase
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-medium text-xs border border-[#25D366]/20">
        <Smartphone className="h-3.5 w-3.5" />
        WhatsApp Order
      </Badge>
    </div>
  );
}
