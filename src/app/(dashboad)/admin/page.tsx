import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  
  // Добавляем задержку в 1 секунду
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (session?.user) {
    return <div>Привет, {session?.user.username}</div>;
  } else {
    return <div>Сначала необходимо зарегистрироваться</div>;
  }
};

export default page;