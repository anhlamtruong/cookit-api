import { Inter } from "next/font/google";
import MainApp from "../_component/main_app";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <div className=" w-screen h-screen">
      <MainApp></MainApp>
    </div>
  );
}
