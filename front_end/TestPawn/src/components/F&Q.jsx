import React from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is the purpose of this system?",
      answer:
        "The system is designed to provide accurate insights into market trends, enabling users to make informed decisions about their investments.",
    },
    {
      question: "How does the AI-powered prediction system work?",
      answer:
        "Our AI-powered system leverages historical data, real-time market trends, and advanced machine learning models to provide precise predictions.",
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <details
          key={index}
          className="group border-s-4 border-yellow-400 bg-white p-6 rounded-lg shadow-lg [&_summary::-webkit-details-marker]:hidden"
          open={index === 0} // Open the first FAQ by default
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">{faq.question}</h2>
            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQ;
