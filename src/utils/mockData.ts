
import { format } from "date-fns";

// Investor profile
export const investorProfile = {
  name: "Jane Mathews",
  email: "jane.mathews@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  joinDate: "May 15, 2021",
  status: "Active",
  investorId: "INV-20210515-001",
  contactPhone: "+1 (555) 123-4567",
  accreditationStatus: "Verified",
};

// Capital commitment
export const capitalCommitment = {
  total: 500000,
  currency: "USD",
  initialDate: "2021-05-20",
  term: "5 years",
  class: "Class A",
  units: 5000,
  unitPrice: 100,
  vestingSchedule: "Quarterly",
};

// Drawdown notices
export const drawdownNotices = [
  {
    id: "DD-2021-001",
    date: "2021-06-15",
    amount: 50000,
    dueDate: "2021-06-30",
    status: "Paid",
    paymentDate: "2021-06-25",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q2_2021.pdf",
    purpose: "Initial investment in Project Alpha",
  },
  {
    id: "DD-2021-002",
    date: "2021-09-15",
    amount: 75000,
    dueDate: "2021-09-30",
    status: "Paid",
    paymentDate: "2021-09-28",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q3_2021.pdf",
    purpose: "Follow-on investment in Project Alpha and new investment in Project Beta",
  },
  {
    id: "DD-2022-001",
    date: "2022-01-15",
    amount: 100000,
    dueDate: "2022-01-30",
    status: "Paid",
    paymentDate: "2022-01-20",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q1_2022.pdf",
    purpose: "Investment in Project Gamma",
  },
  {
    id: "DD-2022-002",
    date: "2022-06-15",
    amount: 125000,
    dueDate: "2022-06-30",
    status: "Paid",
    paymentDate: "2022-06-28",
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q2_2022.pdf",
    purpose: "Expansion of Project Beta",
  },
  {
    id: "DD-2023-001",
    date: "2023-02-15",
    amount: 150000,
    dueDate: "2023-02-28",
    status: "Pending",
    paymentDate: null,
    attachmentUrl: "#",
    attachmentName: "Capital_Call_Q1_2023.pdf",
    purpose: "New investment in Project Delta",
  },
];

// Capital contributions
export const capitalContributions = [
  {
    id: "CC-2021-001",
    date: "2021-06-25",
    amount: 50000,
    drawdownId: "DD-2021-001",
    method: "Wire Transfer",
    reference: "REF-20210625-001",
  },
  {
    id: "CC-2021-002",
    date: "2021-09-28",
    amount: 75000,
    drawdownId: "DD-2021-002",
    method: "Wire Transfer",
    reference: "REF-20210928-001",
  },
  {
    id: "CC-2022-001",
    date: "2022-01-20",
    amount: 100000,
    drawdownId: "DD-2022-001",
    method: "Wire Transfer",
    reference: "REF-20220120-001",
  },
  {
    id: "CC-2022-002",
    date: "2022-06-28",
    amount: 125000,
    drawdownId: "DD-2022-002",
    method: "Wire Transfer",
    reference: "REF-20220628-001",
  },
];

// Fee charges
export const feeCharges = [
  {
    id: "FEE-2021-001",
    date: "2021-05-25",
    type: "Setup Fee",
    amount: 5000,
    description: "Initial setup and onboarding fee",
    status: "Paid",
  },
  {
    id: "FEE-2021-002",
    date: "2021-06-30",
    type: "Management Fee",
    amount: 2500,
    description: "Q2 2021 management fee (2% annual, prorated)",
    status: "Paid",
  },
  {
    id: "FEE-2021-003",
    date: "2021-09-30",
    type: "Management Fee",
    amount: 3125,
    description: "Q3 2021 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2021-004",
    date: "2021-12-31",
    type: "Management Fee",
    amount: 3125,
    description: "Q4 2021 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2022-001",
    date: "2022-03-31",
    type: "Management Fee",
    amount: 4375,
    description: "Q1 2022 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2022-002",
    date: "2022-06-30",
    type: "Management Fee",
    amount: 5000,
    description: "Q2 2022 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2022-003",
    date: "2022-09-30",
    type: "Management Fee",
    amount: 5000,
    description: "Q3 2022 management fee (2% annual)",
    status: "Paid",
  },
  {
    id: "FEE-2022-004",
    date: "2022-12-31",
    type: "Management Fee",
    amount: 5000,
    description: "Q4 2022 management fee (2% annual)",
    status: "Pending",
  },
];

