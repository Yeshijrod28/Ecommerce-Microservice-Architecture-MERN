import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  productDetails: {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    image: String,
  },
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [OrderItemSchema],
  pricing: {
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, required: true },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paidAt: Date,
  },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

// Methods
OrderSchema.methods.markAsPaid = function (transactionId, gateway) {
  this.paymentStatus = 'paid';
  this.paymentDetails.transactionId = transactionId;
  this.paymentDetails.paymentGateway = gateway;
  this.paymentDetails.paidAt = new Date();
  if (this.status === 'pending') this.status = 'confirmed';
};

OrderSchema.methods.markAsRefunded = function (reason) {
  this.paymentStatus = 'refunded';
  this.status = 'refunded';
  this.notes = `Refunded: ${reason}`;
};

export default mongoose.model('Order', OrderSchema);
