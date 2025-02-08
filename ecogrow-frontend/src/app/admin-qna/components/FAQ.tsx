"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const faqData = [
  {
    question: "What is EcoGrow?",
    questiondescription:
      "This question seeks to understand the core purpose and functionality of EcoGrow as a platform.",
    userid: 1,
    username: "abc@cdf",
  },
  {
    question: "How does EcoGrow work?",
    questiondescription:
      "Here, the user wants to know the working mechanism of EcoGrow, including how it analyzes data and provides solutions.",
    userid: 2,
    username: "ghi@jkl",
  },
  {
    question: "Is EcoGrow suitable for both individuals and businesses?",
    questiondescription:
      "This question is about whether EcoGrow caters to different user types, such as personal users and business entities.",
    userid: 3,
    username: "mno@pqr",
  },
  {
    question: "How much does EcoGrow cost?",
    questiondescription:
      "The user is inquiring about the pricing plans and whether there are different options available.",
    userid: 4,
    username: "stu@vwx",
  },
  {
    question: "Can EcoGrow help me save money while being eco-friendly?",
    questiondescription:
      "This question explores whether adopting EcoGrow's recommendations can result in financial savings along with environmental benefits.",
    userid: 5,
    username: "xyz@fuk",
  },
  {
    question: "How do I get started with EcoGrow?",
    questiondescription:
      "The user is looking for guidance on the steps required to sign up and begin using EcoGrow effectively.",
    userid: 6,
    username: "lmao@lol",
  },
];


function FaqDemo() {
  return (
    <div className="w-full  mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>

      {/* Wrap all FAQ items inside a single Accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full border rounded-lg shadow-md"
      >
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-start px-5 text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="w-full text-justify  text-gray-600 px-5  py-2">
              {faq.questiondescription}
            </AccordionContent>
            <div className="flex gap-6">
              <AccordionContent className="w-full text-justify   px-5  py-2 text-green-700">
                <span className="text-gray-600">Asked by: </span>
                {faq.username}
              </AccordionContent>
              <AccordionContent className="w-full text-justify  text-green-600 px-5  py-2">
                <span className="text-gray-600">userid: </span>
                {faq.userid}
              </AccordionContent>
            </div>
            <AccordionContent className="w-full text-justify  text-gray-600 px-5  py-2">
              <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                  type="text"
                  className="outline-none w-full py-3 px-3 "
                  placeholder="Respond to the question"
                />
                <button className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0 rounded hover:bg-green-800">
                  Reply
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export { FaqDemo };
