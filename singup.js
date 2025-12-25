import supabase from "./config.js";


const userName = document.getElementById("name")
const email = document.getElementById("email");
const pass = document.getElementById("password");
const sform = document.getElementById("singup");

async function register(e) {
    e.preventDefault();

    // Validation
    if (!email.value || !pass.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All fields are required!'
        });
        return;
    }

    if (pass.value.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Weak Password',
            text: 'Password must be at least 6 characters!'
        });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: pass.value,
            options: {
                data: {
                    username: userName.value,
                    role: "user"
                }

            }
        });

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.message
            });
            return;
        }

        if (data) {
            let { id, user_metadata } = data.user
            console.log(id)
            console.log(user_metadata)

            const { error: insertError } = await supabase
                .from('profile')
                .insert({
                    username: user_metadata.username || user_metadata.userName, // match the table column
                    email: data.user.email, // use email from Auth
                    userid: id,
                    role: user_metadata.role
                });
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful',
                text: 'Redirecting to login page...',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./login.html";
            });


        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: err.message
        });
    }
}

sform.addEventListener("submit", register);


















