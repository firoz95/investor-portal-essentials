
import { format } from "date-fns";

// Investor profile
export const investorProfile = {
  name: "Gauri Khan Family Trust",
  email: "gauri.khan@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  joinDate: "May 15, 2021",
  status: "Active",
  investorId: "INV-20210515-001",
  contactPhone: "+91 98765 43210",
  accreditationStatus: "Verified",
  address: "123 Luxury Villa, Mumbai, Maharashtra, India",
  contactPerson: "Gauri Khan",
};

// Capital commitment
export const capitalCommitment = {
  total: 20000000,
  currency: "INR",
  initialDate: "2021-05-20",
  term: "5 years",
  class: "Class A",
  units: 5000,
  unitPrice: 4000,
  vestingSchedule: "Quarterly",
};

// Fund information
export const fundInformation = {
  firstCloseDate: "2021-03-15",
  subsequentClosingDates: ["2021-06-15", "2021-09-15"],
  finalCloseDate: "",
  commitmentPeriod: "3 years (Until 2024-03-15)",
  fundLife: "7 years (Until 2028-03-15)"
};

// Fund investments
export const fundInvestments = [
  {
    id: "INV-INCRED",
    name: "Incred Holdings",
    amount: 10000000,
    percentage: 25,
    color: "#9b87f5"
  },
  {
    id: "INV-CUSTOMER",
    name: "Customer Capital",
    amount: 30000000,
    percentage: 30,
    color: "#7E69AB"
  },
  {
    id: "INV-NATIVE",
    name: "Native Milk",
    amount: 13700000,
    percentage: 15,
    color: "#D6BCFA"
  },
  {
    id: "INV-JET",
    name: "JetSynthesys",
    amount: 30000000,
    percentage: 20,
    color: "#FEC6A1"
  },
  {
    id: "INV-RARE",
    name: "Rare Planet",
    amount: 17500000,
    percentage: 10,
    color: "#D3E4FD"
  }
];

// Co-investments (only shown to certain investors)
export const coInvestments = [
  {
    id: "CO-INV-001",
    name: "TechFront Solutions",
    amount: 5000000,
    date: "2022-04-10",
    status: "Active",
    documents: [
      {
        title: "Term Sheet",
        url: "https://example.com/termsheet.pdf",
        date: "2022-04-01"
      },
      {
        title: "Investment Agreement",
        url: "https://example.com/agreement.pdf",
        date: "2022-04-05"
      }
    ]
  }
];

// Documents
export const documents = [
  {
    id: "DOC-PPM",
    title: "Private Placement Memorandum",
    type: "PPM",
    date: "2021-05-01",
    attachmentUrl: "#",
    attachmentName: "PPM.pdf",
    description: "Detailed information about the investment opportunity",
    category: "PPM",
    copyable: false,
    downloadable: false,
    transferable: false
  },
  {
    id: "DOC-CA",
    title: "Contribution Agreement",
    type: "Legal",
    date: "2021-05-15",
    attachmentUrl: "#",
    attachmentName: "Contribution_Agreement.pdf",
    description: "Contribution agreement outlining terms and conditions",
    category: "Contribution Agreement",
    confidential: true
  },
  {
    id: "DOC-SL",
    title: "Side Letter",
    type: "Legal",
    date: "2021-05-20",
    attachmentUrl: "#",
    attachmentName: "Side_Letter.pdf",
    description: "Additional terms specific to this investor",
    category: "Side Letter",
    confidential: true,
    // This flag determines if this document should be shown to this specific investor
    showToCurrentInvestor: true
  },
  {
    id: "DOC-US",
    title: "Unit Statement - Q2 2022",
    type: "Financial",
    date: "2022-06-30",
    attachmentUrl: "#",
    attachmentName: "Unit_Statement_Q2_2022.pdf",
    description: "Statement of units held by the investor",
    category: "Unit Statement",
    confidential: true
  },
  {
    id: "DOC-CN-1",
    title: "Contribution Notice - Initial",
    type: "Notice",
    date: "2021-06-15",
    attachmentUrl: "#",
    attachmentName: "Contribution_Notice_1.pdf",
    description: "Initial contribution notice",
    category: "Contribution Notice",
    amount: 50000000,
    percentage: 25,
    dueDate: "2021-06-30"
  },
  {
    id: "DOC-CN-2",
    title: "Contribution Notice - Second Call",
    type: "Notice",
    date: "2021-09-15",
    attachmentUrl: "#",
    attachmentName: "Contribution_Notice_2.pdf",
    description: "Second contribution notice",
    category: "Contribution Notice",
    amount: 23000000,
    percentage: 11.5,
    dueDate: "2021-09-30"
  }
];

// Drawdown notices
export const drawdownNotices = [
  {
    id: "DD-2021-001",
    date: "2021-06-15",
    amount: 5000000,
    dueDate: "2021-06-30",
    status: "Paid",
    paymentDate: "2021-06-25",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q2_2021.pdf",
    purpose: "Initial investment in Incred Holdings",
    percentage: 25
  },
  {
    id: "DD-2021-002",
    date: "2021-09-15",
    amount: 2300000,
    dueDate: "2021-09-30",
    status: "Paid",
    paymentDate: "2021-09-28",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q3_2021.pdf",
    purpose: "Investment in Customer Capital",
    percentage: 11.5
  },
  {
    id: "DD-2023-001",
    date: "2023-02-15",
    amount: 2000000,
    dueDate: "2023-02-28",
    status: "Pending",
    paymentDate: null,
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q1_2023.pdf",
    purpose: "Investment in Native Milk",
    percentage: 10
  },
];

