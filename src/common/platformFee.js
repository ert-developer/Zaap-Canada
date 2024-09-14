export const getPlatformFee = transactionAmount => {
  let fee = 0;

  if (transactionAmount <= 100) {
    fee = transactionAmount * 0.1;
    return Math.max(fee, 5); // Apply minimum fee of ₹5
  } else if (transactionAmount <= 499) {
    fee = transactionAmount * 0.09;
    return Math.min(Math.max(fee, 5), 40); // Apply minimum fee of ₹5 and maximum fee of ₹40
  } else if (transactionAmount <= 999) {
    fee = transactionAmount * 0.08;
    return Math.min(Math.max(fee, 40), 80); // Apply minimum fee of ₹40 and maximum fee of ₹80
  } else if (transactionAmount <= 4999) {
    fee = transactionAmount * 0.07;
    return Math.min(Math.max(fee, 70), 250); // Apply minimum fee of ₹70 and maximum fee of ₹250
  } else if (transactionAmount <= 9999) {
    fee = transactionAmount * 0.06;
    return Math.min(Math.max(fee, 250), 500); // Apply minimum fee of ₹250 and maximum fee of ₹500
  } else if (transactionAmount <= 19999) {
    fee = transactionAmount * 0.05;
    return Math.min(Math.max(fee, 500), 1000); // Apply minimum fee of ₹500 and maximum fee of ₹1000
  } else if (transactionAmount <= 49999) {
    fee = transactionAmount * 0.04;
    return Math.min(Math.max(fee, 800), 1500); // Apply minimum fee of ₹800 and maximum fee of ₹1500
  } else {
    fee = transactionAmount * 0.03;
    return Math.min(Math.max(fee, 1500), 2000); // Apply minimum fee of ₹1500 and maximum fee of ₹2000
  }
};

export default getPlatformFee;
