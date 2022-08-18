import useAuth from "../../../hooks/useAuth";

export default function MyProducts() {
  const { tokenRefreshed, user } = useAuth();
  return (
    <div>
      <h1>My Products</h1>
    </div>
  );
}
