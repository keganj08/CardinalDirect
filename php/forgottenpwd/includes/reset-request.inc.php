<?php

echo 'HELP';
if (isset($_POST["reset-request-submit"])){

    $selector = bin2hex(random_bytes(8));
    $token = random_bytes(32);

    /*UPDATE LINK FOR CARDINALDIRECT */
    $url = "/CardinalDirect/php/forgottenpwd/create-new-password.php?selector=" . $selector ."&validator=" .
    bin2hex($token);

    //link expiration date
    $expires = date("U")+1800; //1 hr

    require 'db.inc.php';

    $userEmail = $_POST["email"];

    $sql = "DELETE FROM pwdReset WHERE pwdResetEmail=?";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "Error";
        exit();
    } else {
        mysqli_stmt_bind_param($stmt, "s", $userEmail);
        mysqli_stmt_execute($stmt);
    }

    $sql = "INSERT INTO pwdReset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?,?,?,?);";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "Error";
        exit();
    } else {
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt, "ssss", $userEmail, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    //close connection
    mysqli_close($conn);

    //email to user
    $to = $userEmail;

    $subject = 'Reset your password for CardinalDirect';

    $message = '<p>Here is the link to reset your password: </br> <a href=" '. $url . '"></a></p>';

    $headers = "From: CardinalDirect <cardinaldirect@gmail.com>\r\n";
    $headers .= "Reply-To: cardinaldirect@gmail.com\r\n";
    $headers .= "Content-type: text/html\r\n";

    if (mail($to, $subject, $message, $headers)){
        echo "Email sent successfully to $receiver";
    }else{
    echo "Sorry, failed while sending mail!";
    }

    

    //where to send user after reset requested
    header("Location: /CardinalDirect/plink-sent.html?Sent");
    //header("Location: /CardinalDirect/forgot-password.php");

    }else{
        header("Location: /CardinalDirect/index.php");
    }
?>
    