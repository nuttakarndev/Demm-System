import Sidebar from "../Sidebar";
export default function Page({ children }) {
  return (
    <main className="template">
      <Sidebar />
      <div className="p-3 overflow-y-auto">{children}</div>
    </main>
  );
}
