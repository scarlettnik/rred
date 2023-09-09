"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import GoogleSignInButton from "../GoogleSignInButton";

const FormSchema = z
  .object({
    username: z.string().min(1, "Требуется имя пользователя").max(100),
    email: z.string().min(1, "Требуется Email").email("Недопустимый Email"),
    password: z
      .string()
      .min(1, "Требуется пароль")
      .min(8, "Минимальная длина пароля 8 символов"),
    confirmPassword: z.string().min(1, "Требуется подтвердить пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      toast({
        title: "Ошибка регистрации",
        description: "Проверьте правильности заполгнения данных",
        variant: "destructive",
      });
    }
  };

  return (<div style={{width:"100%", color:"white", maxWidth:"600px", backgroundColor:"#7a7a7a", padding:"1rem", borderRadius:"30px"}}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Никнейм" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Повторите пароль"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button style={{backgroundColor:"#ccff00", color:"black"}} className="w-full mt-6" type="submit">
          Зарегистрироваться
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        или
      </div>
      <GoogleSignInButton>Зарегистрироваться с Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Если у вас есть аккаунт, пожалуйста
        <Link style={{color:"#ccff00"}} className="text-blue-500 hover:underline ml-1" href="/sign-in">
          войдите
        </Link>
      </p>
    </Form>
    </div> );
};

export default SignUpForm;
