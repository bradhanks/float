import React, { useEffect } from 'react';
import { generateFAQSchema, injectStructuredData, FAQ as FAQType } from './utils/structuredData';

// Your existing FAQ component interface
interface FAQProps {
  faqs?: FAQType[];
  title?: string;
  subtitle?: string;
}

const FAQ: React.FC<FAQProps> = ({
  faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive web development, consulting, and digital solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, but most projects are completed within 2-8 weeks."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive maintenance and support packages for all our projects."
    }
  ],
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services"
}) => {

  // Inject FAQ structured data
  useEffect(() => {
    const faqSchema = generateFAQSchema(faqs);
    injectStructuredData(faqSchema, 'faq-schema');
  }, [faqs]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {faq.question}
              </summary>
              <div className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
