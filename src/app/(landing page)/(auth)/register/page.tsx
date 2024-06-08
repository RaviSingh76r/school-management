import RegisterForm from "@/ui/auth/RegisterForm";
import {Toaster} from "react-hot-toast"

const Page = () => {
  return(
    <div>
      <RegisterForm/>
      <Toaster/>
    </div>
  )
}

export default Page