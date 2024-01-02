export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues", "/issues/:id/edit", "/issues/new", "/issues/:id"],
};
