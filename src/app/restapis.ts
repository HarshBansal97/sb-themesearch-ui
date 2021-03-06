import { environment } from 'src/environments/environment';
export const APIConstants: any = {
	'VERSE': environment.apiBaseurl + 'verse/',
	'CONTEXT_TITLE': environment.apiBaseurl + 'verse/additional-details',
	'TRANSLATIONTAGS': environment.apiBaseurl + 'verse/tagTranslation',
	'PURPORTSECTIONTAGS': environment.apiBaseurl + 'verse/tagPurportSection',
	'CREATEVERSE': environment.apiBaseurl + 'verse/',
	'LOGIN': environment.apiBaseurl + 'login/',
	'NVERSE': environment.apiBaseurl + 'next-verse/',
	'PVERSE': environment.apiBaseurl + 'prev-verse/',
}