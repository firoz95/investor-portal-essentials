
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  User, 
  Bell, 
  FileText, 
  Settings,
  Power
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { investorProfile } from "@/utils/mockData";

// Sample data for the admin dashboard
const investorsList = [
  {
    id: "INV-20210515-001",
    name: "Gauri Khan Family Trust",
    email: "gauri.khan@example.com",
    contactPerson: "Gauri Khan",
    contactPhone: "+91 98765 43210",
    totalCommitment: 20000000,
    username: "gkft",
    password: "gkft",
    dateCreated: "2021-05-15",
    status: "Active"
  },
  {
    id: "INV-20210620-002",
    name: "Sharma Holdings",
    email: "vk.sharma@example.com",
    contactPerson: "Vikram Sharma",
    contactPhone: "+91 87654 32109",
    totalCommitment: 15000000,
    username: "sharma",
    password: "sharma123",
    dateCreated: "2021-06-20",
    status: "Active"
  },
  {
    id: "INV-20210810-003",
    name: "Patel Investments",
    email: "nitin.patel@example.com",
    contactPerson: "Nitin Patel",
    contactPhone: "+91 76543 21098",
    totalCommitment: 25000000,
    username: "patel",
    password: "patel123",
    dateCreated: "2021-08-10",
    status: "Inactive"
  }
];

// Sample drawdown notices
const drawdownNotices = [
  {
    id: "DD-2023-001",
    date: "2023-02-15",
    dueDate: "2023-02-28",
    amount: 2000000,
    percentage: 10,
    purpose: "Investment in Native Milk",
    status: "Sent"
  },
  {
    id: "DD-2023-002",
    date: "2023-05-10",
    dueDate: "2023-05-25",
    amount: 3000000,
    percentage: 15,
    purpose: "Investment in JetSynthesys",
    status: "Draft"
  }
];

// Empty investor form template
const emptyInvestorForm = {
  name: "",
  email: "",
  contactPerson: "",
  contactPhone: "",
  totalCommitment: 0,
  username: "",
  password: "",
  address: "",
  accreditationStatus: "Pending",
  status: "Active"
};

