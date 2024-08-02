import pdf from 'pdfkit';
import fs from 'fs';
import Subscription from '../Models/Subscription.js';

export const generateInvoice = (subscription, user, res) => {
    const doc = new pdf();
    const filePath = `invoices/invoice_${subscription._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    const sectionHeight = 150; 
    const sectionWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startY = doc.y;

    doc.rect(doc.page.margins.left, startY, sectionWidth, sectionHeight)
        .fill('#FFE18B');

    doc.fillColor('black');

    doc.fontSize(16).text('enjoyio', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('GSTIN : 27AAACI638623As', { align: 'right' });
    doc.text('enjoyio Digital Entertainment Private Limited', { align: 'right' });
    doc.text('PAN: AAACI638df', { align: 'right' });
    doc.text('CIN: U64202MH2000PTC242292', { align: 'right' });
    doc.text('Road No-05, JublieeHills', { align: 'right' });
    doc.text('Hyderabad city, Telangana, 500035', { align: 'right' });
    doc.moveDown();

    doc.fontSize(14).text('Tax Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Invoice No: ${subscription._id}`, { align: 'left' });
    doc.text(`Date: ${new Date().toISOString().slice(0, 10)}`, { align: 'left' });
    doc.text(`Transaction Id: ${subscription.paymentId || 'Pending'}`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(12).text('Customer Details', { underline: true });
    doc.fontSize(10).text(`Billed To : ${user.username}`, { align: 'left' });
    doc.text(`Email/Phone: ${user.email}`, { align: 'left' });
    doc.text(`Address: ${user.address || 'xxx@gmail.com'}`, { align: 'left' });
    doc.text(`State : ${user.state || 'Not Provided'} ('${user.stateCode || 'XX'}')`, { align: 'left' });
    doc.text('Country : India', { align: 'left' });
    doc.moveDown();

    doc.fontSize(12).text('Particulars', { underline: true });
    doc.fontSize(10).text('HSN: 998433', { align: 'left' });
    doc.text('Service description : Online video streaming', { align: 'left' });
    doc.text(`Name of Package: ${subscription.plan}`, { align: 'left' });
    doc.text(`Period of subscription: ${subscription.startDate} to ${subscription.endDate}`, { align: 'left' });
    doc.text('Reverse charge applicable - No', { align: 'left' });
    doc.text(`Mode of payment: ${subscription.paymentMethod || 'UPI Wallet'}`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(12).text('Amount', { underline: true });
    const amountExclTax = (subscription.amount / 1.18).toFixed(2);
    const tax = (subscription.amount - amountExclTax).toFixed(2);
    doc.fontSize(10).text(`Transaction Amount (Exclusive tax): ${amountExclTax} INR`, { align: 'left' });
    doc.text(`Total Tax: ${tax} INR`, { align: 'left' });
    doc.text(`IGST: ${tax} 18.0%`, { align: 'left' });
    doc.text(`Total - ${subscription.amount} INR`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(10).text('This is a computer generated invoice and does not require a signature/stamp', { align: 'center' });
    doc.moveDown();
    doc.text('Gopuram Estate, 95, Film Nagar Nagar, Banjara Hills, Hyderabad City, Telangana, 500035', { align: 'center' });
    doc.text('Website : www.enjoyio.com', { align: 'center' });

    doc.end();
    
};

export const downloadInvoice = async (req, res) => {
    const { subscriptionId } = req.params;
    try {
        const subscription = await Subscription.findById(subscriptionId).populate('user');
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const filePath = `invoices/invoice_${subscription._id}.pdf`;
        if(!fs.existsSync(filePath)) {
            generateInvoice(subscription, subscription.user, res);
        } else {
            res.download(filePath);
        }
    } catch (error) {
        console.error('Error downloading invoice:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
