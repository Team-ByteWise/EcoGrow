"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { BASE_URL } from "@/lib/constants";

const faqDataSample = [
  {
    question: "What is EcoGrow?",
    answer:
      "EcoGrow is an innovative platform that helps individuals and businesses reduce their carbon footprint through sustainable practices and eco-friendly solutions. We offer personalized recommendations, tracking tools, and educational resources to make environmental sustainability accessible and achievable for everyone.",
  },
  {
    question: "How does EcoGrow work?",
    answer:
      "EcoGrow works by analyzing your current lifestyle or business practices and providing tailored suggestions for reducing your environmental impact. Our platform tracks your progress, offers educational content, and connects you with a community of like-minded individuals and organizations committed to sustainability.",
  },
  {
    question: "Is EcoGrow suitable for both individuals and businesses?",
    answer:
      "Yes, EcoGrow caters to both individuals and businesses. We offer personalized solutions for households looking to adopt more sustainable practices, as well as comprehensive strategies for businesses aiming to reduce their environmental impact and improve their sustainability credentials.",
  },
  {
    question: "How much does EcoGrow cost?",
    answer:
      "EcoGrow offers various subscription tiers to suit different needs and budgets. Our basic plan starts at $9.99 per month for individuals, with more comprehensive plans available for businesses. We also offer a free trial period for new users to explore our platform.",
  },
  {
    question: "Can EcoGrow help me save money while being eco-friendly?",
    answer:
      "Many of our recommended practices not only reduce your environmental impact but also lead to significant cost savings. For example, our energy-saving tips can lower your utility bills, while our waste reduction strategies can decrease your overall consumption and expenses.",
  },
  {
    question: "How do I get started with EcoGrow?",
    answer:
      "Getting started with EcoGrow is easy. Simply sign up on our website, complete a brief questionnaire about your current practices and goals, and we'll provide you with a personalized sustainability plan. You can then use our app or web platform to track your progress and access resources.",
  },
]

interface QnaResponse {
  question: string;
  answer: string;
}

function FaqDemo() {
  const { authToken } = useUser();
  const [faqData, setFaqData] = useState<QnaResponse[]>(faqDataSample);

  useEffect(() => {
    if (!authToken) {
      return;
    }
    axios.get<QnaResponse[]>(`${BASE_URL}/qna/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      setFaqData(response.data);
    })
  }, [authToken]);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>

      {/* Wrap all FAQ items inside a single Accordion */}
      <Accordion type="single" collapsible className="w-full border rounded-lg shadow-md">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-start px-5 text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="w-full text-justify  text-gray-600 px-5  py-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}


export { FaqDemo };
