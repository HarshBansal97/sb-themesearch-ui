import { environment } from 'src/environments/environment';
export const APIConstants: any = {
	'VERSE': environment.apiBaseurl + 'verse/',
	'TRANSLATIONTAGS': environment.apiBaseurl + 'verse/tagTranslation',
	'PURPORTSECTIONTAGS': environment.apiBaseurl + 'verse/tagPurportSection',
	'CREATEVERSE': environment.apiBaseurl + 'verse/',
	'LOGIN': environment.apiBaseurl + 'login/',
}