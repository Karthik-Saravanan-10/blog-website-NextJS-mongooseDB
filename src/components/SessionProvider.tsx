"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Sessionprovider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Sessionprovider;
