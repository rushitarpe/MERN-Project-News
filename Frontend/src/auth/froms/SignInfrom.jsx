import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/hooks/use-toast'
import './sign.css'
 
const formSchema = z.object({
  email: z.string().min({message:"Invalid Email address "}),
  password: z.string().min(8,{message:"Password must atleast 8 characters "})
})

const SignInfrom = () => {
  const { toast } =useToast()
  const navigate =useNavigate()
  const [loading,setLoading] =useState(false)
  const [errorMessage,setErrorMessage] =useState(null)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      setLoading(true)
      setErrorMessage(null)
      const res =await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      const data = await res.json()
      if(data.success === false){
        setLoading(false)
        toast({title:"Sign In Failed..! Please try again. "})
        return setErrorMessage(data.message)
      }
     if(res.ok){
      toast({title:"Sign In Successful..! "})
      navigate("/")
      toast({title:"Something went Wrong.! "})
     }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl sm:max-w-5xl
      mx-auto flex-col md:flex-row md:items-center gap-5 '>
        {/* left */}
      <div>
        <Link to={"/"} className='font-bold text-2x1 sm:text-4xl flex flex-wrap  '> 
          <span className='text-slate-500 '>Local</span>
          <span className='text-slate-900 '>Buzz</span>
         </Link>

         <h2 className='text-[24px] md:text-[30px] font-bold
         leading-[140%] tracking-tighter pt-5 sm:pt-12 '>Sign in to your account.</h2>
         <p className='text-slate-500 text-[14px] font-medium laading-[140%] md:text-[16px] md:font-normal mt-2 '>Welcome Back Local Buzz
          , Please provide your details </p>
      </div>



        {/* right */}
        <div className=' flex-1'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="abc@gmail.com" {...field} />
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
        className="bg-blue-500 w-full"
        disabled={loading}
         >{
          loading ? (
            <span className='animate-pulse '>Loading...</span>
          ):(
            <span> Sign In</span>
          )
         }</Button>
      </form>
      </Form>
      <div className='flex gap-2 text-sm mt-5'>
          <span>Don'thave an Account.?</span>
          <Link to="/sign-up" className='text-blue-500 '>
          Sign up</Link>
       </div>
        {errorMessage && <p className='mt-5 text-red-500 '>{errorMessage}</p> }
        </div>
      </div>


    </div>
  )
}

export default SignInfrom