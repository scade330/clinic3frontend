import React, { useEffect, useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';



export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
const navigate = useNavigate();


const {user}= useUser();
useEffect(()=>{
  if (user) navigate ('/');
},[]);





  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };


const handleSubmit = async (event) => {
    event.preventDefault();
setLoading(true);
   try {
  const { data } = await axios.post('/api/user/register-user', formData);
  console.log(data);
  toast.success("successfully registered");
  setLoading(false);
navigate('/login'); 

   } catch (e) {
    setLoading(false);
  toast.error(e.response.data);
  console.error(e);
}
};


  return (
    <div className='w-full'>
      <Card>
        <CardHeader>
          <CardTitle>Register with Your Info</CardTitle>
          <CardDescription>Enter your details below to create an account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input 
                  onChange={handleInputChange}  
                  id="username" 
                  placeholder="Enter your full name" 
                /> 
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  onChange={handleInputChange} 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                /> 
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input  
                  onChange={handleInputChange} 
                  id="password" 
                  type="password" 
                  placeholder="Choose a strong password" 
                /> 
              </div>

              <div className="flex flex-col space-y-1.5 mt-2"> 
                <Button 
                  className="bg-blue-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >{loading ? "Registering...":"register"}
                                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
