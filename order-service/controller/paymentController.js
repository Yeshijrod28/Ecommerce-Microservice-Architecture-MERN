import Order from '../models/Order.js';

// Process payment
export const processPaymentController = async (req, res) => {
  try {
    const { orderId, paymentMethod, paymentDetails } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.paymentStatus === 'paid') return res.status(400).json({ message: 'Order already paid' });

    const paymentResult = await processPayment(order, paymentMethod, paymentDetails);

    if (paymentResult.success) {
      order.markAsPaid(paymentResult.transactionId, paymentResult.gateway);
      await order.save();
      return res.json({ message: 'Payment processed successfully', transactionId: paymentResult.transactionId, order });
    } else {
      order.paymentStatus = 'failed';
      await order.save();
      return res.status(400).json({ message: 'Payment failed', error: paymentResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Process refund
export const processRefundController = async (req, res) => {
  try {
    const { orderId, amount, reason } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.paymentStatus !== 'paid') return res.status(400).json({ message: 'Order is not paid' });

    const refundResult = await processRefund(order, amount, reason);
    if (refundResult.success) {
      order.markAsRefunded(reason);
      await order.save();
      return res.json({ message: 'Refund processed successfully', refundId: refundResult.refundId, order });
    } else {
      return res.status(400).json({ message: 'Refund failed', error: refundResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment info
export const getPaymentDetailsController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({
      orderId: order._id,
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      paymentDetails: order.paymentDetails,
      total: order.pricing.total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ----- Helper Functions -----
async function processPayment(order, paymentMethod, paymentDetails) {
  return new Promise(resolve => {
    setTimeout(() => {
      const success = Math.random() > 0.05;
      if (success) {
        resolve({ success: true, transactionId: generateTransactionId(), gateway: getPaymentGateway(paymentMethod) });
      } else {
        resolve({ success: false, error: 'Payment declined by bank' });
      }
    }, 1000);
  });
}

async function processRefund(order, amount, reason) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, refundId: generateTransactionId(), amount: amount || order.pricing.total });
    }, 1500);
  });
}

function generateTransactionId() {
  return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getPaymentGateway(paymentMethod) {
  const gateways = { credit_card: 'Stripe', debit_card: 'Stripe', paypal: 'PayPal', bank_transfer: 'ACH', cash_on_delivery: 'COD' };
  return gateways[paymentMethod] || 'Unknown';
}
