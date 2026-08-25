# n8n-nodes-setsmart

This is an n8n community node. It lets you use [SetSmart](https://setsmart.io) in your n8n workflows.

SetSmart is an AI setter for Instagram, WhatsApp and Messenger DMs. It answers conversations in your brand voice, qualifies leads against your criteria, and books meetings directly in the chat. This node lets your workflows read leads and manage contacts, tags, notes and template messages in SetSmart.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In n8n, go to **Settings → Community Nodes**, select **Install**, and enter `n8n-nodes-setsmart`.

## Operations

**Contact**
- Find (by ID, phone, email or tag)
- Import
- Add Tag / Remove Tag
- Add Notes
- Set Booked
- Turn AI On / Turn AI Off

**Lead**
- Get All
- Get Answered
- Get OK Call (qualified, ready to book)

**Message**
- Send Template
- List Scheduled
- Cancel Scheduled

## Credentials

You need a SetSmart account and an API key. In SetSmart, go to **Settings → Integrations** to copy your API key, then paste it into the SetSmart API credential in n8n. The key is sent as the `x-api-key` header.

## Resources

- [SetSmart website](https://setsmart.io)
- [SetSmart API documentation](https://setsmart.io/api-documentation)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
