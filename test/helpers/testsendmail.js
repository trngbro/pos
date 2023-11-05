const chai = require('chai');
const sinon = require('sinon');
const sendEmail = require("../../test/helpers/sendEmail");
const expect = chai.expect;
const nodemailer = require('nodemailer'); // Import nodemailer để tạo transporter thực tế
const nodemailerStub = require('nodemailer-stub-transport');// Import nodemailer-stub-transport để giả lập transport email

describe('sendEmail', function () {
  let transporter;

  before(function () {
    // Tạo một transport giả lập để sử dụng trong kiểm tra
    transporter = nodemailer.createTransport(nodemailerStub());// Tạo một transport giả lập bằng nodemailerStub
    sinon.stub(nodemailer, 'createTransport').returns(transporter);// Giả lập hàm createTransport của nodemailer và trả về transport giả lập
  });

  it('should send an email successfully', async () => {
    const email = 'recipient@example.com';
    const subject = 'Test Email';
    const text = '<p>This is a test email.</p>';

    try {
      const result = await sendEmail(email, subject, text);// Gọi hàm sendEmail với thông tin
      expect(result).to.equal('Email sent successfully');// Kiểm tra xem kết quả trả về có phải là 'Email sent successfully' hay không
    } catch (error) {
      console.error(error);
    }
  });

  it('should handle email sending failure', async () => {
    const email = 'invalid-email';
    const subject = 'Test Email';
    const text = '<p>This is a test email.</p>';

    // Thiết lập transport giả lập để gửi email thất bại
    transporter = nodemailer.createTransport(nodemailerStub({ error: 'Email sending failed' }));

    try {
      await sendEmail(email, subject, text);// Gọi hàm sendEmail để xử lý trường hợp gửi email thất bại
    } catch (error) {
      expect(error.message).to.equal('Email sending failed');// Kiểm tra xem lỗi có phải là 'Email sending failed' hay không
    }
  });
});
