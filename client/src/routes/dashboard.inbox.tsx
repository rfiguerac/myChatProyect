import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/inbox")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div> Selecciona un chat, o envia un mensaje a un contacto.</div>;
}
