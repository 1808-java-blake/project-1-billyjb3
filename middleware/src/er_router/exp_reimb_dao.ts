import { connectionPool} from "../connection-util";
const schema = "expense_reimbursement";
const users = schema + ".ers_users";
const reimb = schema + ".ers_reimbursement";
const types = schema + ".ers_reimbursement_type";
const status = schema + ".ers_reimbursement_status";

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
    const description = ticket.description;
    const author = ticket.author;
    const status = 3;
    const type = ticket.type;

    const client = await connectionPool.connect();
    try
    {
        const resp = await client.query("INSERT INTO "+reimb+" (reimb_amount, reimb_description, reimb_author, reimb_status_id, reimb_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING reimb_id", [amount, description, author, status, type]);
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
        const query = `SELECT r.reimb_id, r.reimb_amount, r.reimb_submitted, r.reimb_resolved, r.reimb_description, u.user_first_name as author_firstname, 
        u.user_last_name as author_lastname, uu.user_first_name as resolver_firstname, uu.user_last_name as resolver_lastname, s.reimb_status, rt.reimb_type
        FROM ${reimb} as r
        INNER JOIN ${users} as u ON r.reimb_author = u.ers_users_id
        LEFT JOIN ${users} as uu ON r.reimb_resolver = uu.ers_users_id 
        INNER JOIN ${status} AS s ON r.reimb_status_id = s.reimb_status_id
        INNER JOIN ${types} AS rt ON r.reimb_type_id = rt.reimb_type_id
        WHERE r.reimb_author = $1
        ORDER BY r.reimb_submitted DESC`
        const resp = await client.query(query, [userId]);
        return resp;
    }
    finally
    {
        client.release();
    }
}