// Capital contributions
export const capitalContributions = [
  {
    id: "CC-2021-001",
    date: "2021-06-25",
    amount: 5000000,
    drawdownId: "DD-2021-001",
    method: "Wire Transfer",
    reference: "REF-20210625-001",
  },
  {
    id: "CC-2021-002",
    date: "2021-09-28",
    amount: 2300000,
    drawdownId: "DD-2021-002",
    method: "Wire Transfer",
    reference: "REF-20210928-001",
  },
];

// Distributions (income + principal)
export const distributions = [];

// Fee charges
export const feeCharges = [
  {
    id: "FEE-2021-001",
    date: "2021-05-25",
    type: "Setup Fee",
    amount: 100000,
    description: "Initial setup and onboarding fee",
    status: "Paid",
  },
  {
    id: "FEE-2021-002",
    date: "2021-06-30",
    type: "Management Fee",
    amount: 100000,
    description: "Q2 2021 management fee (2% annual, prorated)",
    status: "Paid",
  },
  {
    id: "FEE-2021-003",
    date: "2021-09-30",
    type: "Management Fee",
    amount: 125000,
    description: "Q3 2021 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2021-004",
    date: "2021-12-31",
    type: "Management Fee",
    amount: 125000,
    description: "Q4 2021 management fee (2% annual)",
    status: "Paid",
  },
];

// Fee structure based on unit class
export const feeStructure = {
  "Class A": {
    managementFee: "2% per annum",
    performanceFee: "20% over 10% hurdle rate",
    minimumCommitment: "₹ 1,00,00,000"
  },
  "Class B": {
    managementFee: "1.75% per annum",
    performanceFee: "17.5% over 10% hurdle rate",
    minimumCommitment: "₹ 5,00,00,000"
  },
  "Class C": {
    managementFee: "1.5% per annum",
    performanceFee: "15% over 10% hurdle rate",
    minimumCommitment: "₹ 10,00,00,000"
  }
};

// NAV statements
export const navStatements = [
  {
    id: "NAV-2021-Q2",
    period: "Q2 2021",
    date: "2021-06-30",
    navPerUnit: 4100,
    totalUnits: 5000,
    totalNav: 20500000,
    change: 2.5,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q2_2021.pdf",
  },
  {
    id: "NAV-2021-Q3",
    period: "Q3 2021",
    date: "2021-09-30",
    navPerUnit: 4230,
    totalUnits: 5000,
    totalNav: 21150000,
    change: 3.17,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q3_2021.pdf",
  },
  {
    id: "NAV-2021-Q4",
    period: "Q4 2021",
    date: "2021-12-31",
    navPerUnit: 4410,
    totalUnits: 5000,
    totalNav: 22050000,
    change: 4.25,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q4_2021.pdf",
  },
  {
    id: "NAV-2022-Q1",
    period: "Q1 2022",
    date: "2022-03-31",
    navPerUnit: 4620,
    totalUnits: 5000,
    totalNav: 23100000,
    change: 4.76,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q1_2022.pdf",
  },
  {
    id: "NAV-2022-Q2",
    period: "Q2 2022",
    date: "2022-06-30",
    navPerUnit: 4750,
    totalUnits: 5000,
    totalNav: 23750000,
    change: 2.81,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q2_2022.pdf",
  },
];

// Helper function to format currency (INR)
export const formatCurrency = (amount: number, currency = "INR") => {
  if (currency === "INR") {
    // Format for INR with ₹ symbol
    const formattedAmount = amount.toLocaleString('en-IN');
    return `₹ ${formattedAmount}`;
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format percentage
export const formatPercentage = (percentage: number) => {
  return `${percentage.toFixed(2)}%`;
};

// Helper function to format date
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  } catch (error) {
    return dateString;
  }
};

// Helper to calculate total capital contributions
export const getTotalCapitalContributed = () => {
  return capitalContributions.reduce((total, contribution) => total + contribution.amount, 0);
};

// Helper to calculate remaining commitment
export const getRemainingCommitment = () => {
  const totalContributed = getTotalCapitalContributed();
  return capitalCommitment.total - totalContributed;
};

// Helper to calculate total fees
export const getTotalFees = () => {
  return feeCharges.reduce((total, fee) => total + fee.amount, 0);
};

// Dashboard summary
export const dashboardSummary = {
  totalCommitment: capitalCommitment.total,
  totalContributed: getTotalCapitalContributed(),
  remainingCommitment: getRemainingCommitment(),
  currentNav: 10000000, // Individual investor NAV
  totalFees: getTotalFees(),
  investmentCount: fundInvestments.length,
  docCount: documents.length,
  performanceSinceInception: 
    ((navStatements[navStatements.length - 1]?.navPerUnit || 4000) / 4000 - 1) * 100,
};

// Get fee structure based on commitment amount
export const getFeeStructureForInvestor = (commitmentAmount: number) => {
  if (commitmentAmount >= 100000000) {
    return feeStructure["Class C"];
  } else if (commitmentAmount >= 50000000) {
    return feeStructure["Class B"];
  } else {
    return feeStructure["Class A"];
  }
};
