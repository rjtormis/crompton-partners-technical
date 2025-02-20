import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header + Hero */}
      <Hero />

      {/* Video Background */}
      <div className="relative flex-grow">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/duwuqu5wj/video/upload/v1740078497/bemynvjukbrodaxhohoy.mp4"
          autoPlay
          loop
          muted
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Palm Sunset</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Discover your dream home with us. Explore stunning properties and find the perfect place
            for your future.
          </p>
        </div>
      </div>
    </div>
  );
}
