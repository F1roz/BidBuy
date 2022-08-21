import React, { useState } from "react";
import Layout from "../../../components/Layout";
import useAuthenticatedFetch from "../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../service";
import { IProductCategory } from "../../../types";

const ManageCategories = () => {
  const {
    data: categories,
    refetch,
    setData,
  } = useAuthenticatedFetch<IProductCategory[]>(`product/categories`, []);

  const [name, setName] = useState("");
  const handleAdd = () => {
    setData((data) => (!!data ? [...data, { id: -1, name }] : data));
    jsxService()
      .post(`product/categories/`, { name })
      .then(() => refetch())
      .then(() => setName(""))
      .catch(console.error);
  };
  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold">Manae Categories</h1>
      {categories === null && <h1>Error loading</h1>}
      {!categories && <h1>Loading...</h1>}
      <div className="my-4 flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Category"
          className="p-1 border-2 rounded border-gray-400"
        />
        <button
          className="bg-blue-500 text-white rounded p-1 w-20"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <div>
        {!!categories &&
          categories.map((c) => (
            <CategoryItem
              key={c.id}
              category={c}
              refetch={refetch}
              setData={setData}
            />
          ))}
      </div>
    </Layout>
  );
};

export default ManageCategories;

const CategoryItem = ({
  category,
  refetch,
  setData,
}: {
  category: IProductCategory;
  refetch: () => void;
  setData: React.Dispatch<
    React.SetStateAction<IProductCategory[] | null | undefined>
  >;
}) => {
  const [name, setName] = useState(category.name);
  const handleDelete = () => {
    setData((d) => (!!d ? d.filter((i) => i.id !== category.id) : d));
    jsxService()
      .delete(`product/categories/${category.id}`)
      .then(() => refetch())
      .catch(console.error);
  };

  const handleUpdate = () => {
    setData((data) =>
      !!data
        ? data.map((d) => (d.id === category.id ? { ...d, name } : d))
        : data
    );
    jsxService()
      .put(`product/categories/`, { ...category, name })
      .then(() => refetch())
      .catch(console.error);
  };
  return (
    <div className="my-2 flex gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-1 border-2 rounded border-gray-400"
      />
      <button
        className="bg-red-500 text-white rounded p-1 w-20"
        onClick={handleDelete}
      >
        Delete
      </button>
      {category.name !== name && (
        <button
          className="bg-green-500 text-white rounded p-1 w-20"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
    </div>
  );
};
