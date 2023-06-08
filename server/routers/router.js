import express from "express";
const router = express.Router();

const cats = [{ name: 'double' }, { name: 'maniac' }];


router.get("/cats", (req, res) => {
   res.json(cats);
})

export default router;