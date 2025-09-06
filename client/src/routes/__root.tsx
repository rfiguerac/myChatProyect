import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div className="p-2 flex gap-2"></div>
      <Outlet />
    </>
  );
}
