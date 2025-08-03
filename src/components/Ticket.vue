<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Buy a Ticket</h1>

    <form @submit.prevent="simulateStkPush" class="space-y-4">
      <div>
        <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          v-model="formData.fullName"
          type="text"
          id="fullName"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          v-model="formData.phoneNumber"
          type="tel"
          id="phoneNumber"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input
          v-model.number="formData.amount"
          type="number"
          id="amount"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Pay with M-Pesa
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  fullName: '',
  phoneNumber: '',
  amount: 0
})

const simulateStkPush = async () => {
  if (!formData.phoneNumber || !formData.amount) {
    alert('Please fill in all required fields.')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/stkPush', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (response.ok) {
      alert('STK Push initiated. Check your phone to complete the payment.')
    } else {
      console.error(data)
      alert('Error: ' + data.message)
    }
  } catch (err) {
    console.error(err)
    alert('Failed to initiate payment. Try again later.')
  }
}
</script>


<style scoped>
/* Existing styles remain unchanged */
.ticket-card-container {
  position: relative;
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ticket-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.ticket-header {
  background: linear-gradient(135deg, #4060ee, #041c86);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.ticket-badge {
  background: #27ae60;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.ticket-thumbnail {
  width: 100%;
  height: 200px;
  background: #e0e0e0;
}

.ticket-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-details {
  padding: 20px;
}

.ticket-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-item i {
  color: #3498db;
  font-size: 18px;
}

.info-label {
  display: block;
  font-size: 14px;
  color: #666;
}

.info-value {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.ticket-description {
  margin-bottom: 20px;
}

.ticket-description h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.ticket-description p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.ticket-price {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

.price-label {
  display: block;
  font-size: 14px;
  color: #666;
}

.price-value {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
}

.form-group small {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.phone-input {
  display: flex;
  align-items: center;
}

.phone-input .country-code {
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 14px;
  color: #333;
}

.phone-input input {
  border-radius: 0 8px 8px 0;
  flex: 1;
}

.grab-ticket-btn {
  background: #27ae60;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.grab-ticket-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.secure-note {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

.secure-note i {
  color: #27ae60;
  margin-right: 5px;
}

.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.confirmation-header i {
  color: #27ae60;
  font-size: 40px;
  margin-bottom: 10px;
}

.confirmation-header h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.confirmation-body p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.close-btn {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message, .loading-message {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error-message p {
  color: #e74c3c;
  font-size: 16px;
}
</style>
