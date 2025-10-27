import { Request, Response } from 'express';
import { RegisterUser } from '../models/registerUser';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      profileFor, fullName, gender, dob,age, religion, motherTongue, maritalStatus,
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
      profileFor, fullName, gender, dob,age, religion, motherTongue, maritalStatus,
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


// ✅ Get all registered users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await RegisterUser.findAll({
      attributes: [
        'id',
        'profileFor',
        'fullName',
        'gender',
        'dob',
        'age',
        'religion',
        'motherTongue',
        'maritalStatus',
        'caste',
        'height',
        'education',
        'occupation',
        'annualIncome',
        'country',
        'state',
        'city',
        'email',
        'mobile',
        'profilePhoto',
        'createdAt'
      ]
    });

    // ✅ Build base URL dynamically (so it works on any host)
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    // ✅ Format each user’s profilePhoto to include the full path
    const formattedUsers = users.map((user: any) => ({
      ...user.dataValues,
      profilePhoto: user.profilePhoto
        ? `${baseUrl}${user.profilePhoto}`
        : null
    }));

    return res.status(200).json({
      message: 'Users fetched successfully',
      users: formattedUsers
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 🧩 Find user by primary key
    const user = await RegisterUser.findByPk(id, {
      attributes: [
        'id',
        'profileFor',
        'fullName',
        'gender',
        'dob',
        'age',
        'religion',
        'motherTongue',
        'maritalStatus',
        'caste',
        'height',
        'education',
        'occupation',
        'annualIncome',
        'country',
        'state',
        'city',
        'email',
        'mobile',
        'profilePhoto',
        'createdAt'
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Build full image URL (same as in getUsers)
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const formattedUser = {
      ...user.dataValues,
      profilePhoto: user.profilePhoto
        ? `${baseUrl}${user.profilePhoto}`
        : null
    };

    return res.status(200).json({
      message: 'User fetched successfully',
      user: formattedUser
    });

  } catch (err) {
    console.error('Error fetching user by ID:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
// ✅ Get related profiles (same country or religion)
export const getRelatedProfiles = async (req: Request, res: Response) => {
  try {
    const { country, id } = req.params;

    // Exclude the current profile id & match by country
    const related = await RegisterUser.findAll({
      where: {
        country,
        id: { [Op.ne]: id } // Exclude the current profile
      },
      attributes: [
        'id',
        'fullName',
        'age',
        'city',
        'profilePhoto'
      ],
      limit: 6
    });

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const formatted = related.map((user: any) => ({
      id: user.id,
      name: user.fullName,
      age: user.age,
      city: user.city,
      image: user.profilePhoto ? `${baseUrl}${user.profilePhoto}` : null
    }));

    res.status(200).json({ relatedProfiles: formatted });
  } catch (err) {
    console.error('Error fetching related profiles:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
