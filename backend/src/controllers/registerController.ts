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

    // Check user exist
    const user = await RegisterUser.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Check password
    const isValid = await user.validPassword(password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    // JWT token create
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    // ✅ Return user details also
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePhoto: user.profilePhoto ? `${req.protocol}://${req.get('host')}/uploads/${user.profilePhoto}` : null
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

// ✅ Get related profiles from backend (same country, same gender)
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
      },
      order: [['createdAt', 'DESC']],
    });

    // ✅ Add full image URL
    const formattedProfiles = relatedUsers.map((user: any) => ({
      ...user.dataValues,
      profilePhoto: user.profilePhoto
        ? `http://localhost:5000/uploads/${user.profilePhoto}` // 👈 Full URL
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

    // 🧩 Check if user exists
    const user = await RegisterUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 🧾 Get body fields
    const {
      profileFor, fullName, gender, dob, age, religion, motherTongue,
      maritalStatus, caste, height, education, occupation, annualIncome,
      country, state, city, email, mobile, password
    } = req.body;

    // 🖼️ Handle new profile photo
    let profilePhoto = user.profilePhoto; // old photo
    if (req.file) {
      // delete old photo (optional)
      if (user.profilePhoto) {
        const oldPath = path.join(__dirname, '../../uploads', user.profilePhoto);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profilePhoto = req.file.filename;
    }

    // 🧠 Update fields
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
      password,
      profilePhoto
    });

    // ✅ Build full URL for updated image
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




