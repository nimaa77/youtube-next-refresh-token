"use client";

import Link from "next/link";

import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/orders"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Orders
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Products
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Settings
              </Link>
            </nav>
            <button
              className="ms-auto"
              onClick={() => {
                // TODO: call `signOut
                // and redirect to /
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  );
}
