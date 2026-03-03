import ProductForm from "../components/ProductForm";
import { Plus } from "lucide-react";

export default function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slideUp">
      <div className="flex items-center gap-2 mb-8">
        <Plus className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold">Create Product</h1>
      </div>
      <div className="bg-base-200 p-6 md:p-8 rounded-2xl">
        <ProductForm />
      </div>
    </div>
  );
}
