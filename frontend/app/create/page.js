import ProductForm from "../components/ProductForm";

export default function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-4 xs:py-6 md:py-8 animate-slideUp">
      <h1 className="heading-display text-2xl xs:text-3xl md:text-4xl mb-6 xs:mb-8 text-text-primary">
        CREATE PRODUCT
      </h1>
      <div className="bg-surface-white p-4 xs:p-6 md:p-8 rounded-2xl xs:rounded-3xl">
        <ProductForm />
      </div>
    </div>
  );
}
