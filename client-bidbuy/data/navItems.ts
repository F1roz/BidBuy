export const userNavRoutes = [
  { link: "/dashboard", name: "Home" },
  { link: "/dashboard/my-products", name: "My Products" },
  { link: "/browse-products", name: "Browse Products" },
];

export const adminNavRoutes = [
  { link: "/dashboard/users", name: "Users" },
  { link: "/dashboard/manageProducts", name: "Products" },
  { link: "/dashboard/admin/manage-categories", name: "Categories" },
];

export const unauthenticatedNavItems = [
  { link: "/", name: "Home" },
  { link: "/auth/login", name: "Login" },
  { link: "/auth/sign-up", name: "Sign Up" },
];
