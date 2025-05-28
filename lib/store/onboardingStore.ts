import { create } from 'zustand';

interface CompanyInfo {
  companyName: string;
  phoneNumber: string;
  website: string;
  address: string;
}

interface DesignInfo {
  logo: string | null;
  cardStyle: string;
  colorScheme: string;
  cardBackgroundColor: string;
  stampColor: string;
}

interface LinkInfo {
  websiteUrl: string;
  instagram: string;
  facebook: string;
  twitter: string;
  booksyLink: string;
}

interface Reward {
  stampNumber: number;
  description: string;
}

interface ProgramInfo {
  programName: string;
  stampsRequired: number;
  rewards: Reward[];
}

interface OnboardingState {
  companyInfo: CompanyInfo;
  designInfo: DesignInfo;
  linkInfo: LinkInfo;
  programInfo: ProgramInfo;
  
  // Company Info Actions
  setCompanyInfo: (info: CompanyInfo) => void;
  
  // Design Info Actions
  setDesignInfo: (info: DesignInfo) => void;
  
  // Link Info Actions
  setLinkInfo: (info: LinkInfo) => void;
  
  // Program Info Actions
  setProgramInfo: (info: ProgramInfo) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  companyInfo: {
    companyName: '',
    phoneNumber: '',
    website: '',
    address: '',
  },
  designInfo: {
    logo: null,
    cardStyle: 'minimal',
    colorScheme: 'blue',
    cardBackgroundColor: '#FFFFFF',
    stampColor: '#3B82F6',
  },
  linkInfo: {
    websiteUrl: '',
    instagram: '',
    facebook: '',
    twitter: '',
    booksyLink: '',
  },
  programInfo: {
    programName: '',
    stampsRequired: 10,
    rewards: [
      { stampNumber: 5, description: '10% off your purchase' },
      { stampNumber: 10, description: 'Free item of your choice' }
    ]
  },
  
  // Company Info Actions
  setCompanyInfo: (info: CompanyInfo) => 
    set((state) => ({ companyInfo: { ...state.companyInfo, ...info } })),
  
  // Design Info Actions
  setDesignInfo: (info: DesignInfo) => 
    set((state) => ({ designInfo: { ...state.designInfo, ...info } })),
  
  // Link Info Actions
  setLinkInfo: (info: LinkInfo) => 
    set((state) => ({ linkInfo: { ...state.linkInfo, ...info } })),
  
  // Program Info Actions
  setProgramInfo: (info: ProgramInfo) => 
    set((state) => ({ programInfo: { ...state.programInfo, ...info } })),
})); 