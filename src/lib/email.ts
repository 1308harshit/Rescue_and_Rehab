import nodemailer from 'nodemailer'

// Create transporter for Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
  },
})

export interface DonationEmailData {
  donorName: string
  donorEmail: string
  amount: number
  paymentId: string
  orderId: string
}

export async function sendDonationNotificationEmail(data: DonationEmailData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'khatsuriyaharshit@gmail.com', // Your email address
      subject: `New Donation Received - ₹${data.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0d9488, #10b981); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🐾 New Donation Received!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Donation Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 10px 0;"><strong>Donor Name:</strong> ${data.donorName}</p>
              <p style="margin: 10px 0;"><strong>Donor Email:</strong> ${data.donorEmail}</p>
              <p style="margin: 10px 0;"><strong>Amount:</strong> ₹${data.amount}</p>
              <p style="margin: 10px 0;"><strong>Payment ID:</strong> ${data.paymentId}</p>
              <p style="margin: 10px 0;"><strong>Order ID:</strong> ${data.orderId}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
            </div>
            
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>Thank you for your generous donation!</strong><br>
                This contribution will help us rescue, rehabilitate, and find loving homes for animals in need.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px;">
                Rescue and Rehab Foundation<br>
                Navsari, Gujarat, India
              </p>
            </div>
          </div>
        </div>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Donation notification email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending donation notification email:', error)
    return { success: false, error: error.message }
  }
}

export async function sendDonationReceiptEmail(data: DonationEmailData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.donorEmail,
      subject: `Thank you for your donation to Rescue and Rehab Foundation`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0d9488, #10b981); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🐾 Thank You for Your Donation!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #1f2937; font-size: 16px; margin-bottom: 20px;">
              Dear ${data.donorName},
            </p>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for your generous donation of <strong>₹${data.amount}</strong> to the Rescue and Rehab Foundation. 
              Your contribution will directly help us rescue, rehabilitate, and find loving homes for animals in need.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1f2937; margin-top: 0;">Donation Receipt</h3>
              <p style="margin: 10px 0;"><strong>Amount:</strong> ₹${data.amount}</p>
              <p style="margin: 10px 0;"><strong>Payment ID:</strong> ${data.paymentId}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
              <p style="margin: 10px 0;"><strong>Organization:</strong> Rescue and Rehab Foundation</p>
            </div>
            
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>Your Impact:</strong><br>
                Your donation helps us provide food, medical care, and shelter for rescued animals. 
                Every contribution makes a difference in their lives.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.instagram.com/rescueteamnvs" 
                 style="background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Follow Our Journey
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px;">
                Rescue and Rehab Foundation<br>
                Navsari, Gujarat, India<br>
                Email: info@rescueandrehab.org
              </p>
            </div>
          </div>
        </div>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Donation receipt email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending donation receipt email:', error)
    return { success: false, error: error.message }
  }
}
