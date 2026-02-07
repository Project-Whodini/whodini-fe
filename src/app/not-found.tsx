import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>The page you requested doesn’t exist.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

