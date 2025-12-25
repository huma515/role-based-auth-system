
import supabase from "./config.js";


async function checkRole(params) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    alert("create your account");
    return (window.location.href = "./login.html");
  }
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("role")
      .eq("userId", user.id)
      .single();
    console.log(profile);

    if (profile.role != "admin") {
      alert("access denied");
      return (window.location.href = "./profile.html");
    }
  } catch (err) {
    console.log(err);
  }
}

checkRole();
