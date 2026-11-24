import { CaseStudy } from './types';
import { UNITE_CASE_STUDY } from './unite';
import { AP_SILANG_CASE_STUDY } from './ap-silang';

export * from './types';
export * from './unite';
export * from './ap-silang';

const CASE_STUDIES: Record<string, CaseStudy> = {
  // Numeric route ID lookups (backwards compatibility)
  '1': UNITE_CASE_STUDY,
  '2': AP_SILANG_CASE_STUDY,
  '3': UNITE_CASE_STUDY,
  '4': AP_SILANG_CASE_STUDY,
  '5': UNITE_CASE_STUDY,

  // Semantic slug lookups
  unite: UNITE_CASE_STUDY,
  'ap-silang': AP_SILANG_CASE_STUDY,
  apsilang: AP_SILANG_CASE_STUDY,
};

export function getCaseStudy(idOrSlug: string): CaseStudy | undefined {
  return CASE_STUDIES[idOrSlug.toLowerCase()];
}

export function getAllCaseStudies(): CaseStudy[] {
  return [UNITE_CASE_STUDY, AP_SILANG_CASE_STUDY];
}
