import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z, ZodError } from "zod";
import { ACCESS_TOKEN_COOKIE_KEY } from "../../../consts";
import { CreateProductDto } from "../../../dtos";

import useAuth from "../../../hooks/useAuth";
import useAuthenticatedFetch from "../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../service";
import { IProduct, IProductCategory } from "../../../types";
import { getAccessToken } from "../../../utils/AuthUtils";
import { toastZodErrors } from "../../../utils/ZodUtils";
import Layout from "../../Layout";

export default function MyProducts() {
  const { tokenRefreshed, user } = useAuth();
  const router = useRouter();

  const { data: categories } = useAuthenticatedFetch<IProductCategory[]>(
    `product/categories`,
    [tokenRefreshed, user]
  );

  const [addingProduct, setAddingProduct] = useState<CreateProductDto>({
    name: "",
    description: "",
    category: !!categories && categories.length > 0 ? categories[0].name : "",
    price: 0,
    image: "",
    status: "pending",
  });

  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleAddProduct = async () => {
    console.log({ addingProduct });
    try {
      const formdata = new FormData();
      const payload = z
        .object({
          name: z.string().min(1),
          description: z.string(),
          category: z.string(),
          price: z.number().gt(0),
          status: z.string(),
        })
        .parse(addingProduct);
      if (!!!imgFile) {
        toast.error("Image is required");
        return;
      }
      formdata.append("MMaExhYy6NYi67symxfOEP4Hb5fl7N", imgFile);
      const image = await jsxService()
        .post(`/firebase/upload`, formdata)
        .then((res) => res.data.url);
      console.log({ image });

      if (typeof image !== "string") {
        toast.error("Error uploading image");
        return;
      }
      await jsxService().post(`product/create`, { ...payload, image });
      router.push(`/dashboard/my-products`);
    } catch (error) {
      console.log("Error adding products : ", error);
      toastZodErrors(error);
    }
  };

  return (
    <Layout role="user">
      <h1>UserDashboard</h1>
      <div className="m-12 ">
        <div className="p-4 w-full max-w-sm bg-gray-200 rounded-lg border shadow-md sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Add Product
          </h5>

          <div className="mb-6">
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Name"
              required
              value={addingProduct.name}
              onChange={(e) =>
                setAddingProduct((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div className="mb-6">
            <textarea
              id="description"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product Description..."
              value={addingProduct.description}
              onChange={(e) =>
                setAddingProduct((p) => ({
                  ...p,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Select Product Catagory
            </label>
            <select
              value={addingProduct.category}
              onChange={(e) =>
                setAddingProduct((p) => ({ ...p, category: e.target.value }))
              }
              id="cataegory"
              name="cataegory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {!!categories &&
                categories.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-6">
            <input
              type="number"
              id="price"
              name="price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Price"
              required
              value={addingProduct.price || ""}
              onChange={(e) =>
                setAddingProduct((p) => ({
                  ...p,
                  price:
                    e.target.value === "0" || isNaN(e.target.valueAsNumber)
                      ? 0
                      : e.target.valueAsNumber,
                }))
              }
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload file
            </label>
            <input
              id="image"
              name="image"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointerfocus:outline-none"
              aria-describedby="user_avatar_help"
              type="file"
              // accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setImgFile(f);
              }}
            />
            <div className="mt-1 text-sm text-gray-500" id="user_avatar_help">
              A Product picture is useful to customers
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handleAddProduct}
                type="button"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
