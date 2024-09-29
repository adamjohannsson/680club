import stripe
stripe.api_key = "sk"

customer = stripe.Customer.create(
    email="adamrjohannsson@gmail.com",
    name="adam j testing"
)

print(customer.id)  # This will be the 'cus_' value, like 'cus_123456789'
