import { Request, Response } from 'express';
import { PremiumPayment } from '../models/PremiumPaymentModel';
import { RegisterUser } from '../models/registerUser';


export const getPremiumStatus = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId); // ✅ fix: ensure it's a number

    const user = await RegisterUser.findByPk(userId, {
      attributes: ['id', 'fullName', 'email', 'isPremium']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const lastPayment = await PremiumPayment.findOne({
      where: { userId }, // ✅ now a number
      order: [['createdAt', 'DESC']]
    });

    // ✅ optional: simplify frontend check
    res.status(200).json({
      user,
      lastPayment,
      isPremium: user.isPremium
    });
  } catch (error) {
    console.error("Error in getPremiumStatus:", error); // log real error
    res.status(500).json({ message: 'Error fetching premium status' });
  }
};

export const processPremiumPayment = async (req: Request, res: Response) => {
  try {
    const { v4: uuidv4 } = await import('uuid'); // ✅ Fix here

    const { userId, amount, duration, paymentMethod } = req.body;

    const user = await RegisterUser.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transactionId = uuidv4();

    const payment = await PremiumPayment.create({
      userId,
      amount,
      duration,
      paymentMethod,
      transactionId,
      status: 'success'
    });

    await user.update({ isPremium: true });

    return res.status(201).json({
      message: 'Payment successful, Premium activated!',
      payment
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

