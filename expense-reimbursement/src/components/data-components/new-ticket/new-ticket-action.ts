
export const AMOUNT = "AMOUNT";
export const REIMB_TYPE = "REIMB_TYPE";
export const DESCRIPTION = "DESCRIPTION";

export function updateAmount(amount: number)
{
    return {type: AMOUNT, amount};
}

export function updateReimbType(reimbType: string)
{
    return {type: REIMB_TYPE, reimbType};
}

export function updateDescription(description: string)
{
    return {type: DESCRIPTION, description};
}