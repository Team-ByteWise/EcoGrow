import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";
import { sendMessage } from "./message-service";

class QnaService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async postQna(data: {
    email: string;
    username: string;
    question: string;
  }) {
    const {
      email,
      username,
      question,
    } = data;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
        username,
      },
    });

    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    await this.prisma.userQuestion.create({
      data: {
        userId: existingUser.id,
        question,
      }
    });
  }

  async getQna() {
    const qnas = await this.prisma.userQuestion.findMany({
      select: {
        id: true,
        user: {
          select: {
            email: true,
            username: true,
          }
        },
        question: true,
      },
      where: {
        isAnswered: false,
      }
    });
    return qnas;
  }

  async replyToQna(data: {
    qnaId: number;
    answer: string;
  }) {
    const {
      qnaId,
      answer,
    } = data;

    const qna = await this.prisma.userQuestion.findUnique({
      where: {
        id: qnaId,
      },
    });

    if (!qna) {
      throw new AppError("QNA not found", 404);
    }

    const updatedQna = await this.prisma.userQuestion.update({
      where: {
        id: qnaId,
      },
      select: {
        question: true,
        answer: true,
        user: {
          select: {
            email: true
          }
        }
      },
      data: {
        answer,
        isAnswered: true
      },
    });

    sendMessage(updatedQna.user.email, "Answer to your question", updatedQna.question + "\n" + updatedQna.answer);
  }

  async getUserAnsweredQna(userId: number) {
    const qnas = await this.prisma.userQuestion.findMany({
      where: {
        userId: userId,
        isAnswered: true,
      },
    });
    return qnas;
  }
}

export default new QnaService(new PrismaClient());