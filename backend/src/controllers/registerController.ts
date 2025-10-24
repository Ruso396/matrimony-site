import { Request, Response } from 'express';
import { RegisterUser } from '../models/registerUser';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      profileFor, fullName, gender, dob, religion, motherTongue, maritalStatus,
      caste, height, education, occupation, annualIncome, country, state, city,
      email, mobile, password
    } = req.body;

    // check duplicate email
    const existing = await RegisterUser.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // handle file upload
    let profilePhoto = '';
    if (req.file) profilePhoto = req.file.filename;

    const user = await RegisterUser.create({
      profileFor, fullName, gender, dob, religion, motherTongue, maritalStatus,
      caste, height, education, occupation, annualIncome, country, state, city,
      email, mobile, password, profilePhoto
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // email-oda user-a find pannuthu
    const user = await RegisterUser.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // password compare
    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

