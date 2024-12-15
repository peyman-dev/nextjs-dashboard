import { Login, Register } from "@/components/ui/form";
import Loading from "@/components/ui/loading";
import { exact } from "@/utils/modules";
import React, { Suspense } from "react";

const page = async ({ params }) => {
  const { method } = await params;

  const { ok: isLoginRoute } = exact.safeTest(method, "login");
  const { ok: isRegisterRoute } = exact.safeTest(method, "register");

  if (!isLoginRoute && !isRegisterRoute) {
    return (
      <div>
        Inavlid Route
      </div>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      {isLoginRoute ? <Login /> : <Register />}
    </Suspense>
  );
};

export default page;
