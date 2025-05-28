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
}

interface ProgramInfo {
  programName: string;
  stampsRequired: number;
  rewardType: 'discount' | 'free_item';
  discountPercentage?: number;
  freeItemDescription?: string;
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
  },
  programInfo: {
    programName: '',
    stampsRequired: 10,
    rewardType: 'discount',
    discountPercentage: 20,
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