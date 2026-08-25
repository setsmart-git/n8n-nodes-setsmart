import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class SetSmart implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SetSmart',
		name: 'setSmart',
		icon: 'file:setsmart.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'AI setter for Instagram, WhatsApp and Messenger DMs. Manage contacts, leads, tags and template messages.',
		defaults: {
			name: 'SetSmart',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'setSmartApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://setsmart.io',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Contact', value: 'contact' },
					{ name: 'Lead', value: 'lead' },
					{ name: 'Message', value: 'message' },
				],
				default: 'contact',
			},

			// ─────────────────────────────  CONTACT  ─────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['contact'] } },
				options: [
					{
						name: 'Find',
						value: 'find',
						action: 'Find a contact',
						description: 'Find a contact by ID, phone, email or tag',
						routing: {
							request: {
								method: 'GET',
								url: '/api/find-contact',
								qs: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									tag: '={{$parameter.tag || undefined}}',
								},
							},
						},
					},
					{
						name: 'Import',
						value: 'import',
						action: 'Import a contact',
						description: 'Create or import a contact into the workspace',
						routing: {
							request: {
								method: 'POST',
								url: '/api/import-contact',
								body: {
									number: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									name: '={{$parameter.name || undefined}}',
									last: '={{$parameter.lastName || undefined}}',
									tag: '={{$parameter.tag || undefined}}',
									notes: '={{$parameter.notes || undefined}}',
									assistant_id: '={{$parameter.assistantId || undefined}}',
								},
							},
						},
					},
					{
						name: 'Add Tag',
						value: 'addTag',
						action: 'Add a tag to a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/api/add-tag-to-conversation',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									tag: '={{$parameter.tag}}',
								},
							},
						},
					},
					{
						name: 'Remove Tag',
						value: 'removeTag',
						action: 'Remove a tag from a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/api/remove-tag-from-conversation',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									tag: '={{$parameter.tag}}',
								},
							},
						},
					},
					{
						name: 'Add Notes',
						value: 'addNotes',
						action: 'Add notes to a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/api/add-notes',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									notes: '={{$parameter.notes}}',
								},
							},
						},
					},
					{
						name: 'Set Booked',
						value: 'setBooked',
						action: 'Mark a contact as booked',
						routing: {
							request: {
								method: 'POST',
								url: '/api/set-booked',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
									instagram_username: '={{$parameter.instagramUsername || undefined}}',
								},
							},
						},
					},
					{
						name: 'Turn AI On',
						value: 'aiOn',
						action: 'Turn the AI on for a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/api/set-ai-on',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
								},
							},
						},
					},
					{
						name: 'Turn AI Off',
						value: 'aiOff',
						action: 'Turn the AI off for a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/api/set-ai-off',
								body: {
									contact_id: '={{$parameter.contactId || undefined}}',
									phone: '={{$parameter.phone || undefined}}',
									email: '={{$parameter.email || undefined}}',
								},
							},
						},
					},
				],
				default: 'find',
			},

			// ─────────────────────────────  LEAD  ─────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['lead'] } },
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all leads',
						routing: { request: { method: 'GET', url: '/api/leads' } },
					},
					{
						name: 'Get Answered',
						value: 'getAnswered',
						action: 'Get leads that answered',
						routing: { request: { method: 'GET', url: '/api/answered' } },
					},
					{
						name: 'Get OK Call',
						value: 'getOkCall',
						action: 'Get qualified leads ready to book',
						routing: { request: { method: 'GET', url: '/api/ok-call' } },
					},
				],
				default: 'getAll',
			},

			// ─────────────────────────────  MESSAGE  ─────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['message'] } },
				options: [
					{
						name: 'Send Template',
						value: 'sendTemplate',
						action: 'Send a template message',
						routing: {
							request: {
								method: 'POST',
								url: '/api/send-template',
								body: {
									template_name: '={{$parameter.templateName}}',
									contact_id: '={{$parameter.contactId || undefined}}',
									schedule_type: '={{$parameter.scheduleType}}',
									scheduled_date_time: '={{$parameter.scheduledDateTime || undefined}}',
									assistant_id: '={{$parameter.assistantId || undefined}}',
								},
							},
						},
					},
					{
						name: 'List Scheduled',
						value: 'listScheduled',
						action: 'List scheduled messages',
						routing: { request: { method: 'GET', url: '/api/list-scheduled' } },
					},
					{
						name: 'Cancel Scheduled',
						value: 'cancelScheduled',
						action: 'Cancel a scheduled message',
						routing: {
							request: {
								method: 'POST',
								url: '/api/cancel-scheduled',
								body: {
									id: '={{$parameter.scheduledId}}',
								},
							},
						},
					},
				],
				default: 'sendTemplate',
			},

			// ─────────────────────────────  SHARED FIELDS  ─────────────────────────────
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'The SetSmart contact/conversation ID',
				displayOptions: {
					show: {
						resource: ['contact', 'message'],
						operation: ['find', 'addTag', 'removeTag', 'addNotes', 'setBooked', 'aiOn', 'aiOff', 'sendTemplate'],
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Contact phone number in international format (e.g. +14155550100)',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['find', 'import', 'addTag', 'removeTag', 'addNotes', 'setBooked', 'aiOn', 'aiOff'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['find', 'import', 'addTag', 'removeTag', 'addNotes', 'setBooked', 'aiOn', 'aiOff'],
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['find', 'import', 'addTag', 'removeTag'],
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['contact'], operation: ['import'] } },
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['contact'], operation: ['import'] } },
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				displayOptions: { show: { resource: ['contact'], operation: ['import', 'addNotes'] } },
			},
			{
				displayName: 'Instagram Username',
				name: 'instagramUsername',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['contact'], operation: ['setBooked'] } },
			},
			{
				displayName: 'Assistant ID',
				name: 'assistantId',
				type: 'string',
				default: '',
				description: 'Optional: the assistant to assign',
				displayOptions: {
					show: {
						resource: ['contact', 'message'],
						operation: ['import', 'sendTemplate'],
					},
				},
			},
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'] } },
			},
			{
				displayName: 'Schedule Type',
				name: 'scheduleType',
				type: 'options',
				options: [
					{ name: 'Immediate', value: 'immediate' },
					{ name: 'Scheduled', value: 'scheduled' },
				],
				default: 'immediate',
				displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'] } },
			},
			{
				displayName: 'Scheduled Date Time',
				name: 'scheduledDateTime',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendTemplate'],
						scheduleType: ['scheduled'],
					},
				},
			},
			{
				displayName: 'Scheduled Message ID',
				name: 'scheduledId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['cancelScheduled'] } },
			},
		],
	};
}
