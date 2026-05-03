import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/agents";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen animated-gradient grid-pattern">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Categories
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Explore AI agents organized by what they do best. Every category is packed with battle-tested agents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