// Empty drawdown form template
const emptyDrawdownForm = {
  date: new Date().toISOString().split('T')[0],
  dueDate: "",
  amount: 0,
  percentage: 0,
  purpose: "",
  status: "Draft"
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("investors");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateInvestorOpen, setIsCreateInvestorOpen] = useState(false);
  const [isCreateDrawdownOpen, setIsCreateDrawdownOpen] = useState(false);
  const [isEditInvestorOpen, setIsEditInvestorOpen] = useState(false);
  const [isEditDrawdownOpen, setIsEditDrawdownOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
  const [selectedDrawdown, setSelectedDrawdown] = useState<any>(null);
  const [investorForm, setInvestorForm] = useState(emptyInvestorForm);
  const [drawdownForm, setDrawdownForm] = useState(emptyDrawdownForm);
  
  // Filtered investors based on search term
  const filteredInvestors = investorsList.filter(investor => 
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle investor form changes
  const handleInvestorFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestorForm({
      ...investorForm,
      [name]: name === "totalCommitment" ? parseFloat(value) : value
    });
  };
  
  // Handle drawdown form changes
  const handleDrawdownFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDrawdownForm({
      ...drawdownForm,
      [name]: name === "amount" || name === "percentage" ? parseFloat(value) : value
    });
  };
  
  // Create or edit investor
  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditInvestorOpen) {
      toast({
        title: "Investor updated",
        description: `${investorForm.name} has been updated successfully.`
      });
      setIsEditInvestorOpen(false);
    } else {
      toast({
        title: "Investor created",
        description: `${investorForm.name} has been created with username: ${investorForm.username}`
      });
      setIsCreateInvestorOpen(false);
    }
    
    // Reset form
    setInvestorForm(emptyInvestorForm);
  };
  
  // Create or edit drawdown notice
  const handleDrawdownSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditDrawdownOpen) {
      toast({
        title: "Drawdown notice updated",
        description: `Drawdown notice has been updated successfully.`
      });
      setIsEditDrawdownOpen(false);
    } else {
      toast({
        title: "Drawdown notice created",
        description: `New drawdown notice has been created.`
      });
      setIsCreateDrawdownOpen(false);
    }
    
    // Reset form
    setDrawdownForm(emptyDrawdownForm);
  };
  
  // Open edit investor dialog
  const handleEditInvestor = (investor: any) => {
    setSelectedInvestor(investor);
    setInvestorForm(investor);
    setIsEditInvestorOpen(true);
  };
  
  // Open edit drawdown dialog
  const handleEditDrawdown = (drawdown: any) => {
    setSelectedDrawdown(drawdown);
    setDrawdownForm(drawdown);
    setIsEditDrawdownOpen(true);
  };
  
  // View investor details (navigate to their dashboard)
  const handleViewInvestor = (investor: any) => {
    // In a real application, this would show the investor view
    toast({
      title: "Viewing investor",
      description: `Viewing ${investor.name}'s dashboard.`
    });
    navigate("/dashboard");
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Logo size="md" />
              <div className="ml-4 hidden md:block">
                <h1 className="text-xl font-semibold text-foreground">Admin Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm hidden md:block">
                <span className="text-muted-foreground">Logged in as </span>
                <span className="font-medium">Super Admin</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/login")}
                className="flex items-center"
              >
                <Power className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage investors, drawdown notices, and fund data</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <Eye className="mr-2 h-4 w-4" />
              Investor View
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="investors" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="investors" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="drawdowns" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Drawdown Notices
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="investors" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-64 md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search investors..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isCreateInvestorOpen} onOpenChange={setIsCreateInvestorOpen}>
                <DialogTrigger asChild>
                  <Button className="whitespace-nowrap">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Investor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Investor</DialogTitle>
                    <DialogDescription>
                      Enter the investor details to create a new account
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleInvestorSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Investor Name</label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={investorForm.name} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={investorForm.email} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</label>
                          <Input 
                            id="contactPerson" 
                            name="contactPerson" 
                            value={investorForm.contactPerson} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="contactPhone" className="text-sm font-medium">Contact Phone</label>
                          <Input 
                            id="contactPhone" 
                            name="contactPhone" 
                            value={investorForm.contactPhone} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="totalCommitment" className="text-sm font-medium">Total Commitment (₹)</label>
                          <Input 
                            id="totalCommitment" 
                            name="totalCommitment" 
                            type="number" 
                            value={investorForm.totalCommitment} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="address" className="text-sm font-medium">Address</label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={investorForm.address} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="username" className="text-sm font-medium">Username</label>
                          <Input 
                            id="username" 
                            name="username" 
                            value={investorForm.username} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="password" className="text-sm font-medium">Password</label>
                          <Input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={investorForm.password} 
                            onChange={handleInvestorFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="accreditationStatus" className="text-sm font-medium">Accreditation Status</label>
                          <select 
                            id="accreditationStatus" 
                            name="accreditationStatus" 
                            className="w-full p-2 border rounded"
                            value={investorForm.accreditationStatus}
                            onChange={(e) => setInvestorForm({...investorForm, accreditationStatus: e.target.value})}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Verified">Verified</option>
                            <option value="Not Verified">Not Verified</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="status" className="text-sm font-medium">Status</label>
                          <select 
                            id="status" 
                            name="status" 
                            className="w-full p-2 border rounded"
                            value={investorForm.status}
                            onChange={(e) => setInvestorForm({...investorForm, status: e.target.value})}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsCreateInvestorOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Investor</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Commitment</TableHead>
                      <TableHead className="hidden lg:table-cell">Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvestors.length > 0 ? (
                      filteredInvestors.map((investor) => (
                        <TableRow key={investor.id}>
                          <TableCell className="font-medium">{investor.id}</TableCell>
                          <TableCell>{investor.name}</TableCell>
                          <TableCell>{investor.contactPerson}</TableCell>
                          <TableCell className="hidden md:table-cell">{investor.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{formatCurrency(investor.totalCommitment)}</TableCell>
                          <TableCell className="hidden lg:table-cell">{formatDate(investor.dateCreated)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              investor.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {investor.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewInvestor(investor)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEditInvestor(investor)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Delete"
                                className="text-destructive hover:text-destructive/90"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6">
                          No investors found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drawdowns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Drawdown Notices</h2>
              <Dialog open={isCreateDrawdownOpen} onOpenChange={setIsCreateDrawdownOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Drawdown
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create Drawdown Notice</DialogTitle>
                    <DialogDescription>
                      Create a new drawdown notice to be sent to all investors
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDrawdownSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-medium">Issue Date</label>
                          <Input 
                            id="date" 
                            name="date" 
                            type="date" 
                            value={drawdownForm.date} 
                            onChange={handleDrawdownFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                          <Input 
                            id="dueDate" 
                            name="dueDate" 
                            type="date" 
                            value={drawdownForm.dueDate} 
                            onChange={handleDrawdownFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
                          <Input 
                            id="amount" 
                            name="amount" 
                            type="number" 
                            value={drawdownForm.amount} 
                            onChange={handleDrawdownFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="percentage" className="text-sm font-medium">Percentage of Commitment (%)</label>
                          <Input 
                            id="percentage" 
                            name="percentage" 
                            type="number" 
                            min="0" 
                            max="100" 
                            value={drawdownForm.percentage} 
                            onChange={handleDrawdownFormChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="purpose" className="text-sm font-medium">Purpose</label>
                          <textarea 
                            id="purpose" 
                            name="purpose" 
                            rows={3} 
                            className="w-full p-2 border rounded" 
                            value={drawdownForm.purpose} 
                            onChange={handleDrawdownFormChange} 
                            required 
                          ></textarea>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="status" className="text-sm font-medium">Status</label>
                          <select 
                            id="status" 
                            name="status" 
                            className="w-full p-2 border rounded"
                            value={drawdownForm.status}
                            onChange={handleDrawdownFormChange}
                          >
                            <option value="Draft">Draft</option>
                            <option value="Sent">Sent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsCreateDrawdownOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Drawdown</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Percentage</TableHead>
                      <TableHead className="hidden lg:table-cell">Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drawdownNotices.map((notice) => (
                      <TableRow key={notice.id}>
                        <TableCell className="font-medium">{notice.id}</TableCell>
                        <TableCell>{formatDate(notice.date)}</TableCell>
                        <TableCell>{formatDate(notice.dueDate)}</TableCell>
                        <TableCell>{formatCurrency(notice.amount)}</TableCell>
                        <TableCell className="hidden md:table-cell">{notice.percentage}%</TableCell>
                        <TableCell className="hidden lg:table-cell max-w-[200px] truncate">{notice.purpose}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            notice.status === "Sent" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {notice.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEditDrawdown(notice)}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Delete"
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Edit Investor Dialog */}
        <Dialog open={isEditInvestorOpen} onOpenChange={setIsEditInvestorOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Investor</DialogTitle>
              <DialogDescription>
                Update the investor details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvestorSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-name" className="text-sm font-medium">Investor Name</label>
                    <Input 
                      id="edit-name" 
                      name="name" 
                      value={investorForm.name} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="edit-email" 
                      name="email" 
                      type="email" 
                      value={investorForm.email} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-contactPerson" className="text-sm font-medium">Contact Person</label>
                    <Input 
                      id="edit-contactPerson" 
                      name="contactPerson" 
                      value={investorForm.contactPerson} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-contactPhone" className="text-sm font-medium">Contact Phone</label>
                    <Input 
                      id="edit-contactPhone" 
                      name="contactPhone" 
                      value={investorForm.contactPhone} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-totalCommitment" className="text-sm font-medium">Total Commitment (₹)</label>
                    <Input 
                      id="edit-totalCommitment" 
                      name="totalCommitment" 
                      type="number" 
                      value={investorForm.totalCommitment} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-address" className="text-sm font-medium">Address</label>
                    <Input 
                      id="edit-address" 
                      name="address" 
                      value={investorForm.address} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-username" className="text-sm font-medium">Username</label>
                    <Input 
                      id="edit-username" 
                      name="username" 
                      value={investorForm.username} 
                      onChange={handleInvestorFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-password" className="text-sm font-medium">Password</label>
                    <Input 
                      id="edit-password" 
                      name="password" 
                      type="password" 
                      value={investorForm.password} 
                      onChange={handleInvestorFormChange} 
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-accreditationStatus" className="text-sm font-medium">Accreditation Status</label>
                    <select 
                      id="edit-accreditationStatus" 
                      name="accreditationStatus" 
                      className="w-full p-2 border rounded"
                      value={investorForm.accreditationStatus}
                      onChange={(e) => setInvestorForm({...investorForm, accreditationStatus: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Not Verified">Not Verified</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                    <select 
                      id="edit-status" 
                      name="status" 
                      className="w-full p-2 border rounded"
                      value={investorForm.status}
                      onChange={(e) => setInvestorForm({...investorForm, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditInvestorOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Investor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Edit Drawdown Dialog */}
        <Dialog open={isEditDrawdownOpen} onOpenChange={setIsEditDrawdownOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Drawdown Notice</DialogTitle>
              <DialogDescription>
                Update the drawdown notice details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDrawdownSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-date" className="text-sm font-medium">Issue Date</label>
                    <Input 
                      id="edit-date" 
                      name="date" 
                      type="date" 
                      value={drawdownForm.date} 
                      onChange={handleDrawdownFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-dueDate" className="text-sm font-medium">Due Date</label>
                    <Input 
                      id="edit-dueDate" 
                      name="dueDate" 
                      type="date" 
                      value={drawdownForm.dueDate} 
                      onChange={handleDrawdownFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-amount" className="text-sm font-medium">Amount (₹)</label>
                    <Input 
                      id="edit-amount" 
                      name="amount" 
                      type="number" 
                      value={drawdownForm.amount} 
                      onChange={handleDrawdownFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-percentage" className="text-sm font-medium">Percentage of Commitment (%)</label>
                    <Input 
                      id="edit-percentage" 
                      name="percentage" 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={drawdownForm.percentage} 
                      onChange={handleDrawdownFormChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="edit-purpose" className="text-sm font-medium">Purpose</label>
                    <textarea 
                      id="edit-purpose" 
                      name="purpose" 
                      rows={3} 
                      className="w-full p-2 border rounded" 
                      value={drawdownForm.purpose} 
                      onChange={handleDrawdownFormChange} 
                      required 
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                    <select 
                      id="edit-status" 
                      name="status" 
                      className="w-full p-2 border rounded"
                      value={drawdownForm.status}
                      onChange={handleDrawdownFormChange}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent</option>
                    </select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDrawdownOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Drawdown</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo size="sm" showText={true} />
            <span className="ml-2 text-sm text-muted-foreground">Admin Portal</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} New Age Entrepreneurs Fund. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
