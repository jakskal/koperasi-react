# Backend API Requirement: Loan Summary in Loan Detail Response

## Endpoint
`GET /v1/admin/loan/{loanId}`

## Current Response
```json
{
  "id": 1,
  "user_id": 4,
  "loan_type_id": 1,
  "name": "pinjaman kulkas",
  "amount": "445000000",
  "ratio_percentage": "2.5",
  "total_ratio_amount": "11125000",
  "installment_qty_target": 8,
  "transaction_date": "2006-01-02T00:00:00Z",
  "notes": "...",
  "created_at": "...",
  "user": {...},
  "loan_type": {...}
}
```

## Required Change
Add payment summary fields to loan detail response:

```json
{
  "id": 1,
  "user_id": 4,
  "loan_type_id": 1,
  "name": "pinjaman kulkas",
  "amount": "445000000",
  "ratio_percentage": "2.5",
  "total_ratio_amount": "11125000",
  "installment_qty_target": 8,
  "transaction_date": "2006-01-02T00:00:00Z",
  "notes": "...",
  "total_principal_paid": 4545,
  "total_interest_paid": 25000,
  "remaining_principal": 444995455,
  "remaining_interest": 11100000,
  "created_at": "...",
  "user": {...},
  "loan_type": {...}
}
```

## Calculation Logic

```
total_principal_paid = SUM(principal_amount) WHERE status = "PAID"
total_interest_paid = SUM(interest_amount) WHERE status = "PAID"
total_expected_interest = loan_amount * (loan_type.ratio_percentage / 100)
remaining_principal = loan_amount - total_principal_paid
remaining_interest = total_expected_interest - total_interest_paid
```

## Notes
- Only count installments with `status = "PAID"`
- `CANCELLED` and `PENDING` installments are not included in totals
- This must be calculated on backend (not frontend)
- Summary must be accurate regardless of pagination
- Required by: Frontend display of loan payment progress

## Example Calculation
```
Loan: 445000000 (Mudharabah, 2.5% interest)
Total Expected Interest: 445000000 * 2.5% = 11125000
Paid: Principal=4545, Interest=25000
Remaining: Principal=444995455, Interest=11100000
```
