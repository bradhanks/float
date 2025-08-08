import React, { useEffect } from 'react'
import {
  generateFAQSchema,
  injectStructuredData,
  FAQ as FAQType,
} from './utils/structuredData'

// Your existing FAQ component interface
interface FAQProps {
  faqs?: FAQType[]
  title?: string
  subtitle?: string
}

const FAQ: React.FC<FAQProps> = ({
  faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'We provide comprehensive web development, consulting, and digital solutions tailored to your business needs.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary based on complexity, but most projects are completed within 2-8 weeks.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer comprehensive maintenance and support packages for all our projects.',
    },
  ],
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about our services',
}) => {
  // Inject FAQ structured data
  useEffect(() => {
    const faqSchema = generateFAQSchema(faqs)
    injectStructuredData(faqSchema, 'faq-schema')
  }, [faqs])

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600">
                {faq.question}
              </summary>
              <div className="mt-4 leading-relaxed text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
