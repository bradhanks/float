import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
  email: string
  company?: string
  phone?: string
  message: string
  budget?: string
}

export const EmailTemplate = ({
  firstName,
  email,
  company = '',
  phone = '',
  message,
  budget = '',
}: EmailTemplateProps) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    }}
  >
    <h1
      style={{
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
      }}
    >
      New Contact Form Submission
    </h1>

    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#555', fontSize: '18px' }}>Contact Details</h2>
      <p>
        <strong>Name:</strong> {firstName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      {company && (
        <p>
          <strong>Company:</strong> {company}
        </p>
      )}
      {phone && (
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      )}
      {budget && (
        <p>
          <strong>Budget:</strong> ${budget}K+
        </p>
      )}
    </div>

    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#555', fontSize: '18px' }}>Message</h2>
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px',
          borderLeft: '4px solid #007cba',
        }}
      >
        {message}
      </div>
    </div>

    <div
      style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#666',
      }}
    >
      This email was sent from your website contact form.
    </div>
  </div>
)
