# Lucky CFO Advisory Lead Email Delivery

Website call requests currently post to `/api/inquiry` and are accepted only after the project-owner notification service confirms receipt. This is a private Manus owner notification, not a message sent to a named email address.

The intended production delivery path is a transactional email sent to `mark@midatlanticcfo.com`, with the lead’s email address set as Reply-To. The implementation will use a Resend API key limited to sending email and a verified sender address on a domain controlled by the firm. Required configuration is `RESEND_API_KEY` and `LEAD_EMAIL_FROM`. The recipient is fixed in server-side code and is never accepted from the browser.

The form will return success only if the transactional email request is accepted. It will retain the existing Manus owner notification as a secondary operational alert where available.

Sources to apply:

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/create-an-api-key
- https://resend.com/docs/api-reference/domains/list-domains
