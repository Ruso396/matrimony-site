import { Request, Response } from 'express';
import { RegisterUser } from '../models/registerUser';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      profileFor, fullName, gender, dob, age, religion, motherTongue, maritalStatus,
      caste, height, education, occupation, annualIncome, country, state, city,
      email, mobile, password,
      rule1, rule2, rule3, rule4, rule5,
      isPublic
    } = req.body;

    const existing = await RegisterUser.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    let profilePhoto = '';
    if (req.file) profilePhoto = req.file.filename;

    const user = await RegisterUser.create({
      profileFor, fullName, gender, dob, age, religion, motherTongue, maritalStatus,
      caste, height, education, occupation, annualIncome, country, state, city,
      email, mobile, password, profilePhoto,
      rule1: rule1 === 'true' || rule1 === true,
      rule2: rule2 === 'true' || rule2 === true,
      rule3: rule3 === 'true' || rule3 === true,
      rule4: rule4 === 'true' || rule4 === true,
      rule5: rule5 === 'true' || rule5 === true,
      // ✅ CHANGED: Default to true if not provided
      isPublic: isPublic !== undefined ? (isPublic === 'true' || isPublic === true) : true
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

    const user = await RegisterUser.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      message: 'Login successful',
      token,
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePhoto: user.profilePhoto ? `${req.protocol}://${req.get('host')}/uploads/${user.profilePhoto}` : null,
        isPublic: user.isPublic // ✅ Return privacy status
      }
    });
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
        'status',
        'isPremium',
        'isPublic',
        'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

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
        'isPublic',
        'createdAt'
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

// ✅ Get related profiles from backend
export const getRelatedProfiles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = await RegisterUser.findByPk(id);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const relatedUsers = await RegisterUser.findAll({
      where: {
        country: currentUser.country,
        gender: currentUser.gender,
        id: { [Op.ne]: id },
        isPublic: true, // ✅ Only fetch public profiles
      },
      order: [['createdAt', 'DESC']],
    });

    const formattedProfiles = relatedUsers.map((user: any) => ({
      ...user.dataValues,
      profilePhoto: user.profilePhoto
        ? `http://localhost:5000/uploads/${user.profilePhoto}`
        : null,
    }));

    res.status(200).json({
      success: true,
      relatedProfiles: formattedProfiles,
    });
  } catch (error) {
    console.error('Error fetching related profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching related profiles',
    });
  }
};

// ✅ Update user profile by ID
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await RegisterUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      profileFor, fullName, gender, dob, age, religion, motherTongue,
      maritalStatus, caste, height, education, occupation, annualIncome,
      country, state, city, email, mobile, password,
      isPublic
    } = req.body;

    let profilePhoto = user.profilePhoto;
    if (req.file) {
      if (user.profilePhoto) {
        const oldPath = path.join(__dirname, '../uploads', user.profilePhoto);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profilePhoto = req.file.filename;
    }

    let updatedPassword = user.password;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedPassword = await bcrypt.hash(password, salt);
    }

    await user.update({
      profileFor,
      fullName,
      gender,
      dob,
      age,
      religion,
      motherTongue,
      maritalStatus,
      caste,
      height,
      education,
      occupation,
      annualIncome,
      country,
      state,
      city,
      email,
      mobile,
      password: updatedPassword,
      profilePhoto,
      isPublic: isPublic === 'true' || isPublic === true
    });

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const formattedUser = {
      ...user.dataValues,
      profilePhoto: user.profilePhoto ? `${baseUrl}${user.profilePhoto}` : null
    };

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: formattedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Server error updating profile' });
  }
};

// ✅ Delete user profile by ID
export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await RegisterUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePhoto) {
      const photoPath = path.join(__dirname, '../uploads', user.profilePhoto);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await user.destroy();

    return res.status(200).json({
      message: 'User profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return res.status(500).json({ message: 'Server error deleting profile' });
  }
};
