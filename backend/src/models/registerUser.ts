import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import bcrypt from 'bcryptjs';

export class RegisterUser extends Model {
  public id!: number;
  public profileFor!: string;
  public fullName!: string;
  public gender!: string;
  public dob!: string;
  public age!: number;
  public religion!: string;
  public motherTongue!: string;
  public maritalStatus!: string;
  public caste!: string;
  public height!: string;
  public education!: string;
  public occupation!: string;
  public annualIncome!: string;
  public country!: string;
  public state!: string;
  public city!: string;
  public email!: string;
  public mobile!: string;
  public password!: string;
  public profilePhoto!: string;
  public isPremium!: boolean;

  // ✅ new fields for Rules section
  public rule1!: boolean;
  public rule2!: boolean;
  public rule3!: boolean;
  public rule4!: boolean;
  public rule5!: boolean;

  public validPassword!: (password: string) => Promise<boolean>;
}

RegisterUser.init(
  {
    profileFor: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.STRING,
    age: DataTypes.INTEGER,
    religion: DataTypes.STRING,
    motherTongue: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    caste: DataTypes.STRING,
    height: DataTypes.STRING,
    education: DataTypes.STRING,
    occupation: DataTypes.STRING,
    annualIncome: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,

    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // ✅ Rules & Terms checkboxes
    rule1: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rule2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rule3: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rule4: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rule5: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'RegisterUser',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: RegisterUser) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

RegisterUser.prototype.validPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
