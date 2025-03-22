import { useState, useEffect } from "react";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { toast, Toaster } from "react-hot-toast";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const UpdateProductForm = ({ selectedProduct, onClose }) => {
  const { updateProduct } = useProductStore();
  const [product, setProduct] = useState(selectedProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProduct(product._id, product);
      toast.success("Product updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <dialog
      id="update_modal"
      className="modal z-10 rounded-lg max-w-full bg-gray-800  w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
    >
      <Toaster />
      <div className="modal-box relative  text-white rounded-lg shadow-lg p-4  max-h-screen overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Update Product</h3>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product?.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
                       px-3 text-white focus:outline-none focus:ring-2
                      focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              rows="3"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                       py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
                       focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product?.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              step="0.01"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
                      py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product?.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
                       shadow-sm py-2 px-3 text-white focus:outline-none 
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {product?.image && (
              <span className="ml-3 text-sm text-gray-400">
                Image uploaded{" "}
              </span>
            )}
          </div>
          {product?.image && (
            <div className="flex justify-center mt-4">
              <img
                src={product?.image}
                alt="Profile"
                className="w-32 h-32 rounded-md object-cover border-4 border-gray-600"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Update Product
              </>
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProductForm;
