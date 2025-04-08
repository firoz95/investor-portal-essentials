
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const investorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10, { message: "Mobile number must be valid" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  capitalCommitment: z.object({
    total: z.number().positive({ message: "Commitment must be positive" }),
    class: z.string().min(1, { message: "Class is required" }),
  }),
  tags: z.array(z.string()).optional(),
});

type InvestorFormValues = z.infer<typeof investorSchema>;

interface InvestorFormProps {
  defaultValues?: Partial<InvestorFormValues>;
  onSubmit: (values: InvestorFormValues) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const InvestorForm: React.FC<InvestorFormProps> = ({
  defaultValues = {
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    capitalCommitment: {
      total: 0,
      class: "Class A",
    },
    tags: [],
  },
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const { toast } = useToast();
  
  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues,
  });
  
  const handleSubmit = (values: InvestorFormValues) => {
    onSubmit(values);
    form.reset();
    
    toast({
      title: isEdit ? "Investor updated" : "Investor created",
      description: `${values.name} has been ${isEdit ? "updated" : "added"} successfully.`
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Investor" : "Add New Investor"}</CardTitle>
        <CardDescription>
          {isEdit 
            ? "Update the investor's information" 
            : "Fill in the details to add a new investor"}
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9999999999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Investor will use this to login
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 6 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Investment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="capitalCommitment.total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Commitment (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="1000000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="capitalCommitment.class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Class</FormLabel>
                      <FormControl>
                        <Input placeholder="Class A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {isEdit ? "Update Investor" : "Add Investor"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default InvestorForm;
