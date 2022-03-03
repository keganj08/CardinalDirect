<?php
    if (isset($_POST["reset-password-submit"])) {
        $selector = $_POST["selector"];
        $validator = $_POST["validator"];
        $password = $_POST["pwd"];
        $passwordRepeat = $_POST["pwd-repeat"];
       
        if (empty($password) || empty($passwordRepeat)){//check for empty forms
            header("Location: CardinalDirect/php/forgottenpwd/create-new-password?newpwd=empty");
            exit();
        } else if($password != $passwordRepeat){//pwds don't match
            header("Location: CardinalDirect/php/forgottenpwd/create-new-password?newpwd=pwdsdonotmatch");
        }
        $currentDate = date("U");

        require 'db.inc.php';

        $sql = "SELECT * FROM pwdReset WHERE pwdResetSelector=? AND pwdResetExpires >= ?";
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo "Error";
            exit();
        } else { 
            mysqli_stmt_bind_param($stmt, "s", $selector);
            mysqli_stmt_execute($stmt);
            $currentDate = date("U");
            $result = mysqli_stmt_get_result($stmt);
            if(!$row = mysqli_fetch_assoc($result)){
                echo "Reset password again";
                exit();
                
            } else{
                $tokenBin = hex2bin($validator);
                $tokenCheck = password_verify($tokenBin, $row["pwdResetToken"]);

                if($tokenCheck === false){
                    echo "Reset password again";
                    exit();
                } elseif ($tokenCheck === true) {
                    $tokenEmail = $row['pwdResetEmail'];
                    $sql = "SELECT * FROM users WHERE emailUsers=?;";
                    $stmt = mysqli_stmt_init($conn);

                    if (!mysqli_stmt_prepare($stmt, $sql)) {
                        echo "Error";
                        exit();
                    } else { 
                        mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        if(!$row = mysqli_fetch_assoc($result)){
                            echo "Error";
                            exit();
                            
                        } else{
                            $sql = "UPDATE users SET pwdusers=? WHERE emailUsers=?"; 
                            $stmt = mysqli_stmt_init($conn);
                            if (!mysqli_stmt_prepare($stmt, $sql)) {
                                echo "Error";
                                exit();
                            } else { 
                                //UPDATE NEW PWD IN DB
                                $newPwdHash = password_hash($password, PASSWORD_DEFAULT);
                                mysqli_stmt_bind_param($stmt, "ss", $tokenEmail);
                                mysqli_stmt_execute($stmt);

                                $sql = "DELETE FROM pwdReset WHERE pwdResetEmail=?";
                                $stmt = mysqli_stmt_init($conn);
                                if (!mysqli_stmt_prepare($stmt, $sql)) {
                                    echo "Error";
                                    exit();
                                    }else { 
                                        mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                                        mysqli_stmt_execute($stmt);
                                        header("CardinalDirect/login.html?newpwd=passwordupdated"); 
                                    }                                      
                                }
                        
                        }
                    }
                }
            }
        }
    }else{
        header("Location: /CardinalDirect/index.php");
    }
?>