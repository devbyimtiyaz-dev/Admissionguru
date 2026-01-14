<?php
// ================= SECURITY =================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit();
}

// ================= FETCH DATA =================
$name    = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES);
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES);
$email   = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES);
$course  = htmlspecialchars(trim($_POST['course'] ?? ''), ENT_QUOTES);
$city    = htmlspecialchars(trim($_POST['city'] ?? ''), ENT_QUOTES);
$college = htmlspecialchars(trim($_POST['college'] ?? ''), ENT_QUOTES);
$source  = htmlspecialchars(trim($_POST['source'] ?? 'Website'), ENT_QUOTES);

// ================= VALIDATION =================
if ($name === '' || $phone === '') {
    echo "Required fields missing.";
    exit();
}

// ================= EMAIL CONFIG =================
$to = "admissionguru.india@gmail.com";
$subject = "New Admission Inquiry – AdmissionGuru.org";

$fromEmail = "no-reply@admissionguru.org";
$fromName  = "Admission Guru";

// ================= EMAIL BODY =================
$message = "
<html>
<body style='font-family:Arial'>

<h2>📩 New Inquiry Received</h2>

<table border='1' cellpadding='10' cellspacing='0' width='100%'>
<tr><td><b>Name</b></td><td>$name</td></tr>
<tr><td><b>Phone</b></td><td>$phone</td></tr>
<tr><td><b>Email</b></td><td>$email</td></tr>
<tr><td><b>Course</b></td><td>$course</td></tr>
<tr><td><b>City</b></td><td>$city</td></tr>
<tr><td><b>College</b></td><td>$college</td></tr>
<tr><td><b>Source</b></td><td>$source</td></tr>
</table>

<br>
<b>Website:</b> https://www.admissionguru.org/

</body>
</html>
";

// ================= HEADERS =================
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: $fromName <$fromEmail>\r\n";

// ================= SEND =================
if (mail($to, $subject, $message, $headers)) {
    header("Location: thank-you.html");
    exit();
} else {
    echo "Mail sending failed.";
}
?>
