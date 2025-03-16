
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  capitalCommitment as initialCapitalCommitment,
  capitalContributions as initialCapitalContributions,
  feeCharges as initialFeeCharges,
  distributions as initialDistributions,
  fundInvestments as initialFundInvestments,
  coInvestments as initialCoInvestments,
  documents as initialDocuments,
  drawdownNotices as initialDrawdownNotices,
  investorProfile as initialInvestorProfile,
  navData as initialNavData
} from "@/utils/mockData";

// Define types for our data
export interface Investor {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  contactPhone: string;
  totalCommitment: number;
  username: string;
  password: string;
  dateCreated: string;
  status: string;
  address: string;
  capitalCommitment: {
    total: number;
    class: string;
  };
  capitalContributions: Array<{
    id: string;
    date: string;
    amount: number;
    method: string;
    reference: string;
  }>;
  feeCharges: Array<{
    id: string;
    type: string;
    date: string;
    amount: number;
    status: string;
    description: string;
  }>;
  distributions: Array<{
    id: string;
    type: string;
    date: string;
    amount: number;
    status?: string;
  }>;
  coInvestments: Array<{
    id: string;
    name: string;
    date: string;
    amount: number;
    status: string;
    documents: Array<{
      title: string;
      url?: string;
    }>;
  }>;
  documents: Array<{
    id: string;
    title: string;
    date: string;
    category: string;
    description?: string;
    downloadable?: boolean;
    copyable?: boolean;
    confidential?: boolean;
    showToCurrentInvestor?: boolean;
    url?: string;
  }>;
  navData: {
    currentNAV: number;
    initialInvestment: number;
    changePercentage: number;
    chartData: Array<{
      month: string;
      nav: number;
    }>;
  };
}

interface FundInvestment {
  id: string;
  name: string;
  amount: number;
  color: string;
}

interface DrawdownNotice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  percentage: number;
  purpose: string;
  status: string;
  paymentDate?: string;
}

interface AppContextType {
  investors: Investor[];
  currentInvestor: Investor | null;
  fundInvestments: FundInvestment[];
  drawdownNotices: DrawdownNotice[];
  addInvestor: (investor: Investor) => void;
  updateInvestor: (id: string, investor: Partial<Investor>) => void;
  deleteInvestor: (id: string) => void;
  updateFundInvestments: (investments: FundInvestment[]) => void;
  addDrawdownNotice: (notice: DrawdownNotice) => void;
  updateDrawdownNotice: (id: string, notice: Partial<DrawdownNotice>) => void;
  deleteDrawdownNotice: (id: string) => void;
  setCurrentInvestorById: (id: string) => void;
  setCurrentInvestorByUsername: (username: string) => void;
  generateUniqueId: (prefix: string) => string;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create initial investor based on mock data
const createInitialInvestor = (): Investor => {
  return {
    id: "INV-20210515-001",
    name: "Gauri Khan Family Trust",
    email: "gauri.khan@example.com",
    contactPerson: "Gauri Khan",
    contactPhone: "+91 98765 43210",
    totalCommitment: initialCapitalCommitment.total,
    username: "gkft",
    password: "gkft",
    dateCreated: "2021-05-15",
    status: "Active",
    address: initialInvestorProfile.address,
    capitalCommitment: initialCapitalCommitment,
    capitalContributions: initialCapitalContributions,
    feeCharges: initialFeeCharges,
    distributions: initialDistributions,
    coInvestments: initialCoInvestments,
    documents: initialDocuments,
    navData: initialNavData
  };
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [investors, setInvestors] = useState<Investor[]>([createInitialInvestor()]);
  const [currentInvestor, setCurrentInvestor] = useState<Investor | null>(null);
  const [fundInvestments, setFundInvestments] = useState<FundInvestment[]>(initialFundInvestments);
  const [drawdownNotices, setDrawdownNotices] = useState<DrawdownNotice[]>(initialDrawdownNotices);

  // Generate a unique ID with prefix
  const generateUniqueId = (prefix: string) => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const addInvestor = (investor: Investor) => {
    setInvestors(prev => [...prev, investor]);
  };

  const updateInvestor = (id: string, updates: Partial<Investor>) => {
    setInvestors(prev => 
      prev.map(investor => 
        investor.id === id ? { ...investor, ...updates } : investor
      )
    );
    
    // If current investor is being updated, update it as well
    if (currentInvestor && currentInvestor.id === id) {
      setCurrentInvestor(prev => prev ? { ...prev, ...updates } : prev);
    }
  };

  const deleteInvestor = (id: string) => {
    setInvestors(prev => prev.filter(investor => investor.id !== id));
    if (currentInvestor && currentInvestor.id === id) {
      setCurrentInvestor(null);
    }
  };

  const updateFundInvestments = (investments: FundInvestment[]) => {
    setFundInvestments(investments);
  };

  const addDrawdownNotice = (notice: DrawdownNotice) => {
    setDrawdownNotices(prev => [...prev, notice]);
  };

  const updateDrawdownNotice = (id: string, updates: Partial<DrawdownNotice>) => {
    setDrawdownNotices(prev => 
      prev.map(notice => 
        notice.id === id ? { ...notice, ...updates } : notice
      )
    );
  };

  const deleteDrawdownNotice = (id: string) => {
    setDrawdownNotices(prev => prev.filter(notice => notice.id !== id));
  };

  const setCurrentInvestorById = (id: string) => {
    const investor = investors.find(inv => inv.id === id);
    setCurrentInvestor(investor || null);
  };

  const setCurrentInvestorByUsername = (username: string) => {
    const investor = investors.find(inv => inv.username === username);
    setCurrentInvestor(investor || null);
  };

  // Store state in session storage to persist during the session
  useEffect(() => {
    // Get data from sessionStorage on initial load
    const storedInvestors = sessionStorage.getItem('investors');
    const storedFundInvestments = sessionStorage.getItem('fundInvestments');
    const storedDrawdownNotices = sessionStorage.getItem('drawdownNotices');
    
    if (storedInvestors) setInvestors(JSON.parse(storedInvestors));
    if (storedFundInvestments) setFundInvestments(JSON.parse(storedFundInvestments));
    if (storedDrawdownNotices) setDrawdownNotices(JSON.parse(storedDrawdownNotices));
  }, []);

  // Update sessionStorage when state changes
  useEffect(() => {
    sessionStorage.setItem('investors', JSON.stringify(investors));
    sessionStorage.setItem('fundInvestments', JSON.stringify(fundInvestments));
    sessionStorage.setItem('drawdownNotices', JSON.stringify(drawdownNotices));
  }, [investors, fundInvestments, drawdownNotices]);

  return (
    <AppContext.Provider
      value={{
        investors,
        currentInvestor,
        fundInvestments,
        drawdownNotices,
        addInvestor,
        updateInvestor,
        deleteInvestor,
        updateFundInvestments,
        addDrawdownNotice,
        updateDrawdownNotice,
        deleteDrawdownNotice,
        setCurrentInvestorById,
        setCurrentInvestorByUsername,
        generateUniqueId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
