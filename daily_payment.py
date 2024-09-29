import stripe
import random
import datetime
import schedule
import time

# Stripe API key
stripe.api_key = "your_stripe_secret_key"

# List of customers with credit card info stored in Stripe
customers = [
    {"cus_Qqp7bq4aH8FLsd": "cus_123456789", "card_id": "card_1"},
    #format {"customer_id": "cus_987654321", "card_id": "card_2"},
    # Add more customers as needed
]

# Function to generate a random amount between $0.01 and $0.05
def generate_payment_amount():
    return round(random.uniform(0.01, 0.05), 2)

# Function to check if today is a business day (Monday to Friday)
def is_business_day(date):
    return date.weekday() < 5  # Monday=0, Sunday=6

# Function to make a payment
def make_payment(customer_id, card_id, amount):
    try:
        stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Stripe expects amount in cents
            currency="cad",
            customer=customer_id,
            payment_method=card_id,
            off_session=True,
            confirm=True,
        )
        print(f"Payment of ${amount} made for customer {customer_id}")
    except stripe.error.StripeError as e:
        print(f"Payment failed for customer {customer_id}: {str(e)}")

# Function to process payments for all customers
def process_payments():
    if is_business_day(datetime.datetime.now()):
        for customer in customers:
            amount = generate_payment_amount()
            make_payment(customer["customer_id"], customer["card_id"], amount)
    else:
        print("Today is not a business day. Payments skipped.")

# Schedule the payments to run every day at 9 AM
schedule.every().day.at("09:00").do(process_payments)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(60)  # Check every minute
