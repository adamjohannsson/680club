# Example of attaching a payment method (from frontend tokenization)
payment_method = stripe.PaymentMethod.create(
    type="card",
    card={
        "number": "number",
        "exp_month": 3,
        "exp_year": 2023,
        "cvc": "#"
    },
)

# Attach the payment method to the customer
stripe.PaymentMethod.attach(
    payment_method.id,
    customer=customer.id
)

# Set as default payment method
stripe.Customer.modify(
    customer.id,
    invoice_settings={
        'default_payment_method': payment_method.id,
    }
)

print(f"Payment Method ID: {payment_method.id}")  # Example output: 'pm_123456789'
