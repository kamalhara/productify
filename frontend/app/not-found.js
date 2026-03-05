import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-slideUp">
        <h1 className="heading-display text-6xl xs:text-7xl md:text-8xl lg:text-9xl text-text-primary dark:text-white mb-4">
          404
        </h1>
        <p className="text-lg xs:text-xl font-semibold text-text-primary dark:text-white mb-2">
          Page not found
        </p>
        <p className="text-sm text-text-muted dark:text-neutral-500 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-surface-dark dark:bg-white text-text-light dark:text-black rounded-full hover:bg-surface-dark-soft dark:hover:bg-neutral-200 transition-all duration-200 hover:shadow-md hover:shadow-black/10"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
