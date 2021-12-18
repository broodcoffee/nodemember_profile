const { response } = require('express');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
const async = require('hbs/lib/async');

const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect((error) => {
    if (error) console.log(`Error: ${error}`);
    else console.log(`Database Connected`);
});

exports.register = (request, response) => {
    const { first_name, middle_name, last_name, nickname, email_address, username, password, password_conf } = request.body;      
 
    db.query(
        `SELECT username FROM member_login WHERE username = ?`, [username],
        async (error, result) => {
            if (error) console.log(error);
            if (result.length > 0) {
                return response.render('registration', {message: 'Username entered is already in use.'})
            }
            else if (password !== password_conf) {
                return response.render('registration', {message: 'Passwords do not match. Please try again.'})
            }
 
            const hashpassword = await bcrypt.hash(password, 8);
            
            db.query(
                `INSERT INTO taskmeister.member_login SET ?`, {  
                    username: username, 
                    password: hashpassword 
                }, (error, result) => {
                    if (error) console.log(error);
                    else { 
                        db.query(
                            `INSERT INTO taskmeister.member_profile (first_name, middle_name, last_name, nickname, email_address, member_login_id) VALUES ('${first_name}', '${middle_name}', '${last_name}', '${nickname}', '${email_address}', LAST_INSERT_ID())`,
                            (error, result) => {
                                if (error) console.log(error);
                                else { 
                                    return response.render('registration',{message: 'Member Profile registration successful.'});
                                }
                            }
            
                        );
                    }
                }
            );
        }
    );

};

exports.login = async (request, response) => { 
    const { username, password } = request.body;
    try {
        if (!username || !password) {
            return response.status(400).render('index', {message: 'Please enter your username and password.'});
        } 
        db.query(
            `SELECT * FROM member_login WHERE username = ?`, [username],
            async (error, result) => {
                if (!result || !(await bcrypt.compare(password, result[0].password))) {
                    return response.status(401).render('index', {message: 'Username or Password is incorrect. Please try again'});
                }
                else { 
                    db.query(
                        `SELECT * FROM member_profile`, (error, result) => {
                            response.render('list', {
                                user: result,
                                title: 'List of Members'
                            });
                        }
                    );
                }
            }
        );
    } 
    catch (error) {
        console.log(error);    
    }
}

exports.update_form = (request, response) => { 
    const email_address = request.params.email_address;
    db.query(
        `SELECT * FROM member_profile WHERE email_address = ?`, [email_address],
        (error, result) => {
            response.render('updateform', {
                user: result[0],
                title: 'Edit User'
        });
    });    
}
 
exports.update_user = (request, response) => {
    const { first_name, middle_name, last_name, nickname, email_address } = request.body;
    db.query(        
        `UPDATE member_profile SET first_name = '${first_name}', middle_name = '${middle_name}', last_name = '${last_name}', nickname = '${nickname}' WHERE email_address = '${email_address}'`, 
        (error, result) => {
            if (error) console.log(error);
            else { 
                db.query(
                    `SELECT * FROM member_profile`, (error, result) => {
                        response.render('list', {
                            user: result,
                            title: 'List of Users',
                            message: `Member with email address '${email_address}' has been updated.`
                        });
                    }
                );
            }
        }

    );    
}

exports.delete_user = (request, response) => {
    const email_address = request.params.email_address;
    db.query(        
        `DELETE member_login, member_profile FROM member_profile
            INNER JOIN member_login
            ON member_login.member_login_id = member_profile.member_login_id 
         WHERE email_address = '${email_address}'`,  
        (error, result) => {
            if (error) console.log(error);
            else { 
                db.query(
                    `SELECT * FROM member_profile`, (error, result) => {
                        response.render('list', {
                            user: result,
                            title: 'List of Members',
                            message: `Member with email address '${email_address}' has been deleted.`
                            }
                        );
                    }
                );
            }
       }
    );
}
    
                                

          
        
