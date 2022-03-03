

<!DOCTYPE html>
<html lang="en" >
<head>
  <!--set browser icon-->
  <link rel="icon" href="assets/images/browserIcon.jpg">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CD/Reset-Password</title>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'>
<link rel="stylesheet" href="/CardinalDirect/assets/css/login_style.css">

</head>
<body>
<div class="pt-5">
    <!--logo-->
    <div class="inside">
        <div class="logo"> 
            <img src="/CardinalDirect/assets/images/cardinaldirect_logo.jpg" >
        </div> 
    </div> 
    <!--page header -->
    <h1 class="text-center">Forgot Password? <br>No worries.</br></h1>
    <!--white box-->
    <div class="container">
        <div class="row">
            <div class="col-md-5 mx-auto">
                <div class="card card-body">
                    <!--white box--> 
                    <?php 
                        $selector = $_GET["selector"];
                        $validator = $_GET["validator"];
                        
                        if (empty($selector) || empty($validator)){//check for empty forms
                            echo "Could not validate your request";
                        } else {
                        if(ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false){
                                ?>
                                <form action="inlcudes/reset-password.inc.php" method = "post">
                                    <input type="hidden" name="selector" value="<?php echo $selector ?>">
                                    <input type="hidden" name="validator" value="<?php echo $validator ?>">
                                    <div class="form-group required">
                                        <input type="password" name="pwd" placeholder="Enter a new password" class="form-control" required>
                                    </div>
                                    <div class="form-group required">
                                        <input type="password" name="pwd-repeat" placeholder="Enter password again" class="form-control" required>
                                    </div>
                                    <div class="form-group pt-1">
                                        <button class="btn btn-primary btn-block" type="submit" name="reset-password-submit">Reset password</button>
                                    </div>
                                </form>
                            <?php 
                        }
                    }
                ?>
            </div>
        </div>
    </div>
</div>
</body>
</div> 
</html> 

