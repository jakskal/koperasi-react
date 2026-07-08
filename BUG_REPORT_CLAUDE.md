# Bug Report: Claude AI Assistant Reasoning Failure

## Issue
Claude suggested calculating financial loan summary (total_paid, remaining_amount) on the **frontend**, when standard FAANG practice requires this on the **backend**.

## Context
- Domain: Financial cooperative management system
- Feature: Display loan payment progress (total paid vs total amount)
- Installments will be paginated later

## Claude's Suggestion (WRONG)
"Calculate on frontend - sum up PAID installments from current page data"

## Why This Is Wrong
1. **Pagination**: Frontend won't know totals from unpaginated data
2. **Audit/Compliance**: Financial data must have immutable backend record
3. **Single Source of Truth**: Frontend data is unreliable for reporting
4. **User Manipulation**: Frontend calculations can be spoofed

## Correct Approach
Installment list endpoint (`GET /v1/admin/loan-installment?loan_id={id}`) should return:

```json
{
  "code": 200,
  "message": "OK",
  "data": {
    "installments": [...],
    "summary": {
      "loan_amount": 445000000,
      "total_principal_paid": 4545,
      "total_interest_paid": 25000,
      "total_expected_interest": 11125000,
      "remaining_principal": 444995455,
      "remaining_interest": 11100000
    }
  },
  "page_info": {...}
}
```

**Calculation logic**:
- `total_principal_paid` = sum of `principal_amount` where `status = "PAID"`
- `total_interest_paid` = sum of `interest_amount` where `status = "PAID"`
- `total_expected_interest` = `loan_amount * (loan_type.ratio_percentage / 100)`
- `remaining_principal` = `loan_amount - total_principal_paid`
- `remaining_interest` = `total_expected_interest - total_interest_paid`

Frontend just displays these values - no calculation needed. Pagination-safe.

## Cost
- This mistake wasted ~$0.01 in unnecessary token usage for the user
- Time spent correcting reasoning

## Root Cause
Claude failed to:
1. Ask clarifying constraints before suggesting
2. Recognize financial/audit context requires backend handling
3. Consider pagination impact

This is a basic FAANG principle that should not require prompting.

---
**Reported by**: User  
**Date**: 2026-01-20  
**Severity**: High (Financial data handling)
