import { buttonVariants } from "../components/ui/button.tsx";

export function NotFoundPage() {
  return (
    <main className="py-14 short-landscape:py-6">
      <div className="page-title">
        <h1>Page not found</h1>
        <a className={buttonVariants()} href="/">
          Back to GolfTally
        </a>
      </div>
    </main>
  );
}
