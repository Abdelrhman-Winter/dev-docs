/* eslint-disable @typescript-eslint/no-explicit-any */
"useClient";
import { sessionStatus } from "@/lib/session";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function WithAuth(Component: any) {
  return function WithAuth(props: any) {
    const session = sessionStatus;
    useEffect(() => {
      if (!session) {
        redirect("/");
      }
    }, []);
    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
