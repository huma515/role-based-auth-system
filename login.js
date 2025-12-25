import supabase from "./config.js";

const email = document.getElementById("email");
const pass = document.getElementById("password");
const lform = document.getElementById("lform");

async function login(e) {
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

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: pass.value,
        });


        let userId = data.user.id

        const { data: profile, error: profileError } = await supabase
            .from('profile')
            .select("role")
            .eq('userid', userId)
            .single();

            

        if (profileError) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message
            });
            return;
        }

        if (profile.role === "admin") {
            Swal.fire({
                icon: 'success',
                title: 'Welcome Admin',
                text: 'Redirecting to Admin Dashboard...',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./admin.html";
            });
        }

        else {

         Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting to User Page...',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./user.html";
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

lform.addEventListener("submit", login);
