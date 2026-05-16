import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 md:bottom-8 md:right-8 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-4 whitespace-nowrap bg-zinc-900 text-white text-sm px-3 py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </a>
  );
}
