import { Router } from "express";

import qnaService from "../services/qna-service";
import { auth } from "../middlewares/auth";

const router = Router();

router.post(
  "/post",
  auth,
  async (req, res, next) => {
    try {
      const result = await qnaService.postQna({
        email: req.email!,
        username: req.username!,
        question: req.body.question,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (req, res, next) => {
    try {
      const result = await qnaService.getQna();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/me",
  auth,
  async (req, res, next) => {
    try {
      console.log(req.userId);
      const result = await qnaService.getUserAnsweredQna(req.userId!);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/reply",
  async (req, res, next) => {
    try {
      const result = await qnaService.replyToQna({
        qnaId: parseInt(req.body.qnaId),
        answer: req.body.answer,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;