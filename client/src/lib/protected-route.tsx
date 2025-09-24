import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

// This is a simple wrapper component that handles auth protection
const ProtectedContent = ({ component: Component }: { component: React.ComponentType }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <Component />;
};

// The actual Route wrapper
export function ProtectedRoute({
  path,
  component,
}: {
  path: string;
  component: React.ComponentType;
}) {
  return (
    <Route path={path}>
      <ProtectedContent component={component} />
    </Route>
  );
}