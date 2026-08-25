import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class SetSmartApi implements ICredentialType {
	name = 'setSmartApi';

	displayName = 'SetSmart API';

	documentationUrl = 'https://setsmart.io/api-documentation';

	icon: Icon = 'file:setsmart.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your SetSmart API key, found under Settings → Integrations in your SetSmart workspace',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://setsmart.io',
			url: '/api/leads',
		},
	};
}
