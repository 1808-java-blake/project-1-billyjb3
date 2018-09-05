import { connectionPool} from "../connection-util";
const schema = "expense_reimbursement";
const users = schema + ".ers_users";
const reimb = schema + ".ers_reimbursement";

export async function getusers()
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+users);
        return resp.rows;
    }
    finally
    {
        client.release();
    }
}

export async function verifyUser(username: string, password: string)
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+users+" WHERE ers_username = $1 AND ers_password = $2", [username, password]);
        if(resp.rows.length == 1)
            return resp.rows[0];
    }
    finally
    {
        client.release();
    }
}

export async function createUser(user)
{
    const username = user.username;
    const password = user.password;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const email = user.email;
    const role = user.role;

    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("INSERT INTO "+users+" (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ers_users_id", [username, password, firstname, lastname, email, 1] );
        return resp;
    }
    finally
    {
        client.release();
    }
}

export async function createTicket(ticket)
{
    const amount = ticket.amount;
    const submitted = ticket.submitted;
    const resolved = ticket.resolved;
    const description = ticket.description;
    const author = ticket.author;
    const resolver = ticket.resolver;
    const status = ticket.status;
    const type = ticket.type;

    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("INSERT INTO "+reimb+" (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING reimb_id", [amount, submitted, resolved, description, author, resolver, status, type]);
        return resp;
    }
    finally
    {
        client.release();
    }
}

export async function getReimbursements()
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+reimb+" ORDER BY reimb_submitted ASC");
        return resp;
    }
    finally
    {
        client.release();
    }
}

export async function getReimbursementByUser(userId)
{
    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("SELECT * FROM "+reimb+" WHERE reimb_author = $1 ORDER BY reimb_submitted", [userId]);
        return resp;
    }
    finally
    {
        client.release();
    }
}


