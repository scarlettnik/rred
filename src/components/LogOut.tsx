"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const LogOut = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`
        })
      }
      variant="destructive"
    >
      Выйти
    </Button>
  );
};

export default LogOut;
