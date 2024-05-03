import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

const ErrorComponent: React.FC<{
  message?: string;
  variant?: "general" | "not_found";
}> = ({ message = "Something went wrong!", variant = "general" }) => {
  return (
    <>
      {variant === "general" && (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          <p>{message}</p>
        </div>
      )}
      {variant === "not_found" && (
        <NotFoundComponent message={message}></NotFoundComponent>
      )}
    </>
  );
};

export default ErrorComponent;

export const NotFoundComponent: React.FC<{ message?: string }> = ({
  message = "Not found Error! Please go back to your previous page",
}) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col gap-4 p-4"
      style={{ color: "red", textAlign: "center", marginTop: "20px" }}
    >
      <p>{message}</p>
      <p> ㄟ( ▔, ▔ )ㄏ </p>
      <Button
        onClick={() => {
          router.back();
        }}
        size={"default"}
      >
        Go back here 👈
      </Button>
    </div>
  );
};
