export function PageHeader({ title, description, imageSrc }: { title: string, description: string, imageSrc: string }) {
  return (
    <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-zinc-900 text-white pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-zinc-900/60 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-zinc-300 font-light">{description}</p>
      </div>
    </div>
  );
}