// Tax documents
export const taxDocuments = [
  {
    id: "TAX-2021-001",
    year: 2021,
    type: "Schedule K-1",
    issueDate: "2022-03-15",
    attachmentUrl: "#",
    attachmentName: "Schedule_K1_2021.pdf",
    description: "Annual tax document for 2021 fiscal year",
  },
  {
    id: "TAX-2022-001",
    year: 2022,
    type: "Schedule K-1",
    issueDate: "2023-03-15",
    attachmentUrl: "#",
    attachmentName: "Schedule_K1_2022.pdf",
    description: "Annual tax document for 2022 fiscal year",
  },
];

// Fund investments
export const fundInvestments = [
  {
    id: "INV-ALPHA",
    name: "Project Alpha",
    sector: "Technology",
    type: "Venture Capital",
    investmentDate: "2021-07-01",
    initialAmount: 75000,
    currentValue: 97500,
    status: "Active",
    performancePercentage: 30,
    description: "Early-stage SaaS platform focusing on AI-powered analytics",
  },
  {
    id: "INV-BETA",
    name: "Project Beta",
    sector: "Healthcare",
    type: "Growth Equity",
    investmentDate: "2021-10-15",
    initialAmount: 125000,
    currentValue: 168750,
    status: "Active",
    performancePercentage: 35,
    description: "Medical device company specializing in non-invasive monitoring solutions",
  },
  {
    id: "INV-GAMMA",
    name: "Project Gamma",
    sector: "Renewable Energy",
    type: "Private Equity",
    investmentDate: "2022-02-10",
    initialAmount: 150000,
    currentValue: 187500,
    status: "Active",
    performancePercentage: 25,
    description: "Solar energy project with utility-scale installations",
  },
  {
    id: "INV-DELTA",
    name: "Project Delta",
    sector: "Financial Services",
    type: "Private Debt",
    investmentDate: "2023-03-01",
    initialAmount: 50000,
    currentValue: 52500,
    status: "Pending",
    performancePercentage: 5,
    description: "Fintech platform providing alternative lending solutions",
  },
];

// NAV statements
export const navStatements = [
  {
    id: "NAV-2021-Q2",
    period: "Q2 2021",
    date: "2021-06-30",
    navPerUnit: 102.50,
    totalUnits: 5000,
    totalNav: 512500,
    change: 2.5,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q2_2021.pdf",
  },
  {
    id: "NAV-2021-Q3",
    period: "Q3 2021",
    date: "2021-09-30",
    navPerUnit: 105.75,
    totalUnits: 5000,
    totalNav: 528750,
    change: 3.17,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q3_2021.pdf",
  },
  {
    id: "NAV-2021-Q4",
    period: "Q4 2021",
    date: "2021-12-31",
    navPerUnit: 110.25,
    totalUnits: 5000,
    totalNav: 551250,
    change: 4.25,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q4_2021.pdf",
  },
  {
    id: "NAV-2022-Q1",
    period: "Q1 2022",
    date: "2022-03-31",
    navPerUnit: 115.50,
    totalUnits: 5000,
    totalNav: 577500,
    change: 4.76,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q1_2022.pdf",
  },
  {
    id: "NAV-2022-Q2",
    period: "Q2 2022",
    date: "2022-06-30",
    navPerUnit: 118.75,
    totalUnits: 5000,
    totalNav: 593750,
    change: 2.81,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q2_2022.pdf",
  },
  {
    id: "NAV-2022-Q3",
    period: "Q3 2022",
    date: "2022-09-30",
    navPerUnit: 121.25,
    totalUnits: 5000,
    totalNav: 606250,
    change: 2.11,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q3_2022.pdf",
  },
  {
    id: "NAV-2022-Q4",
    period: "Q4 2022",
    date: "2022-12-31",
    navPerUnit: 126.50,
    totalUnits: 5000,
    totalNav: 632500,
    change: 4.33,
    attachmentUrl: "#",
    attachmentName: "NAV_Statement_Q4_2022.pdf",
  },
];

