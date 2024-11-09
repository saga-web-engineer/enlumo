import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerInfo } from "../components/customer/CustomerInfo";

export default function SearchPage() {
  return (
    <div className="container p-4 min-h-screen flex flex-col">
      <div className="mt-64 flex flex-col gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          IDけんさく！
        </h1>
        <form className="">
          <Input type="number" />
          <Button className="w-full mt-8">けんさく！</Button>
        </form>
        <div>
          <CustomerInfo />
        </div>
      </div>
    </div>
  )
}
