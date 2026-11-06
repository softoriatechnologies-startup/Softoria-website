import mongoose from 'mongoose';
import validator from 'validator';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Please provide a valid email address'
      }
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: (v) => {
          const cleaned = v.replace(/[^0-9]/g, '');
          return cleaned.length >= 7 && cleaned.length <= 15;
        },
        message: 'Phone number must contain between 7 and 15 digits'
      }
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
      default: ''
    },
    service: {
      type: String,
      required: [true, 'Service interest selection is required'],
      enum: {
        values: [
          // 9 Canonical Frontend Service Titles
          'Custom Software Development',
          'Website Development',
          'Web Application Development',
          'eCommerce Solutions',
          'SaaS Application Development',
          'ERP and CRM Solutions',
          'API Development & Integration',
          'Business Dashboards & Automation',
          'Software Maintenance & Support',
          'Other',
          // Legacy aliases for backward compatibility
          'eCommerce Development',
          'SaaS Development',
          'ERP / CRM Development',
          'API Integration',
          'Business Dashboards and Automation',
          'Software Maintenance and Support'
        ],
        message: '{VALUE} is not a valid service category'
      }
    },
    projectBudget: {
      type: String,
      trim: true,
      default: ''
    },
    projectDescription: {
      type: String,
      trim: true,
      maxlength: [3000, 'Project description cannot exceed 3,000 characters'],
      default: ''
    },
    source: {
      type: String,
      enum: ['popup', 'contact_page', 'hero_cta', 'footer'],
      default: 'contact_page'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'completed'],
      default: 'new'
    },
    ipAddress: {
      type: String,
      select: false
    },
    clientSubmissionId: {
      type: String,
      trim: true,
      maxlength: [64, 'Client submission ID cannot exceed 64 characters'],
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast lookup, idempotency & filtering in Admin Dashboard
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ service: 1 });
enquirySchema.index({ email: 1 });
enquirySchema.index(
  { clientSubmissionId: 1 },
  {
    unique: true,
    partialFilterExpression: { clientSubmissionId: { $type: 'string' } }
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);

