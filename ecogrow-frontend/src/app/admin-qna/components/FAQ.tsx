"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

async function sendReply(qnaId: number, reply: string) {
  axios.post(`${BASE_URL}/qna/reply`, {
    qnaId,
    answer: reply
  });
}

interface QnaResponse {
  id: number;
  user: {
    username: string;
    email: string;
  }
  question: string;
}

function FaqDemo() {
  const [faqData, setFaqData] = useState<QnaResponse[]>([]);
  const [reply, setReply] = useState<string>("");

  useEffect(() => {
    axios.get<QnaResponse[]>(`${BASE_URL}/qna`).then((response) => {
      setFaqData(response.data);
    });
  }, []);

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
            <div className="flex gap-6">
              <AccordionContent className="w-full text-justify   px-5  py-2 text-green-700">
                <span className="text-gray-600">Asked by: </span>
                {faq.user.username}
              </AccordionContent>
              <AccordionContent className="w-full text-justify  text-green-600 px-5  py-2">
                <span className="text-gray-600">Email: </span>
                {faq.user.email}
              </AccordionContent>
            </div>
            <AccordionContent className="w-full text-justify  text-gray-600 px-5  py-2">
              <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  type="text"
                  className="outline-none w-full py-3 px-3 "
                  placeholder="Respond to the question"
                />
                <button onClick={
                  () => {
                    sendReply(faq.id, reply);
                    setReply("");
                    setFaqData(faqData.filter((item) => item.id !== faq.id));
                  }
                } className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0 rounded hover:bg-green-800">
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
