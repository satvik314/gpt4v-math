"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/hooks/useUser";
// import { Button } from "./ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const { user } = useUser();

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (data) redirect("/");
      else throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log({ error });
    }
  };
  return (
    <div className='px-4 lg:px-0 py-2 border-b border-slate-200'>
      <nav className='max-w-7xl mx-auto h-fit  flex justify-between items-center'>
        <Link href='/' className='font-extrabold text-lg'>
          Intellify
        </Link>
        {user ? (
        //   <DropdownMenu>
        //     <DropdownMenuTrigger>
        //       <Avatar>
        //         <AvatarImage src={user.user_metadata.avatar_url} />
        //         <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
        //       </Avatar>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent className='mt-2' align='end'>
        //       <DropdownMenuLabel>My Account</DropdownMenuLabel>
        //       <DropdownMenuSeparator />
        //       <DropdownMenuItem
        //         className='cursor-pointer'
        //         onClick={handleLogout}
        //       >
        //         Logout
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        <button onClick={handleLogout}>Log out with Google</button>
        ) : (

          <button onClick={handleGoogleLogin}>Sign in with Google</button>
        )}
      </nav>
    </div>
  );
}