import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    InstagramHandle: '',
    LinkedInProfile: '',
    FacebookPage: '',
    Twitter: '',
    images: null,
    video: '',
    SocialMediaAccountDetails: '',
    LogoUploadSection: null,
    ReferenceLinks: '',
  });

  const [errors, setErrors] = useState({
    companyName: false,
    InstagramHandle: false,
    LinkedInProfile: false,
    FacebookPage: false,
    Twitter: false,
    images: false,
    video: false,
    SocialMediaAccountDetails: false,
    LogoUploadSection: false,
    ReferenceLinks: false,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({
        ...formData,
        images: file,
      });
      setErrors({
        ...errors,
        images: false,
      });
    } else {
      setErrors({
        ...errors,
        images: true,
      });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        video: file.name,
      });
      setErrors({
        ...errors,
        video: false,
      });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({
        ...formData,
        LogoUploadSection: file,
      });
      setErrors({
        ...errors,
        LogoUploadSection: false,
      });
    } else {
      setErrors({
        ...errors,
        LogoUploadSection: true,
      });
    }
  };

  const validateStep = () => {
    let newErrors = {};
    let hasErrors = false;

    const fieldsToValidate = {
      1: ['companyName', 'InstagramHandle', 'LinkedInProfile', 'FacebookPage'],
      2: ['Twitter', 'images', 'video', 'SocialMediaAccountDetails'],
      3: ['LogoUploadSection', 'ReferenceLinks'],
    };

    fieldsToValidate[currentStep].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const recipients = [
        'riteshmaurya571@gmail.com',
        'ritesh@cleverstudio.in',
        'cleverstudiohost@gmail.com',
      ];

      const emailData = {
        companyName: formData.companyName,
        InstagramHandle: formData.InstagramHandle,
        LinkedInProfile: formData.LinkedInProfile,
        FacebookPage: formData.FacebookPage,
        Twitter: formData.Twitter,
        images: formData.images ? formData.images.name : 'No image uploaded',
        video: formData.video || 'No video uploaded',
        SocialMediaAccountDetails: formData.SocialMediaAccountDetails,
        LogoUploadSection: formData.LogoUploadSection ? formData.LogoUploadSection.name : 'No logo uploaded',
        ReferenceLinks: formData.ReferenceLinks,
      };

      const sendEmails = recipients.map((email) =>
        emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
          { ...emailData, to_email: email },
          'YOUR_USER_ID' // Replace with your EmailJS User ID
        )
      );

      Promise.all(sendEmails)
        .then((results) => {
          console.log('Emails sent successfully:', results);
          alert('Form submitted and emails sent successfully!');
          setFormData({
            companyName: '',
            InstagramHandle: '',
            LinkedInProfile: '',
            FacebookPage: '',
            Twitter: '',
            images: null,
            video: '',
            SocialMediaAccountDetails: '',
            LogoUploadSection: null,
            ReferenceLinks: '',
          });
          setCurrentStep(1);
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
          alert('Failed to send emails. Please try again.');
        });
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-heading">Social Media Form</h2> {/* Added heading */}
      <div className="Box1">
        <h1 className="headi">
          <b>
            <span>GET A</span>
            <br />
            <span>QUOTE</span>
          </b>
        </h1>
        <h3 className="fill">Fill out the form and we will get back to you.</h3>
        <h4>Phone</h4>
        <p>+91 77109 48801</p>
        <h4>Email</h4>
        <p>ritesh@cleverstudio.in</p>
      </div>
      <div className="Box2">
        <h5 className="headtw">
          Let's <i><b>level up</b></i> your brand, together!
        </h5>

        {currentStep === 1 && (
          <>
            <div className="form-group">
              <label className="form-label">
                Company Name {errors.companyName && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`form-input ${errors.companyName ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Instagram Handle {errors.InstagramHandle && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="InstagramHandle"
                value={formData.InstagramHandle}
                onChange={handleInputChange}
                className={`form-input ${errors.InstagramHandle ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                LinkedIn Profile {errors.LinkedInProfile && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="LinkedInProfile"
                value={formData.LinkedInProfile}
                onChange={handleInputChange}
                className={`form-input ${errors.LinkedInProfile ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Facebook Page {errors.FacebookPage && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="FacebookPage"
                value={formData.FacebookPage}
                onChange={handleInputChange}
                className={`form-input ${errors.FacebookPage ? 'error' : ''}`}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={nextStep} className="form-button">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="form-group">
              <label className="form-label">
                X (Formerly Twitter) {errors.Twitter && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="Twitter"
                value={formData.Twitter}
                onChange={handleInputChange}
                className={`form-input ${errors.Twitter ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Stock Images Upload {errors.images && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="file"
                accept="image/*"
                name="images"
                onChange={handleImageChange}
                className={`form-input ${errors.images ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Video Upload Section {errors.video && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="file"
                accept="video/*"
                name="video"
                onChange={handleVideoChange}
                className={`form-input ${errors.video ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Social Media Account Details {errors.SocialMediaAccountDetails && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="SocialMediaAccountDetails"
                value={formData.SocialMediaAccountDetails}
                onChange={handleInputChange}
                className={`form-input ${errors.SocialMediaAccountDetails ? 'error' : ''}`}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="form-button">
                Back
              </button>
              <button type="button" onClick={nextStep} className="form-button">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="form-group">
              <label className="form-label">
                Logo Upload Section {errors.LogoUploadSection && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="file"
                accept="image/*"
                name="LogoUploadSection"
                onChange={handleLogoChange}
                className={`form-input ${errors.LogoUploadSection ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Reference Links {errors.ReferenceLinks && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="ReferenceLinks"
                value={formData.ReferenceLinks}
                onChange={handleInputChange}
                className={`form-input ${errors.ReferenceLinks ? 'error' : ''}`}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="form-button">
                Back
              </button>
              <button type="submit" className="form-buttons">
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