// Documents
export const documents = [
  {
    id: "DOC-001",
    title: "Subscription Agreement",
    type: "Legal",
    date: "2021-05-15",
    attachmentUrl: "#",
    attachmentName: "Subscription_Agreement.pdf",
    description: "Initial subscription agreement for the fund",
    category: "Agreement",
  },
  {
    id: "DOC-002",
    title: "Limited Partnership Agreement",
    type: "Legal",
    date: "2021-05-15",
    attachmentUrl: "#",
    attachmentName: "Limited_Partnership_Agreement.pdf",
    description: "Limited partnership agreement outlining terms and conditions",
    category: "Agreement",
  },
  {
    id: "DOC-003",
    title: "Private Placement Memorandum",
    type: "Legal",
    date: "2021-05-01",
    attachmentUrl: "#",
    attachmentName: "PPM.pdf",
    description: "Detailed information about the investment opportunity",
    category: "Disclosure",
  },
  {
    id: "DOC-004",
    title: "Investor Questionnaire",
    type: "Onboarding",
    date: "2021-05-10",
    attachmentUrl: "#",
    attachmentName: "Investor_Questionnaire.pdf",
    description: "Completed investor questionnaire for accreditation",
    category: "Onboarding",
  },
  {
    id: "DOC-005",
    title: "2021 Annual Report",
    type: "Financial",
    date: "2022-02-28",
    attachmentUrl: "#",
    attachmentName: "Annual_Report_2021.pdf",
    description: "Annual fund performance and financial report for 2021",
    category: "Reporting",
  },
  {
    id: "DOC-006",
    title: "2022 Annual Report",
    type: "Financial",
    date: "2023-02-28",
    attachmentUrl: "#",
    attachmentName: "Annual_Report_2022.pdf",
    description: "Annual fund performance and financial report for 2022",
    category: "Reporting",
  },
  {
    id: "DOC-007",
    title: "Q1 2023 Investor Update",
    type: "Communication",
    date: "2023-04-15",
    attachmentUrl: "#",
    attachmentName: "Q1_2023_Investor_Update.pdf",
    description: "Quarterly update on fund performance and strategy",
    category: "Reporting",
  },
];

// Helper function to format currency
export const formatCurrency = (amount: number, currency = "USD") => {
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
  currentNav: navStatements[navStatements.length - 1]?.totalNav || 0,
  totalFees: getTotalFees(),
  investmentCount: fundInvestments.length,
  docCount: documents.length,
  performanceSinceInception: 
    ((navStatements[navStatements.length - 1]?.navPerUnit || 100) / 100 - 1) * 100,
};

// Active investment summary
export const getInvestmentSummary = () => {
  const activeInvestments = fundInvestments.filter(inv => inv.status === "Active");
  const totalInitial = activeInvestments.reduce((total, inv) => total + inv.initialAmount, 0);
  const totalCurrent = activeInvestments.reduce((total, inv) => total + inv.currentValue, 0);
  
  return {
    count: activeInvestments.length,
    initialValue: totalInitial,
    currentValue: totalCurrent,
    changePercentage: ((totalCurrent / totalInitial) - 1) * 100
  };
};
